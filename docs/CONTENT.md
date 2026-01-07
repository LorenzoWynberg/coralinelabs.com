# Content Management Guide

## Overview

This guide explains how to update and manage content on the Coraline Labs website. All content is stored in centralized data files, making updates simple without touching component code.

---

## Content Location

All website content is managed in:

```
lib/constants.ts
```

This file contains:

- Navigation links
- Service offerings
- Process steps
- Pricing packages
- Team member profiles
- Work portfolio case studies

---

## Updating Content

### Navigation Links

**Location:** `NAV_LINKS` constant

```typescript
export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#packages", label: "Packages" },
  { href: "#work", label: "Work" },
] as const;
```

**To add a link:**

1. Add new object to array
2. `href` must match section `id` (include `#`)
3. `label` is display text
4. Rebuild site: `bun run build`

**Example:**

```typescript
{ href: "#blog", label: "Blog" }
```

---

### Services Section

**Location:** `SERVICES` constant

```typescript
export const SERVICES = [
  {
    title: "Brand & Visual Identity",
    description: "Logo creation, color palettes, typography...",
    icon: Palette,
  },
  // ... more services
] as const;
```

**Fields:**

- `title` (string): Service name
- `description` (string): What the service includes
- `icon` (component): Lucide React icon

**Available icons:** Browse [lucide.dev](https://lucide.dev)

**To add a service:**

1. Import new icon at top of file:
   ```typescript
   import { IconName } from "lucide-react";
   ```
2. Add service object to array
3. Use imported icon name for `icon` field

**Example:**

```typescript
{
  title: "SEO Optimization",
  description: "Improve search rankings and organic traffic.",
  icon: Search,
}
```

---

### Approach Steps

**Location:** `APPROACH_STEPS` constant

```typescript
export const APPROACH_STEPS = [
  {
    step: 1,
    title: "Understand",
    description: "We learn your business...",
  },
  // ... more steps
] as const;
```

**Fields:**

- `step` (number): Step number (1-4)
- `title` (string): Step name
- `description` (string): What happens in this step

**To modify:**

1. Update existing steps or add new ones
2. Ensure `step` numbers are sequential
3. Keep descriptions concise (1-2 sentences)

---

### Pricing Packages

**Location:** `PACKAGES` constant

```typescript
export const PACKAGES = [
  {
    name: "Digital Presence",
    price: "$1,500 - $3,000",
    description: "Perfect for businesses needing...",
    features: [
      "1-5 page website or landing page",
      "UX & conversion-focused copy",
      // ... more features
    ],
    highlighted: false,
  },
  // ... more packages
] as const;
```

**Fields:**

- `name` (string): Package name
- `price` (string): Price or price range
- `description` (string): Brief description
- `features` (string[]): List of included features
- `highlighted` (boolean, optional): Show as "most popular"

**To add a package:**

```typescript
{
  name: "Enterprise",
  price: "Custom Pricing",
  description: "For large-scale projects",
  features: [
    "Dedicated team",
    "Priority support",
    "Custom integrations",
  ],
  highlighted: true,
}
```

**Feature formatting tips:**

- Start with action verb or noun
- Keep each feature to one line
- Use clear, benefit-focused language
- Add checkmarks automatically rendered

---

### Team Members

**Location:** `TEAM_MEMBERS` constant

```typescript
export const TEAM_MEMBERS = [
  {
    name: "John Doe",
    role: "Founder & Lead Developer",
    bio: "10+ years building scalable web applications...",
    image: "/imgs/team/john.jpg",
    social: {
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      github: "https://github.com/johndoe",
    },
  },
  // ... more team members
] as const;
```

**Fields:**

- `name` (string): Full name
- `role` (string): Job title
- `bio` (string): Short bio (2-3 sentences)
- `image` (string): Photo path (relative to `public/`)
- `social` (object, optional): Social media links

**To add a team member:**

1. Add team member photo to `public/imgs/team/`
2. Add team member object to array
3. Include at least name, role, bio, and image

**Image requirements:**

- Format: JPG or PNG
- Dimensions: 400x400px (square)
- File size: < 200KB
- Location: `public/imgs/team/`

**Example:**

```typescript
{
  name: "Jane Smith",
  role: "UX Designer",
  bio: "Passionate about creating user-centered designs.",
  image: "/imgs/team/jane.jpg",
  social: {
    linkedin: "https://linkedin.com/in/janesmith",
  },
}
```

---

### Work Portfolio

**Location:** `WORK_PORTFOLIO` constant

```typescript
export const WORK_PORTFOLIO = [
  {
    title: "MEP Property Management",
    description: "Full-featured property management platform...",
    image: "/imgs/work/mep.jpg",
    technologies: ["Next.js", "React", "PostgreSQL", "Tailwind"],
    link: "https://mep.example.com",
    category: "Platform",
  },
  // ... more projects
] as const;
```

**Fields:**

- `title` (string): Project name
- `description` (string): What the project does
- `image` (string): Screenshot or hero image
- `technologies` (string[]): Tech stack used
- `link` (string, optional): Live project URL
- `category` (string, optional): Project type

**To add a case study:**

1. Add project screenshot to `public/imgs/work/`
2. Add project object to array
3. List 3-6 key technologies

**Image requirements:**

- Format: JPG or PNG
- Dimensions: 1200x800px (3:2 ratio)
- File size: < 500KB
- Location: `public/imgs/work/`

**Example:**

```typescript
{
  title: "E-Commerce Store",
  description: "Modern online store with real-time inventory.",
  image: "/imgs/work/store.jpg",
  technologies: ["Next.js", "Shopify", "Stripe", "Vercel"],
  link: "https://store.example.com",
  category: "E-Commerce",
}
```

---

## Adding Images

### Team Photos

1. Prepare image:

   - Square format (400x400px)
   - Professional headshot
   - Plain or brand-colored background
   - Optimized file size (< 200KB)

2. Save to:

   ```
   public/imgs/team/member-name.jpg
   ```

3. Reference in constants:
   ```typescript
   image: "/imgs/team/member-name.jpg";
   ```

### Project Screenshots

1. Prepare image:

   - 3:2 aspect ratio (1200x800px)
   - Clean, representative screenshot
   - Show key features
   - Optimized file size (< 500KB)

2. Save to:

   ```
   public/imgs/work/project-name.jpg
   ```

3. Reference in constants:
   ```typescript
   image: "/imgs/work/project-name.jpg";
   ```

### Logos

1. Prepare logo files:

   - SVG format (preferred) or PNG
   - Multiple versions: full, icon, white, color
   - Transparent background

2. Save to:

   ```
   public/imgs/logos/
   ```

3. Use in components as needed

---

## Text Content Updates

### Hero Section

**File:** `components/sections/HeroSection.tsx`

Update the main tagline and intro text directly in the component:

```tsx
<h1>Your New Tagline Here</h1>
<p>Your introduction paragraph...</p>
```

### About Section

**File:** `components/sections/AboutSection.tsx`

Update mission statement and values:

```tsx
<h2>About Coraline Labs</h2>
<p>Your mission statement...</p>
```

### Contact Section

**File:** `components/sections/ContactSection.tsx`

Update contact information:

```tsx
<p>Email: contact@coralinelabs.com</p>
<p>Phone: +1 (555) 123-4567</p>
```

### Footer

**File:** `components/layout/Footer.tsx`

Update copyright, social links, and footer text:

```tsx
<p>&copy; {new Date().getFullYear()} Coraline Labs</p>
```

---

## Styling Updates

### Brand Colors

**File:** `app/globals.css`

Update color variables:

```css
@theme inline {
  --color-bone: #f5f2ec;
  --color-coral: #d07a5f;
  --color-papaya: #e6a57e;
  --color-sea: #a9c7c9;
  --color-sand: #cfc6b8;
  --color-driftwood: #8a8f8c;
  --color-charcoal: #2e2e2c;
}
```

**Usage in components:**

```tsx
<div className="bg-bone text-charcoal">
```

### Fonts

**File:** `app/layout.tsx`

Update font imports if changing typefaces:

```tsx
import { Inter, Playfair_Display } from "next/font/google";
```

---

## Metadata & SEO

**File:** `app/layout.tsx`

Update site metadata:

```typescript
export const metadata: Metadata = {
  title: "Coraline Labs - Digital Agency",
  description: "Thoughtful design, reliable systems.",
  keywords: ["web design", "development", "agency"],
  openGraph: {
    title: "Coraline Labs",
    description: "Thoughtful design, reliable systems.",
    images: ["/imgs/og-image.jpg"],
  },
};
```

---

## Content Best Practices

### Writing Guidelines

1. **Be concise:** Clear, direct language
2. **Use active voice:** "We build" not "is built by us"
3. **Focus on benefits:** What clients gain
4. **Avoid jargon:** Unless industry-standard
5. **Proofread:** Check spelling and grammar

### Image Guidelines

1. **Optimize size:** Compress before uploading
2. **Use WebP:** When possible (Next.js auto-converts)
3. **Alt text:** Describe images for accessibility
4. **Consistent style:** Match brand aesthetic
5. **High quality:** Professional appearance

### Link Guidelines

1. **Descriptive text:** "View project" not "Click here"
2. **Open externally:** Use `target="_blank"` for external links
3. **Test links:** Verify all URLs work
4. **HTTPS only:** Secure links
5. **Update regularly:** Check for broken links

---

## Testing Changes

After updating content:

1. **Visual check:**

   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

2. **Test all sections:**

   - Verify text displays correctly
   - Check images load
   - Test links work
   - Verify responsive layout

3. **Build test:**

   ```bash
   bun run build
   ```

   Ensure no errors

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Update content: [what changed]"
   git push
   ```

---

## Common Tasks

### Add a New Service

1. Open `lib/constants.ts`
2. Import icon: `import { IconName } from "lucide-react"`
3. Add to `SERVICES` array
4. Test locally
5. Commit and push

### Update Pricing

1. Open `lib/constants.ts`
2. Find `PACKAGES` array
3. Update `price` or `features`
4. Test locally
5. Commit and push

### Add Team Member

1. Add photo to `public/imgs/team/`
2. Open `lib/constants.ts`
3. Add to `TEAM_MEMBERS` array
4. Test locally
5. Commit and push

### Update Case Study

1. Add screenshot to `public/imgs/work/` (if new)
2. Open `lib/constants.ts`
3. Update or add to `WORK_PORTFOLIO` array
4. Test locally
5. Commit and push

---

## Troubleshooting

### Images Not Showing

- Check file path is correct (case-sensitive)
- Verify image exists in `public/` directory
- Ensure image format is supported (jpg, png, webp, svg)
- Clear cache: `rm -rf .next` and rebuild

### Content Not Updating

- Check you're editing the correct file
- Verify syntax (no missing commas, quotes)
- Restart dev server: Stop and run `bun dev` again
- Clear browser cache

### Build Errors

- Check TypeScript errors
- Verify all imports are correct
- Ensure no missing commas in arrays
- Check console for specific error messages

---

## Content Backup

Recommended backup strategy:

1. **Git history:** All content changes tracked
2. **Regular commits:** Commit after each update
3. **Backup constants file:**
   ```bash
   cp lib/constants.ts lib/constants.backup.ts
   ```
4. **Export content:**
   ```bash
   # Export to JSON for external backup
   # (requires custom script)
   ```

---

## Content Schedule

Recommended update frequency:

| Content Type   | Frequency | Notes                  |
| -------------- | --------- | ---------------------- |
| Services       | Quarterly | As offerings evolve    |
| Packages       | Quarterly | Price/feature updates  |
| Team           | As needed | New hires, changes     |
| Work Portfolio | Monthly   | New projects           |
| About          | Annually  | Mission/vision updates |
| Contact Info   | As needed | Address/phone changes  |

---

## Support

For content management help:

- Check this documentation
- Review `lib/constants.ts` for examples
- Test changes locally before deploying
- Contact development team for technical issues
