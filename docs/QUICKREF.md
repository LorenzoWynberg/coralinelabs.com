# Quick Reference Guide

Quick access to common commands, patterns, and solutions.

---

## Commands

### Development

```bash
bun dev                  # Start dev server on :3000
bun build                # Build for production
bun start                # Start production server
bun lint                 # Run ESLint
```

### Dependencies

```bash
bun install              # Install dependencies
bun add <package>        # Add new package
bun remove <package>     # Remove package
bun update               # Update all packages
```

### Git

```bash
git status               # Check status
git add .                # Stage all changes
git commit -m "message"  # Commit with message
git push                 # Push to remote
git pull                 # Pull latest changes
```

### Cleanup

```bash
rm -rf .next             # Clear Next.js cache
rm -rf node_modules      # Remove dependencies
bun install              # Reinstall dependencies
```

---

## File Paths Reference

### Components

```
components/
├── layout/
│   ├── Header.tsx       # Navigation header
│   └── Footer.tsx       # Site footer
├── sections/
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ServicesSection.tsx
│   ├── ApproachSection.tsx
│   ├── PackagesSection.tsx
│   ├── WorkSection.tsx
│   ├── TeamSection.tsx
│   └── ContactSection.tsx
└── ui/                  # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── textarea.tsx
    ├── label.tsx
    └── sheet.tsx
```

### Content & Configuration

```
lib/
├── constants.ts         # All website content
└── utils.ts             # Utility functions

app/
├── layout.tsx           # Root layout & metadata
├── page.tsx             # Main page composition
├── globals.css          # Global styles & theme
└── actions/
    └── contact.ts       # Contact form server action
```

---

## Code Patterns

### Import Aliases

```typescript
import Component from "@/components/Component"; // components/
import { constant } from "@/lib/constants"; // lib/
import { action } from "@/app/actions/action"; // app/actions/
```

### Component Structure

```tsx
import { type } from "types";

interface ComponentProps {
  prop: string;
}

export function Component({ prop }: ComponentProps) {
  // hooks
  const [state, setState] = useState();

  // handlers
  const handleClick = () => {};

  // render
  return <div>...</div>;
}
```

### Server Action

```typescript
"use server";

export async function myAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  // validate & process
  return { success: true };
}
```

### Client Form with Server Action

```tsx
"use client";
import { useActionState } from "react";

export function Form() {
  const [state, formAction] = useActionState(myAction, null);

  return <form action={formAction}>...</form>;
}
```

---

## Common Tailwind Classes

### Layout

```tsx
className = "flex flex-col gap-4"; // Vertical flex with gap
className = "grid grid-cols-3 gap-6"; // 3-column grid
className = "container mx-auto px-4"; // Centered container
className = "max-w-4xl mx-auto"; // Max width centered
```

### Spacing

```tsx
className = "p-6"; // Padding all sides
className = "px-4 py-6"; // Horizontal & vertical padding
className = "mt-8 mb-4"; // Top & bottom margin
className = "space-y-4"; // Vertical space between children
```

### Typography

```tsx
className = "text-3xl font-bold"; // Large bold heading
className = "text-lg text-charcoal"; // Large body text
className = "font-display"; // Playfair Display font
className = "leading-relaxed"; // Loose line height
```

### Colors (Brand)

```tsx
className = "bg-bone"; // Background bone
className = "text-coral"; // Text coral
className = "bg-papaya text-white"; // Papaya background, white text
className = "border-sea"; // Sea border
```

### Interactive

```tsx
className = "hover:bg-coral hover:text-white"; // Hover state
className = "focus:ring-2 focus:ring-coral"; // Focus ring
className = "transition-colors duration-200"; // Smooth transition
className = "cursor-pointer"; // Pointer cursor
```

### Responsive

```tsx
className = "text-base md:text-lg lg:text-xl"; // Responsive text
className = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"; // Responsive grid
className = "hidden md:block"; // Hidden on mobile
```

---

## shadcn/ui Patterns

### Button

```tsx
<Button variant="default">Primary</Button>
<Button variant="outline">Secondary</Button>
<Button size="lg">Large Button</Button>
```

### Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Form Input

```tsx
<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>
```

### Mobile Sheet

```tsx
<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
    </SheetHeader>
    {/* content */}
  </SheetContent>
</Sheet>
```

---

## Environment Variables

### Development (.env.local)

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Production (Vercel)

Add via dashboard or CLI:

```bash
vercel env add RESEND_API_KEY
```

---

## Content Updates

### Add Navigation Link

```typescript
// lib/constants.ts
export const NAV_LINKS = [{ href: "#section", label: "Section" }] as const;
```

### Add Service

```typescript
// lib/constants.ts
import { IconName } from "lucide-react";

export const SERVICES = [
  {
    title: "Service Name",
    description: "Description...",
    icon: IconName,
  },
] as const;
```

### Add Package

```typescript
// lib/constants.ts
export const PACKAGES = [
  {
    name: "Package Name",
    price: "$X,XXX",
    description: "Description",
    features: ["Feature 1", "Feature 2"],
  },
] as const;
```

### Add Team Member

```typescript
// lib/constants.ts
export const TEAM_MEMBERS = [
  {
    name: "Name",
    role: "Role",
    bio: "Bio...",
    image: "/imgs/team/name.jpg",
  },
] as const;
```

---

## Deployment

### Vercel (Recommended)

```bash
# Auto-deploy on push to main
git push origin main

# Manual deploy
vercel deploy --prod
```

### Build Locally

```bash
# Test production build
bun run build
bun start

# Open http://localhost:3000
```

---

## Debugging

### Clear Cache

```bash
rm -rf .next
bun dev
```

### Check Errors

```bash
bun run build        # Build errors
bun lint             # Lint errors
```

### View Logs

```bash
# Development console
bun dev              # Check terminal

# Production (Vercel)
vercel logs --follow
```

---

## Useful URLs

### Local Development

- **Dev Server:** http://localhost:3000
- **Next.js DevTools:** Built-in

### External Services

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Resend Dashboard:** https://resend.com/emails
- **GitHub Repository:** https://github.com/LorenzoWynberg/coralinelabs.com

### Documentation

- **Project Docs:** `docs/INDEX.md`
- **Next.js:** https://nextjs.org/docs
- **Tailwind:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com

---

## Troubleshooting Quick Fixes

### Contact form not working

```bash
# Check environment variable
echo $RESEND_API_KEY

# Restart server
bun dev
```

### Styles not applying

```bash
rm -rf .next
bun dev
```

### TypeScript errors

```bash
bun install
bun run build
```

### Images not loading

- Check path: `public/imgs/...`
- Use forward slashes: `/imgs/file.jpg`
- Restart dev server

### Build fails

```bash
# Clear everything
rm -rf .next node_modules
bun install
bun run build
```

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/my-feature

# Merge to main (via PR or locally)
git checkout main
git merge feature/my-feature
git push origin main
```

---

## Performance Tips

### Images

- Use Next.js `Image` component
- Optimize before upload (< 500KB)
- Use WebP format when possible

### Code

- Use dynamic imports for heavy components
- Minimize client-side JavaScript
- Use server components by default

### Monitoring

```bash
# Analyze bundle size
bun run build

# Run Lighthouse
# Open Chrome DevTools → Lighthouse
```

---

## Keyboard Shortcuts (VS Code)

```
Cmd/Ctrl + P          # Quick file open
Cmd/Ctrl + Shift + P  # Command palette
Cmd/Ctrl + B          # Toggle sidebar
Cmd/Ctrl + `          # Toggle terminal
Cmd/Ctrl + /          # Toggle comment
Cmd/Ctrl + D          # Select next occurrence
Cmd/Ctrl + Shift + F  # Search in files
```

---

## Component Import Paths

```typescript
// Layout
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Sections
import HeroSection from "@/components/sections/HeroSection";
// ... other sections

// UI Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Utils
import { cn } from "@/lib/utils";

// Constants
import { SERVICES, PACKAGES } from "@/lib/constants";

// Actions
import { submitContactForm } from "@/app/actions/contact";
```

---

For detailed information, see [Documentation Index](INDEX.md).
