# API Documentation

## Overview

This project uses Next.js Server Actions for API functionality. All server-side logic is contained in the `app/actions/` directory.

---

## Contact Form API

### submitContactForm

**Location:** `app/actions/contact.ts`

Server action for handling contact form submissions via email.

#### Type Signature

```typescript
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState>;
```

#### Parameters

| Parameter    | Type                       | Description                              |
| ------------ | -------------------------- | ---------------------------------------- |
| `_prevState` | `ContactFormState \| null` | Previous form state (for useActionState) |
| `formData`   | `FormData`                 | Form data containing user inputs         |

#### Form Fields

| Field     | Type   | Required | Validation                          | Notes                          |
| --------- | ------ | -------- | ----------------------------------- | ------------------------------ |
| `name`    | string | Yes      | 1-100 characters                    |                                |
| `email`   | string | Yes      | Valid email format                  |                                |
| `phone`   | string | No       | Valid international phone number    | E.164 format with country code |
| `company` | string | No       | 0-100 characters                    |                                |
| `message` | string | Yes      | 10-1000 characters                  |                                |
| `website` | string | No       | N/A                                 | Honeypot field (must be empty) |

#### Return Type

```typescript
type ContactFormState = {
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
```

#### Response Examples

**Success:**

```json
{
  "success": true,
  "message": "Thank you for your message! We'll get back to you soon."
}
```

**Validation Error:**

```json
{
  "success": false,
  "message": "Please fix the errors in the form.",
  "errors": {
    "email": ["Please enter a valid email address"],
    "message": ["Message must be at least 10 characters"]
  }
}
```

**Server Error:**

```json
{
  "success": false,
  "message": "Something went wrong. Please try again later."
}
```

**Rate Limit Exceeded:**

```json
{
  "success": false,
  "message": "Too many submission attempts. Please try again in a few minutes."
}
```

**Bot Detection (Honeypot):**

```json
{
  "success": false,
  "message": "Something went wrong. Please try again."
}
```

#### Usage Example

```tsx
"use client";
import { useActionState, useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, null);
  const [phoneValue, setPhoneValue] = useState<string>("");

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input id="name" name="name" type="text" required />
        {state?.errors?.name && (
          <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input id="email" name="email" type="email" required />
        {state?.errors?.email && (
          <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <PhoneInput
          id="phone"
          international
          defaultCountry="US"
          value={phoneValue}
          onChange={(value) => setPhoneValue(value || "")}
          placeholder="Enter phone number"
        />
        <input type="hidden" name="phone" value={phoneValue} />
        {state?.errors?.phone && (
          <p className="text-red-500 text-sm mt-1">{state.errors.phone[0]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" type="text" />
        {state?.errors?.company && (
          <p className="text-red-500 text-sm mt-1">{state.errors.company[0]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea id="message" name="message" required rows={5} />
        {state?.errors?.message && (
          <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>
        )}
      </div>

      {state?.message && (
        <p className={state.success ? "text-green-600" : "text-red-600"}>
          {state.message}
        </p>
      )}

      <Button type="submit">Send Message</Button>
    </form>
  );
}
```

#### Implementation Details

1. **Validation:**

   - Uses Zod schema for type-safe validation
   - Returns field-specific error messages
   - Validates on server-side for security

2. **Phone Number Handling:**

   - Uses `react-phone-number-input` library for formatting and validation
   - Supports international phone numbers with country codes
   - Automatic formatting as user types
   - E.164 format validation (e.g., +14155552671)
   - Country selector with flags
   - Optional field - validated only if provided
   - Default country: United States

3. **Email Delivery:**

   - Uses Resend API for email sending
   - Sends to: contact@coralinelabs.com
   - Reply-to: user's email address
   - Includes all form data in email body (name, email, phone, company, message)

4. **Error Handling:**

   - Validation errors: Returns field-specific errors
   - API errors: Returns generic error message
   - Rate limiting: IP-based rate limiting (3 submissions per 15 minutes)
   - Bot detection: Honeypot field validation

5. **Security:**
   - Server-side validation
   - No client-side API key exposure
   - Input sanitization via Zod
   - CSRF protection via Next.js
   - Honeypot field for bot detection
   - Rate limiting per IP address
   - Phone number validation with libphonenumber-js

#### Spam Protection

The contact form implements multiple layers of spam protection:

1. **Honeypot Field:**
   - Hidden `website` field that bots typically auto-fill
   - Position: absolute with off-screen coordinates
   - tabIndex: -1 (excluded from keyboard navigation)
   - autoComplete: off (prevents browser auto-fill)
   - If filled, submission is silently rejected

2. **Rate Limiting:**
   - IP-based rate limiting: 3 submissions per 15 minutes
   - In-memory cache with automatic cleanup
   - Prevents automated spam attacks
   - Returns generic error to avoid revealing limits

3. **Server-Side Validation:**
   - All validation occurs server-side
   - Zod schema validation
   - Field length limits
   - Email format validation

**Implementation Details:**

