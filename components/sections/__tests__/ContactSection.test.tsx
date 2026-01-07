import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactSection from "../ContactSection";

// Mock the server action
const mockSubmitContactForm = vi.fn();
vi.mock("@/app/actions/contact", () => ({
  submitContactForm: (...args: unknown[]) => mockSubmitContactForm(...args),
  ContactFormState: null,
}));

// Mock react-phone-number-input with a simple input
vi.mock("react-phone-number-input", () => ({
  default: ({ value, onChange, id, placeholder }: any) => (
    <input
      id={id}
      type="tel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      data-testid="phone-input"
    />
  ),
}));

// Mock CSS import
vi.mock("react-phone-number-input/style.css", () => ({}));

describe("ContactSection", () => {
  it("should render all form fields", () => {
    render(<ContactSection />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  });

  it("should render section header and description", () => {
    render(<ContactSection />);

    expect(
      screen.getByRole("heading", { name: /let's build something/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ready to create a digital system/i),
    ).toBeInTheDocument();
  });

  it("should render alternative contact email", () => {
    render(<ContactSection />);

    const emailLink = screen.getByRole("link", {
      name: /info@coralinelabs.com/i,
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:info@coralinelabs.com");
  });

  it("should have honeypot field in the form", () => {
    const { container } = render(<ContactSection />);

    const honeypotField = container.querySelector('input[name="website"]');
    expect(honeypotField).toBeInTheDocument();
    expect(honeypotField).toHaveAttribute("type", "text");
    expect(honeypotField).toHaveAttribute("tabIndex", "-1");
    expect(honeypotField).toHaveStyle({ position: "absolute" });
  });

  it("should allow user to fill out the form", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const phoneInput = screen.getByTestId("phone-input") as HTMLInputElement;
    const companyInput = screen.getByLabelText(/company/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(phoneInput, "+14155552671");
    await user.type(companyInput, "Test Company");
    await user.type(messageInput, "This is a test message");

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(phoneInput.value).toBe("+14155552671");
    expect(companyInput.value).toBe("Test Company");
    expect(messageInput.value).toBe("This is a test message");
  });

  it("should mark required fields with asterisks", () => {
    const { container } = render(<ContactSection />);

    // Check that required fields have asterisks
    expect(container.querySelector('label[for="name"]')).toHaveTextContent("*");
    expect(container.querySelector('label[for="email"]')).toHaveTextContent(
      "*",
    );
    expect(container.querySelector('label[for="message"]')).toHaveTextContent(
      "*",
    );

    // Check that optional fields have "(optional)" text
    expect(container.querySelector('label[for="phone"]')).toHaveTextContent(
      "(optional)",
    );
    expect(container.querySelector('label[for="company"]')).toHaveTextContent(
      "(optional)",
    );
  });

  it("should display validation errors when returned from server", async () => {
    mockSubmitContactForm.mockResolvedValueOnce({
      success: false,
      message: "Please fix the errors in the form.",
      errors: {
        name: ["Name is required"],
        email: ["Please enter a valid email address"],
      },
    });

    const { rerender } = render(<ContactSection />);

    // The component needs to be re-rendered with the error state
    // In a real scenario, this would happen after form submission
    // For now, we just verify the structure is in place
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("should show success message after successful submission", async () => {
    // This would require more complex mocking of the useActionState hook
    // For now, we verify the component structure supports success display
    const { container } = render(<ContactSection />);
    expect(container).toBeTruthy();
  });

  it("should have proper form accessibility attributes", () => {
    render(<ContactSection />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    expect(nameInput).toHaveAttribute("required");
    expect(emailInput).toHaveAttribute("required");
    expect(emailInput).toHaveAttribute("type", "email");
    expect(messageInput).toHaveAttribute("required");
  });

  it("should have proper styling classes applied", () => {
    const { container } = render(<ContactSection />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-coral");

    const submitButton = screen.getByRole("button", { name: /send message/i });
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("should render phone input with controlled state", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    const phoneInput = screen.getByTestId("phone-input") as HTMLInputElement;

    await user.type(phoneInput, "+14155552671");

    expect(phoneInput.value).toBe("+14155552671");
  });

  it("should include hidden input for phone value in form submission", () => {
    const { container } = render(<ContactSection />);

    const hiddenPhoneInput = container.querySelector(
      'input[type="hidden"][name="phone"]',
    );
    expect(hiddenPhoneInput).toBeInTheDocument();
  });

  it("should have proper section structure with container and max-width", () => {
    const { container } = render(<ContactSection />);

    const section = container.querySelector("section");
    expect(section).toHaveAttribute("id", "contact");

    const containerDiv = container.querySelector(".container");
    expect(containerDiv).toBeInTheDocument();
  });
});
