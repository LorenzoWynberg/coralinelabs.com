# Component Documentation

## Overview

This document provides detailed information about all components in the Coraline Labs website.

## Layout Components

### Header

**Location:** `components/layout/Header.tsx`

Fixed navigation header with logo, navigation links, and mobile menu.

**Features:**

- Fixed positioning at top of viewport
- Smooth scroll navigation to sections
- Responsive mobile menu (hamburger)
- Logo display
- Active section highlighting

**Usage:**

```tsx
import Header from "@/components/layout/Header";

export default function Page() {
  return (
    <>
      <Header />
      <main>{/* content */}</main>
    </>
  );
}
```

**Styling:**

- Background: Bone (#F5F2EC) with backdrop blur
- Text: Charcoal (#2E2E2C)
- Active link: Coral (#D07A5F)

---

### Footer

**Location:** `components/layout/Footer.tsx`

Footer with branding, links, and copyright information.

**Features:**

- Company branding
- Social media links
- Quick navigation links
- Copyright notice
- Contact information

**Usage:**

```tsx
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <>
      <main>{/* content */}</main>
      <Footer />
    </>
  );
}
```

---

## Section Components

All sections follow a consistent structure:

- Section wrapper with `id` for navigation
- Container for content centering
- Responsive padding and spacing

### HeroSection

**Location:** `components/sections/HeroSection.tsx`

Landing section with tagline, introduction, and primary CTA.

**Features:**

- Large heading with brand tagline
- Subheading with company description
- Call-to-action button
- Visual hierarchy with typography scale

**Content:**

- Tagline: "Thoughtful design, reliable systems"
- Description: Brand positioning
- CTA: Link to contact section

---

### AboutSection

**Location:** `components/sections/AboutSection.tsx`

Mission statement, values, and company positioning.

**Features:**

- Company mission
- Value propositions
- Brand differentiation
- Editorial layout

**Content:**

- Who we serve
- What we believe
- How we work

---

### ServicesSection

**Location:** `components/sections/ServicesSection.tsx`

Grid of service offerings with icons and descriptions.

**Features:**

- 6 service cards in responsive grid
- Lucide icons for visual representation
- Hover effects on cards
- Consistent card styling

**Services:**

1. Brand & Visual Identity
2. Websites & Landing Pages
3. Internal Tools & Dashboards
4. Custom Platforms & Applications
5. Automations & Integrations
6. Ongoing Support

**Data Source:** `SERVICES` array in `lib/constants.ts`

---

### ApproachSection

**Location:** `components/sections/ApproachSection.tsx`

4-step process explaining how Coraline Labs works.

**Features:**

- Numbered steps (1-4)
- Step titles and descriptions
- Visual progression
- Clean, linear layout

**Steps:**

1. Understand - Learn business goals
2. Design - Architecture and UX
3. Build - Reliable implementation
4. Support - Ongoing evolution

**Data Source:** `APPROACH_STEPS` array in `lib/constants.ts`

---

### PackagesSection

**Location:** `components/sections/PackagesSection.tsx`

Pricing tiers with features and pricing ranges.

**Features:**

- 3 package cards
- Price ranges
- Feature lists with checkmarks
- Hover effects
- "Most Popular" badge (optional)

**Packages:**

1. Digital Presence ($1,500 - $3,000)
2. Brand & Visual Identity ($1,500 - $4,000)
3. Custom Build (Contact for pricing)

**Data Source:** `PACKAGES` array in `lib/constants.ts`

---

### WorkSection

**Location:** `components/sections/WorkSection.tsx`

Case studies and portfolio showcase.

**Features:**

- Project cards with images
- Project titles and descriptions
- Technology stack tags
- Links to live projects (optional)
- Grid layout

**Projects:**

- MEP (Property Management)
- Mandados (Logistics Platform)
- BAP (Business Application)

**Data Source:** `WORK_PORTFOLIO` array in `lib/constants.ts`

---

### TeamSection

**Location:** `components/sections/TeamSection.tsx`

Team member profiles with photos, names, and roles.

**Features:**

- Profile cards in grid
- Team member photos (placeholder support)
- Names and titles
- Short bios
- Social links (optional)

**Data Source:** `TEAM_MEMBERS` array in `lib/constants.ts`

---

### ContactSection

**Location:** `components/sections/ContactSection.tsx`

Contact form and call-to-action.

**Features:**

- Form with validation
- Server action submission
- Success/error messaging
- Required fields: name, email, message
- Optional field: company
- Contact information display
- Email and phone links

**Form Validation:**

- Name: 1-100 characters
- Email: Valid email format
- Company: 0-100 characters (optional)
- Message: 10-1000 characters

**Server Action:** `submitContactForm` from `app/actions/contact.ts`

---

## UI Components (shadcn/ui)

### Button

**Location:** `components/ui/button.tsx`

Reusable button component with variants.

**Variants:**

- `default` - Primary coral button
- `destructive` - Red error button
- `outline` - Outlined button
- `secondary` - Secondary styling
- `ghost` - Transparent button
- `link` - Link-styled button

**Sizes:**

- `default` - Standard size
- `sm` - Small
- `lg` - Large
- `icon` - Icon-only

**Usage:**

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="lg">
  Click Me
</Button>;
```

---

### Card

**Location:** `components/ui/card.tsx`

Container component for content cards.

**Sub-components:**

- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Description text
- `CardContent` - Main content area
- `CardFooter` - Footer section

**Usage:**

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
</Card>;
```

---

### Input

**Location:** `components/ui/input.tsx`

Form input component with consistent styling.

**Features:**

- Supports all HTML input types
- Focus states
- Error states (via parent form)
- Disabled states

**Usage:**

```tsx
import { Input } from "@/components/ui/input";

<Input type="email" placeholder="you@example.com" required />;
```

---

### Textarea

**Location:** `components/ui/textarea.tsx`

Multi-line text input component.

**Features:**

- Auto-resizing (optional)
- Focus states
- Character count support
- Error states

**Usage:**

```tsx
import { Textarea } from "@/components/ui/textarea";

<Textarea placeholder="Your message..." rows={5} />;
```

---

### Label

**Location:** `components/ui/label.tsx`

Form label component for accessibility.

**Features:**

- Proper `htmlFor` association
- Required indicator (optional)
- Consistent styling

**Usage:**

```tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>;
```

---

### Sheet

**Location:** `components/ui/sheet.tsx`

Slide-out panel component (used for mobile menu).

**Sub-components:**

- `Sheet` - Root component
- `SheetTrigger` - Trigger button
- `SheetContent` - Panel content
- `SheetHeader` - Panel header
- `SheetTitle` - Panel title
- `SheetDescription` - Panel description
- `SheetFooter` - Panel footer

**Sides:**

- `top` - Slides from top
- `right` - Slides from right (default)
- `bottom` - Slides from bottom
- `left` - Slides from left

**Usage:**

```tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

<Sheet>
  <SheetTrigger>Open Menu</SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
    {/* menu content */}
  </SheetContent>
</Sheet>;
```

---

## Utility Functions

### cn()

**Location:** `lib/utils.ts`

Utility for merging Tailwind CSS classes.

**Features:**

- Combines class names
- Resolves conflicts (last class wins)
- Removes duplicates
- Handles conditional classes

**Usage:**

```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  isActive && "active-class",
  isDisabled && "disabled-class"
)}>
```

**Implementation:**

```typescript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Constants

### NAV_LINKS

Navigation links for header.

**Type:**

```typescript
{
  href: string;
  label: string;
}
[];
```

### SERVICES

Service offerings data.

**Type:**

```typescript
{
  title: string;
  description: string;
  icon: LucideIcon;
}
[];
```

### APPROACH_STEPS

Process steps data.

**Type:**

```typescript
{
  step: number;
  title: string;
  description: string;
}
[];
```

### PACKAGES

Pricing package data.

**Type:**

```typescript
{
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}[]
```

### TEAM_MEMBERS

Team member profiles.

**Type:**

```typescript
{
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}[]
```

### WORK_PORTFOLIO

Case study projects.

**Type:**

```typescript
{
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}[]
```

---

## Component Guidelines

### Accessibility

- Use semantic HTML elements
- Provide `alt` text for images
- Use proper heading hierarchy (h1 → h2 → h3)
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Maintain sufficient color contrast

### Performance

- Lazy load images below the fold
- Use Next.js `Image` component
- Minimize component re-renders
- Avoid inline functions in JSX (extract to handlers)
- Use `useMemo` and `useCallback` when appropriate

### Responsive Design

- Mobile-first approach
- Test on multiple screen sizes
- Use Tailwind responsive prefixes (`md:`, `lg:`, etc.)
- Ensure touch targets are ≥44x44px
- Test on real devices

### Styling

- Use Tailwind utility classes
- Avoid custom CSS when possible
- Use CSS variables for colors
- Follow spacing scale (4px base)
- Maintain consistent border radius
- Use elevation/shadows sparingly

### Testing

- Test form validation edge cases
- Verify all links work
- Check mobile menu functionality
- Test on multiple browsers
- Validate HTML
- Check for console errors