The rate limiter uses an in-memory Map to track submissions:
- Key: Client IP address (from `x-forwarded-for`, `x-real-ip`, or `cf-connecting-ip` headers)
- Value: Submission count and reset timestamp
- Cleanup: Automatic cleanup runs every minute to remove expired entries
- Storage: In-memory (resets on server restart)

IP address detection priority:
1. `x-forwarded-for` header (first IP in comma-separated list)
2. `x-real-ip` header
3. `cf-connecting-ip` header (Cloudflare)
4. Fallback: "unknown"

**Note:** In-memory rate limiting works well for single-instance deployments. For production multi-instance deployments, consider using Redis or similar for distributed rate limiting.

#### Rate Limits

Application rate limits:
- 3 submissions per IP address per 15 minutes

Resend API limits (Free tier):

- 100 emails/day
- 1 email/second

Production tier:

- Custom limits based on plan

#### Environment Variables

Required:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

Get API key from: [resend.com/api-keys](https://resend.com/api-keys)

---

## Adding New Server Actions

### Step 1: Create Action File

Create a new file in `app/actions/`:

```typescript
"use server";

import { z } from "zod";

// Define validation schema
const mySchema = z.object({
  field: z.string().min(1),
});

// Define state type
export type MyActionState = {
  success: boolean;
  data?: any;
  error?: string;
} | null;

// Define action
export async function myAction(
  _prevState: MyActionState,
  formData: FormData
): Promise<MyActionState> {
  try {
    // Validate input
    const validatedData = mySchema.parse({
      field: formData.get("field"),
    });

    // Perform action
    const result = await performAction(validatedData);

    // Return success
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    // Return error
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
```

### Step 2: Use in Component

```tsx
"use client";
import { useActionState } from "react";
import { myAction } from "@/app/actions/myAction";

export function MyComponent() {
  const [state, formAction] = useActionState(myAction, null);

  return <form action={formAction}>{/* form fields */}</form>;
}
```

---

## Best Practices

### Server Actions

1. **Always use "use server" directive** at top of file
2. **Validate all inputs** with Zod or similar
3. **Return typed responses** for type safety
4. **Handle errors gracefully** with try-catch
5. **Never expose sensitive data** in responses
6. **Use meaningful error messages** for users

### Security

1. **Validate on server-side** - Never trust client
2. **Sanitize inputs** - Prevent injection attacks
3. **Use environment variables** - For secrets
4. **Implement rate limiting** - Prevent abuse
5. **Log errors** - For debugging (not sensitive data)

### Performance

1. **Keep actions fast** - < 1 second response time
2. **Use appropriate caching** - When applicable
3. **Minimize external API calls** - Batch if possible
4. **Handle timeouts** - Set reasonable limits

### Testing

Test server actions with:

```typescript
import { submitContactForm } from "@/app/actions/contact";

describe("submitContactForm", () => {
  it("validates required fields", async () => {
    const formData = new FormData();
    formData.set("name", "");

    const result = await submitContactForm(null, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.name).toBeDefined();
  });
});
```

---

## External APIs

### Resend Email API

**Documentation:** [resend.com/docs](https://resend.com/docs)

**Endpoint:** Used internally by `resend` npm package

**Authentication:** API Key via environment variable

**Rate Limits:**

- Free: 100 emails/day, 1/second
- Paid: Custom limits

**Error Codes:**

- `validation_error` - Invalid input
- `invalid_api_key` - API key issue
- `rate_limit_exceeded` - Too many requests
- `internal_server_error` - Resend issue

---

## Monitoring & Debugging

### Logging

Server actions automatically log to:

- Console (development)
- Vercel logs (production)

Access logs:

```bash
# Vercel CLI
vercel logs --follow

# Or in Vercel dashboard
# Project → Settings → Functions → Logs
```

### Error Tracking

Integrate Sentry for error tracking:

```typescript
import * as Sentry from "@sentry/nextjs";

export async function myAction() {
  try {
    // action code
  } catch (error) {
    Sentry.captureException(error);
    return { success: false, error: "An error occurred" };
  }
}
```

### Performance Monitoring

Monitor action performance:

```typescript
export async function myAction() {
  const startTime = Date.now();

  // action code

  const duration = Date.now() - startTime;
  console.log(`Action took ${duration}ms`);

  return result;
}
```

---

## Future API Considerations

### Potential Additions

1. **Newsletter Subscription:**

   - Email validation
   - Mailchimp/ConvertKit integration
   - Confirmation email

2. **Project Quote Request:**

   - Multi-step form
   - File uploads
   - PDF generation

3. **Blog/CMS Integration:**

   - Fetch blog posts
   - Search functionality
   - Category filtering

4. **Analytics:**
   - Page view tracking
   - Event tracking
   - Conversion tracking

### API Design Guidelines

When adding new APIs:

1. Use server actions for form submissions
2. Use API routes (`app/api/`) for webhooks/third-party integrations
3. Document all endpoints in this file
4. Include TypeScript types
5. Provide usage examples
6. List error codes and responses
