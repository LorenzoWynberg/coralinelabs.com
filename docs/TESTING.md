# Testing Documentation

## Overview

This project uses **Vitest** as the testing framework with **React Testing Library** for component testing.

## Test Setup

### Dependencies

- `vitest` - Fast unit test framework
- `@vitest/ui` - UI for test visualization
- `@testing-library/react` - React component testing utilities
- `@testing-library/user-event` - User interaction simulation
- `@testing-library/jest-dom` - Custom matchers for DOM testing
- `happy-dom` - Lightweight DOM implementation for tests
- `@vitejs/plugin-react` - React plugin for Vite

### Configuration Files

- `vitest.config.mts` - Main Vitest configuration
- `vitest.setup.ts` - Test setup and global configuration

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui
```

## Test Structure

### Server Action Tests

Location: `app/actions/__tests__/contact.test.ts`

**Coverage:**
- Valid form submissions with various field combinations
- Honeypot spam detection
- Rate limiting (IP-based)
- Form submission flow

**Test Categories:**
1. **Valid Submissions** - Tests successful form submissions with different field combinations
2. **Honeypot Detection** - Validates bot detection mechanism
3. **Rate Limiting** - Ensures IP-based rate limiting works correctly

### Component Tests

Location: `components/sections/__tests__/ContactSection.test.tsx`

**Coverage:**
- Form rendering and structure
- Form field accessibility
- User interactions
- Phone number input handling
- Honeypot field presence

**Test Categories:**
1. **Rendering** - Validates all form elements render correctly
2. **Accessibility** - Checks proper ARIA labels and required attributes
3. **User Interactions** - Tests form filling and submission
4. **Structure** - Validates component structure and styling

## Current Test Results

```
Test Files: 2 passed (2)
Tests: 34 passed (34)
Components: ✓ ContactSection (13/13 tests)
Server Actions: ✓ submitContactForm (21/21 tests)
```

### Passing Tests

**Contact Form Component (13/13):**
- ✓ Renders all form fields
- ✓ Renders section header and description
- ✓ Renders alternative contact email
- ✓ Has honeypot field in the form
- ✓ Allows user to fill out the form
- ✓ Marks required fields with asterisks
- ✓ Has proper form accessibility attributes
- ✓ Has proper styling classes applied
- ✓ Renders phone input with controlled state
- ✓ Includes hidden input for phone value
- ✓ Has proper section structure

**Contact Server Action (21/21 tests):**

Valid Submissions:
- ✓ Successfully submits with all required fields
- ✓ Successfully submits with optional phone field
- ✓ Successfully submits with optional company field
- ✓ Successfully submits with all fields

Field Validation:
- ✓ Fails when name is missing
- ✓ Fails when name is too long
- ✓ Fails when email is invalid
- ✓ Fails when message is too short
- ✓ Fails when message is too long
- ✓ Fails when company is too long

Phone Validation:
- ✓ Accepts valid US phone number
- ✓ Accepts valid UK phone number
- ✓ Fails with invalid phone number
- ✓ Fails with phone number without country code

Spam Protection:
- ✓ Rejects submission when honeypot field is filled
- ✓ Accepts submission when honeypot field is empty

Rate Limiting:
- ✓ Allows first submission
- ✓ Allows up to 3 submissions
- ✓ Blocks 4th submission within rate limit window
- ✓ Tracks rate limits per IP address

Multi-field Validation:
- ✓ Returns all validation errors at once

## Key Features Tested

### 1. Spam Protection
- **Honeypot Field**: Hidden field that bots fill out
- **Rate Limiting**: 3 submissions per 15 minutes per IP
- **Both mechanisms tested and working**

### 2. Form Validation
- Required fields (name, email, message)
- Optional fields (phone, company)
- Phone number validation with international support
- Field length validations

### 3. User Experience
- Form accessibility
- Error message display
- Success state handling
- Form reset after submission

## Writing New Tests

### Component Test Example

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MyComponent from "../MyComponent";

describe("MyComponent", () => {
  it("should render correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

### Server Action Test Example

```typescript
import { describe, it, expect, vi } from "vitest";
import { myAction } from "../myAction";

// Mock dependencies
vi.mock("next/headers", () => ({
  headers: vi.fn(() => ({
    get: () => "192.168.1.1",
  })),
}));

describe("myAction", () => {
  it("should handle valid input", async () => {
    const formData = new FormData();
    formData.set("field", "value");

    const result = await myAction(null, formData);

    expect(result.success).toBe(true);
  });
});
```

## Best Practices

### 1. Test Organization
- Group related tests using `describe()` blocks
- Use clear, descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)

### 2. Mocking
- Mock external dependencies (APIs, environment variables)
- Use minimal mocking to keep tests realistic
- Reset mocks between tests

### 3. Assertions
- Use specific matchers (`toBeInTheDocument`, `toHaveLength`)
- Test behavior, not implementation details
- Avoid testing internal state

### 4. Accessibility
- Always test for proper ARIA labels
- Verify keyboard navigation
- Check screen reader compatibility

## Continuous Integration

To add tests to CI/CD:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:run
```

## Debugging Tests

### Run Specific Test File

```bash
npm run test:run app/actions/__tests__/contact.test.ts
```

### Run Specific Test

```bash
npm run test:run -t "test name pattern"
```

### Use Test UI

```bash
npm run test:ui
```

This opens a browser UI where you can:
- See test results visually
- Filter and search tests
- View test execution time
- Debug failing tests

## Code Coverage

To add coverage reporting:

```bash
# Add to package.json
"test:coverage": "vitest run --coverage"
```

Then install coverage tool:

```bash
npm install -D @vitest/coverage-v8
```

## Known Issues

### Rate Limiting in Tests

**Issue**: Rate limiting uses an in-memory store that persists across tests, which can cause tests to fail if they share the same IP address.

**Solution**: Each test uses a unique IP address to avoid cross-test interference:
```typescript
describe("MyTests", () => {
  let testCounter = 0;

  beforeEach(() => {
    testCounter++;
    mockHeaders.set("x-forwarded-for", `192.168.1.${testCounter}`);
  });
});
```

### Zod v4 Validation Error Messages

Zod v4 may produce different error message formats than expected. Tests check for error presence rather than specific message text to avoid brittleness:

```typescript
// Good - tests that errors exist
expect(result?.errors?.field).toBeDefined();
expect(result?.errors?.field).toHaveLength(1);

// Avoid - brittle to Zod version changes
expect(result?.errors?.field?.[0]).toBe("Exact error message");
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
