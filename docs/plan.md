# Coraline Labs Website Implementation Plan

## Overview
Single-page scrolling website for Coraline Labs digital agency, built with Next.js 16.1.1, React 19, TypeScript, Tailwind CSS v4, and **shadcn/ui** for polished, accessible components.

---

## File Structure

```
coralinelabs.com/
├── app/
│   ├── layout.tsx              # Root layout with fonts, metadata
│   ├── page.tsx                # Main page composing all sections
│   ├── globals.css             # Tailwind v4 theme with brand colors
│   └── favicon.ico             # Update with symbol logo
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Fixed nav with logo + smooth scroll links
│   │   └── Footer.tsx          # Footer with stacked logo
│   ├── sections/
│   │   ├── HeroSection.tsx     # Tagline + intro
│   │   ├── AboutSection.tsx    # Mission, values, positioning
│   │   ├── ServicesSection.tsx # What we do (6 services)
│   │   ├── ApproachSection.tsx # 4-step process
│   │   ├── PackagesSection.tsx # Pricing tiers
│   │   ├── WorkSection.tsx     # Case studies (MEP, Mandados, BAP)
│   │   ├── TeamSection.tsx     # 3 team members with placeholders
│   │   └── ContactSection.tsx  # CTA + contact info
│   └── ui/                     # shadcn/ui components (auto-generated)
│       ├── button.tsx
│       ├── card.tsx
│       ├── navigation-menu.tsx
│       └── sheet.tsx
└── lib/
    └── constants.ts            # Content data (team, services, packages)
```

---

## Phase 0: shadcn/ui Setup

