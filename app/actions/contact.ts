"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState = {
  success: boolean;
  message: string;
} | null;

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const message = formData.get("message") as string;

  // Validate required fields
  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

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
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
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
