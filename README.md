# Coraline Labs Website

A modern, single-page scrolling website for Coraline Labs digital agency, showcasing services, work portfolio, team, and client engagement features.

## 🚀 Tech Stack

- **Framework:** [Next.js 16.1.1](https://nextjs.org) with App Router
- **UI Library:** React 19.2.3
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **Components:** [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives)
- **Icons:** Lucide React
- **Forms & Validation:** Zod
- **Email Service:** Resend API
- **Package Manager:** Bun

## 📁 Project Structure

```
coralinelabs.com/
├── app/
│   ├── layout.tsx              # Root layout with fonts, metadata
│   ├── page.tsx                # Main page composing all sections
│   ├── globals.css             # Tailwind v4 theme & brand colors
│   └── actions/
│       └── contact.ts          # Server action for contact form
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Fixed navigation with smooth scroll
│   │   └── Footer.tsx          # Footer with branding
│   ├── sections/
│   │   ├── HeroSection.tsx     # Landing section with tagline
│   │   ├── AboutSection.tsx    # Mission & values
│   │   ├── ServicesSection.tsx # Service offerings (6 services)
│   │   ├── ApproachSection.tsx # 4-step process
│   │   ├── PackagesSection.tsx # Pricing tiers
│   │   ├── WorkSection.tsx     # Case studies portfolio
│   │   ├── TeamSection.tsx     # Team member profiles
│   │   └── ContactSection.tsx  # Contact form & CTA
│   └── ui/                     # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── sheet.tsx
│       └── textarea.tsx
├── lib/
│   ├── constants.ts            # Content data & configuration
│   └── utils.ts                # Utility functions (cn helper)
├── public/
│   └── imgs/
│       └── logos/              # Brand assets
└── docs/
    └── plan.md                 # Detailed implementation plan
```

## 🎨 Brand Colors

The website uses a warm, modern color palette:

- **Bone** (#F5F2EC) - Background
- **Coral** (#D07A5F) - Primary accent
- **Papaya** (#E6A57E) - Secondary accent
- **Sea** (#A9C7C9) - Cool accent
- **Sand** (#CFC6B8) - Muted tones
- **Driftwood** (#8A8F8C) - Secondary text
- **Charcoal** (#2E2E2C) - Primary text

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your machine
- Node.js 20+ (for compatibility)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/LorenzoWynberg/coralinelabs.com.git
cd coralinelabs.com
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Add your Resend API key to `.env.local`:

```env
RESEND_API_KEY=your_resend_api_key_here
```

4. Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📜 Available Scripts

- `bun dev` - Start development server on port 3000
- `bun build` - Build production-ready application
- `bun start` - Start production server
- `bun lint` - Run ESLint for code quality checks

**💡 Quick Tip:** See [Quick Reference Guide](docs/QUICKREF.md) for more commands and code patterns.

## 🧩 Key Features

### Single-Page Architecture

- Smooth scrolling navigation between sections
- Fixed header with anchor links
- Mobile-responsive design with hamburger menu

### Contact Form

- Server-side validation using Zod
- Email delivery via Resend API
- Real-time error handling and success feedback
- Required fields: name, email, message
- Optional field: company

### Content Management

All content is centralized in [`lib/constants.ts`](lib/constants.ts):

- Navigation links
- Service offerings (6 services)
- Approach steps (4-step process)
- Pricing packages (3 tiers)
- Team member information
- Work portfolio case studies

### UI Components

Leveraging shadcn/ui for consistent, accessible components:

- `Button` - Primary CTAs with variants
- `Card` - Content containers for services, team, work
- `Input` / `Textarea` / `Label` - Form elements
- `Sheet` - Mobile navigation drawer

## 🔧 Configuration Files

- [`next.config.ts`](next.config.ts) - Next.js configuration
- [`tsconfig.json`](tsconfig.json) - TypeScript compiler options
- [`eslint.config.mjs`](eslint.config.mjs) - ESLint rules
- [`postcss.config.mjs`](postcss.config.mjs) - PostCSS plugins
- [`components.json`](components.json) - shadcn/ui configuration

## 📝 Content Updates

To update website content:

1. **Navigation Links**: Edit `NAV_LINKS` in [`lib/constants.ts`](lib/constants.ts)
2. **Services**: Modify `SERVICES` array
3. **Packages**: Update `PACKAGES` array
4. **Team Members**: Edit `TEAM_MEMBERS` array
5. **Case Studies**: Update `WORK_PORTFOLIO` array

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variable: `RESEND_API_KEY`
4. Deploy

The site will automatically deploy on every push to the main branch.

### Alternative Platforms

This Next.js app can be deployed to:

- Netlify
- AWS Amplify
- Cloudflare Pages
- Railway
- Render

Ensure Node.js 20+ is supported and add the `RESEND_API_KEY` environment variable.

## 🐛 Troubleshooting

### Contact Form Not Sending

- Verify `RESEND_API_KEY` is set in environment variables
- Check Resend dashboard for API key validity
- Ensure email domain is verified in Resend

### Styling Issues

- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `bun install`
- Check Tailwind v4 configuration in `globals.css`

### Type Errors

- Run `bun install` to ensure type definitions are current
- Check TypeScript version compatibility

## 📚 Documentation

This project has comprehensive documentation covering all aspects of development and deployment:

- **[Documentation Index](docs/INDEX.md)** - Start here for all documentation
- **[Development Guide](docs/DEVELOPMENT.md)** - Coding standards, architecture, and workflows
- **[Component Documentation](docs/COMPONENTS.md)** - Component API and usage
- **[Content Management](docs/CONTENT.md)** - How to update website content
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Deploy to various platforms
- **[API Documentation](docs/API.md)** - Server actions and external APIs
- **[Implementation Plan](docs/plan.md)** - Original project specifications

## 📖 Learn More

### Framework Documentation

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [React Documentation](https://react.dev) - React concepts and hooks
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide

### Styling & Components

- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com) - Component library
- [Radix UI](https://www.radix-ui.com) - Primitive components
- [Lucide Icons](https://lucide.dev) - Icon library

### Services & Tools

- [Resend](https://resend.com/docs) - Email API
- [Vercel](https://vercel.com/docs) - Deployment platform
- [Bun](https://bun.sh/docs) - JavaScript runtime

## 📄 License

Copyright © 2026 Coraline Labs. All rights reserved.

## 🤝 Contributing

This is a private project for Coraline Labs. For questions or support, contact the development team.