### 0.1 Initialize shadcn/ui
```bash
bunx shadcn@latest init
```
- Style: Default
- Base color: Neutral (we'll customize with brand colors)
- CSS variables: Yes

### 0.2 Add required components
```bash
bunx shadcn@latest add button card navigation-menu sheet input textarea label
```

### 0.3 Customize shadcn theme
Update `app/globals.css` to map shadcn CSS variables to brand colors:
- `--primary` → Coral (#D07A5F)
- `--secondary` → Sea (#A9C7C9)
- `--background` → Bone (#F5F2EC)
- `--foreground` → Charcoal (#2E2E2C)
- `--muted` → Sand (#CFC6B8)
- `--accent` → Papaya (#E6A57E)

---

## Phase 1: Foundation Setup

### 1.1 Update `app/globals.css` with brand theme
```css
@import "tailwindcss";

@theme inline {
  --color-bone: #F5F2EC;
  --color-coral: #D07A5F;
  --color-papaya: #E6A57E;
  --color-sea: #A9C7C9;
  --color-sand: #CFC6B8;
  --color-driftwood: #8A8F8C;
  --color-charcoal: #2E2E2C;
  
  --font-display: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bone);
  color: var(--color-charcoal);
  font-family: var(--font-body);
}
```

### 1.2 Update `app/layout.tsx`
- Import fonts from Google Fonts:
  - **Playfair Display** (headings) - editorial, luxury feel
  - **Inter** (body text) - clean, modern
- Update metadata (title, description, OG tags)
- Set favicon to symbol logo

### 1.3 Create folder structure
- `components/layout/`
- `components/sections/`
- `components/ui/`
- `lib/`

---

## Phase 2: Layout Components

### 2.1 `components/layout/Header.tsx`
- Fixed position at top
- Horizontal logo (`/imgs/logos/01_primary_horizontal.png`)
- Navigation links: About, Services, Packages, Work, Team, Contact
- Mobile hamburger menu (using shadcn Sheet)
- Smooth scroll to sections via anchor links

### 2.2 `components/layout/Footer.tsx`
- Stacked logo (`/imgs/logos/02_stacked.png`)
- Copyright text
- Optional social links
- Background: charcoal

---

## Phase 3: Section Components

### 3.1 HeroSection
- Large tagline: "Built with care. Engineered to last."
- Subtext: Mission statement
- CTA button: "Get in touch"
- Background: bone white

### 3.2 AboutSection
- Heading: "Who We Are"
- Positioning statement + values
- Content from About_Us.docx
- Background: bone white

### 3.3 ServicesSection
- Heading: "What We Do"
- 6 service cards in grid (using shadcn Card):
  1. Brand & Visual Identity
  2. Websites & Landing Pages
  3. Internal Tools & Dashboards
  4. Custom Platforms & Applications
  5. Automations & Integrations
  6. Ongoing Support
- Background: charcoal (dark section for contrast)

### 3.4 ApproachSection
- Heading: "Our Approach"
- 4-step horizontal timeline:
  1. Understand the business
  2. Design the system
  3. Build with intention
  4. Support and evolve
- Background: bone white

### 3.5 PackagesSection
- Heading: "Packages"
- 4 package cards + retainer options (using shadcn Card):
  - Digital Presence ($1,500-$3,000)
  - Brand & Visual Identity ($1,500-$4,000)
  - Automations & Integrations ($2,000-$8,000)
  - Custom Systems ($8,000-$25,000+)
- Retainers: Care ($300/mo), Growth ($600/mo), Ops Partner ($1,200/mo)
- Background: sand/neutral

### 3.6 WorkSection
- Heading: "Our Work"
- 3 case study cards:
  - MEP (National Education Platform)
  - Mandados (Logistics Platform)
  - BAP (Distributed Systems)
- Minimal cards with title + brief description
- Background: bone white

### 3.7 TeamSection
- Heading: "The Team"
- 3 team member cards:
  - Zacc Pollitt - Design & Brand Lead (coral placeholder)
  - Lorenzo Wynberg - Systems & Product Lead (sea placeholder)
  - Carlos Villalta - Backend & Infrastructure (papaya placeholder)
- Placeholder: colored circle with initials
- Background: charcoal (dark section)

### 3.8 ContactSection
- Heading: "Let's Build Something"
- Contact form with fields (using shadcn Input, Textarea, Label):
  - Name (required)
  - Email (required)
  - Company (optional)
  - Message (required, textarea)
  - Submit button
- Form submission via Server Action → Resend API
- Success/error state handling
- Background: coral accent

---

## Phase 4: UI Components (via shadcn/ui)

shadcn components will be installed to `components/ui/`:
- `button.tsx` - Pre-built with variants, customized with brand colors
- `card.tsx` - Card, CardHeader, CardContent, CardFooter
- `navigation-menu.tsx` - Accessible desktop navigation
- `sheet.tsx` - Mobile slide-out menu
- `input.tsx` - Form input fields
- `textarea.tsx` - Form textarea
- `label.tsx` - Form labels

These come with full accessibility (keyboard nav, ARIA) out of the box.

---

## Phase 5: Content Data & API

### 5.1 `lib/constants.ts`
- Team members array (name, role, bio, initials, color)
- Services array (title, description, icon)
- Packages array (name, price range, features)
- Case studies array (name, description, tags)

### 5.2 `app/actions/contact.ts`
- Server Action for form submission
- Validate form data
- Send email via Resend API to `info@coralinelabs.com`
- Return success/error response
- Env vars: `RESEND_API_KEY`

---

## Phase 6: Main Page Assembly

### 6.1 Update `app/page.tsx`
```tsx
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ApproachSection from '@/components/sections/ApproachSection'
import PackagesSection from '@/components/sections/PackagesSection'
import WorkSection from '@/components/sections/WorkSection'
import TeamSection from '@/components/sections/TeamSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ApproachSection />
        <PackagesSection />
        <WorkSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
```

---

## Phase 7: Polish & Responsive

- Mobile navigation (hamburger menu with shadcn Sheet)
- Responsive grid layouts (1 col mobile, 2-3 cols desktop)
- Hover states on cards and buttons
- Smooth scroll behavior
- Accessibility (semantic HTML, ARIA labels, focus states)

---

## Dependencies

shadcn/ui will automatically add:
- `lucide-react` (icons)
- `class-variance-authority` (component variants)
- `clsx` + `tailwind-merge` (class utilities)
- `@radix-ui/*` (accessible primitives)

Additional:
```bash
bun add resend  # Email API for contact form
```

---

## Files to Modify/Create

| Action | File Path |
|--------|-----------|
| Modify | `app/globals.css` |
| Modify | `app/layout.tsx` |
| Modify | `app/page.tsx` |
| Create | `components/layout/Header.tsx` |
| Create | `components/layout/Footer.tsx` |
| Create | `components/sections/HeroSection.tsx` |
| Create | `components/sections/AboutSection.tsx` |
| Create | `components/sections/ServicesSection.tsx` |
| Create | `components/sections/ApproachSection.tsx` |
| Create | `components/sections/PackagesSection.tsx` |
| Create | `components/sections/WorkSection.tsx` |
| Create | `components/sections/TeamSection.tsx` |
| Create | `components/sections/ContactSection.tsx` |
| Create | `lib/constants.ts` |
| Create | `app/actions/contact.ts` |

---

## Existing Assets to Use

- `/public/imgs/logos/01_primary_horizontal.png` - Header
- `/public/imgs/logos/02_stacked.png` - Footer
- `/public/imgs/logos/03_symbol_only.png` - Favicon

---

## Brand Colors Reference

| Name | Hex | Usage |
|------|-----|-------|
| Bone White | #F5F2EC | Primary background |
| Coral Clay | #D07A5F | Primary accent, CTAs |
| Papaya Dust | #E6A57E | Secondary accent |
| Soft Sea Blue | #A9C7C9 | Accent |
| Chukum Sand | #CFC6B8 | Neutral backgrounds |
| Driftwood Gray | #8A8F8C | Neutral text |
| Charcoal Reef | #2E2E2C | Dark backgrounds, text |

---

## Typography

- **Headings**: Playfair Display (Google Fonts)
- **Body**: Inter (Google Fonts)
