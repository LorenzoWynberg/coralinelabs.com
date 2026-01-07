"use server";

import { Resend } from "resend";
import { z } from "zod";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds
const MAX_SUBMISSIONS = 3; // Maximum submissions per window

// In-memory store for rate limiting
const rateLimitStore = new Map<
  string,
  { count: number; resetTime: number }
>();

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 60 * 1000); // Clean up every minute

async function getClientIP(): Promise<string> {
  const headersList = await headers();
  // Try to get IP from various headers (in order of priority)
  return (
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
    headersList.get("x-real-ip") ||
    headersList.get("cf-connecting-ip") || // Cloudflare
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    // No record or expired - create new entry
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return false;
  }

  if (record.count >= MAX_SUBMISSIONS) {
    // Rate limit exceeded
    return true;
  }

  // Increment count
  record.count++;
  rateLimitStore.set(ip, record);
  return false;
}

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().max(100, "Company name is too long").optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long"),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    company?: string[];
    message?: string[];
  };
} | null;

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Check honeypot field - if filled, it's likely a bot
  const honeypot = formData.get("website");
  if (honeypot) {
    // Silently reject spam without giving feedback to the bot
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  // Check rate limiting
  const clientIP = await getClientIP();
  if (isRateLimited(clientIP)) {
    return {
      success: false,
      message:
        "Too many submission attempts. Please try again in a few minutes.",
    };
  }

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    company: formData.get("company") || undefined,
    message: formData.get("message"),
  };

  // Validate with Zod
  const validationResult = contactFormSchema.safeParse(rawData);

  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Please fix the errors in the form.",
      errors,
    };
  }

  const { name, email, phone, company, message } = validationResult.data;

  try {
    await resend.emails.send({
      from: "Coraline Labs Website <noreply@coralinelabs.com>",
      to: "info@coralinelabs.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ""}
${company ? `Company: ${company}\n` : ""}
Message:
${message}
      `,
    });

    return {
      success: true,
      message: "Thank you for your message. We'll be in touch soon.",
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again or email us directly.",
    };
  }
}
