import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { submitContactForm } from "../contact";

// Mock Resend
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: "test-email-id" }),
    },
  })),
}));

// Mock next/headers
const mockHeaders = new Map<string, string>();
vi.mock("next/headers", () => ({
  headers: vi.fn(() => ({
    get: (key: string) => mockHeaders.get(key) || null,
  })),
}));

describe("submitContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHeaders.clear();
    mockHeaders.set("x-forwarded-for", "192.168.1.1");
  });

  const createFormData = (data: Record<string, string>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.set(key, value);
    });
    return formData;
  };

  describe("Valid submissions", () => {
    it("should successfully submit with all required fields", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        message: "This is a test message that is long enough",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(true);
      expect(result?.message).toBe(
        "Thank you for your message. We'll be in touch soon.",
      );
      expect(result?.errors).toBeUndefined();
    });

    it("should successfully submit with optional phone field", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        phone: "+14155552671",
        message: "This is a test message that is long enough",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(true);
      expect(result?.errors).toBeUndefined();
    });

    it("should successfully submit with optional company field", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        company: "Test Company",
        message: "This is a test message that is long enough",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(true);
      expect(result?.errors).toBeUndefined();
    });

    it("should successfully submit with all fields", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        phone: "+14155552671",
        company: "Test Company",
        message: "This is a test message that is long enough",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(true);
      expect(result?.errors).toBeUndefined();
    });
  });

  describe("Field validation", () => {
    it("should fail when name is missing", async () => {
      const formData = createFormData({
        email: "john@example.com",
        message: "This is a test message",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(false);
      expect(result?.errors?.name).toBeDefined();
      expect(result?.errors?.name?.[0]).toBe("Name is required");
    });

    it("should fail when name is too long", async () => {
      const formData = createFormData({
        name: "a".repeat(101),
        email: "john@example.com",
        message: "This is a test message that is long enough",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(false);
      expect(result?.errors?.name).toBeDefined();
      expect(result?.errors?.name?.[0]).toBe("Name is too long");
    });

    it("should fail when email is invalid", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "invalid-email",
        message: "This is a test message that is long enough",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(false);
      expect(result?.errors?.email).toBeDefined();
      expect(result?.errors?.email?.[0]).toBe(
        "Please enter a valid email address",
      );
    });

    it("should fail when message is too short", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        message: "Short",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(false);
      expect(result?.errors?.message).toBeDefined();
      expect(result?.errors?.message?.[0]).toBe(
        "Message must be at least 10 characters",
      );
    });

    it("should fail when message is too long", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        message: "a".repeat(1001),
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(false);
      expect(result?.errors?.message).toBeDefined();
      expect(result?.errors?.message?.[0]).toBe("Message is too long");
    });

    it("should fail when company is too long", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        company: "a".repeat(101),
        message: "This is a test message that is long enough",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(false);
      expect(result?.errors?.company).toBeDefined();
      expect(result?.errors?.company?.[0]).toBe("Company name is too long");
    });
  });

  describe("Phone validation", () => {
    it("should accept valid US phone number", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        phone: "+14155552671",
        message: "This is a test message that is long enough",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(true);
      expect(result?.errors?.phone).toBeUndefined();
    });

    it("should accept valid UK phone number", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        phone: "+442071838750",
        message: "This is a test message that is long enough",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(true);
      expect(result?.errors?.phone).toBeUndefined();
    });

    it("should fail with invalid phone number", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        phone: "123",
        message: "This is a test message that is long enough",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(false);
      expect(result?.errors?.phone).toBeDefined();
      expect(result?.errors?.phone?.[0]).toBe(
        "Please enter a valid phone number with country code",
      );
    });

    it("should fail with phone number without country code", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        phone: "4155552671",
        message: "This is a test message that is long enough",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(false);
      expect(result?.errors?.phone).toBeDefined();
    });
  });

  describe("Honeypot spam detection", () => {
    it("should reject submission when honeypot field is filled", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        message: "This is a test message that is long enough",
        website: "http://spam.com",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(false);
      expect(result?.message).toBe("Something went wrong. Please try again.");
    });

    it("should accept submission when honeypot field is empty", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        message: "This is a test message that is long enough",
        website: "",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(true);
    });
  });

  describe("Rate limiting", () => {
    beforeEach(() => {
      mockHeaders.set("x-forwarded-for", "192.168.1.100");
    });

    it("should allow first submission", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        message: "This is a test message that is long enough",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(true);
    });

    it("should allow up to 3 submissions", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        message: "This is a test message that is long enough",
      });

      // First submission
      let result = await submitContactForm(null, formData);
      expect(result?.success).toBe(true);

      // Second submission
      result = await submitContactForm(null, formData);
      expect(result?.success).toBe(true);

      // Third submission
      result = await submitContactForm(null, formData);
      expect(result?.success).toBe(true);
    });

    it("should block 4th submission within rate limit window", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        message: "This is a test message that is long enough",
      });

      // First three submissions should succeed
      await submitContactForm(null, formData);
      await submitContactForm(null, formData);
      await submitContactForm(null, formData);

      // Fourth submission should be rate limited
      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(false);
      expect(result?.message).toBe(
        "Too many submission attempts. Please try again in a few minutes.",
      );
    });

    it("should track rate limits per IP address", async () => {
      const formData = createFormData({
        name: "John Doe",
        email: "john@example.com",
        message: "This is a test message that is long enough",
      });

      // Use up rate limit for first IP
      mockHeaders.set("x-forwarded-for", "192.168.1.200");
      await submitContactForm(null, formData);
      await submitContactForm(null, formData);
      await submitContactForm(null, formData);
      const result1 = await submitContactForm(null, formData);
      expect(result1?.success).toBe(false);

      // Different IP should still work
      mockHeaders.set("x-forwarded-for", "192.168.1.201");
      const result2 = await submitContactForm(null, formData);
      expect(result2?.success).toBe(true);
    });
  });

  describe("Multiple validation errors", () => {
    it("should return all validation errors at once", async () => {
      const formData = createFormData({
        name: "",
        email: "invalid",
        phone: "123",
        message: "short",
      });

      const result = await submitContactForm(null, formData);

      expect(result?.success).toBe(false);
      expect(result?.errors?.name).toBeDefined();
      expect(result?.errors?.email).toBeDefined();
      expect(result?.errors?.phone).toBeDefined();
      expect(result?.errors?.message).toBeDefined();
    });
  });
});
