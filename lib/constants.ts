import {
  Palette,
  Globe,
  LayoutDashboard,
  Blocks,
  Zap,
  HeartHandshake,
} from "lucide-react";

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#packages", label: "Packages" },
  { href: "#work", label: "Work" },
] as const;

export const SERVICES = [
  {
    title: "Brand & Visual Identity",
    description:
      "Logo creation, color palettes, typography, visual direction, and brand rules that set you apart.",
    icon: Palette,
  },
  {
    title: "Websites & Landing Pages",
    description:
      "Conversion-focused, mobile-optimized websites that communicate your value clearly.",
    icon: Globe,
  },
  {
    title: "Internal Tools & Dashboards",
    description:
      "Custom dashboards and internal tools that streamline your operations.",
    icon: LayoutDashboard,
  },
  {
    title: "Custom Platforms & Applications",
    description:
      "Property management tools, logistics platforms, and multi-role applications built to scale.",
    icon: Blocks,
  },
  {
    title: "Automations & Integrations",
    description:
      "Booking systems, CRM setup, payment integrations, and email/WhatsApp automations.",
    icon: Zap,
  },
  {
    title: "Ongoing Support",
    description:
      "Hosting, monitoring, backups, content updates, and priority development support.",
    icon: HeartHandshake,
  },
] as const;

export const APPROACH_STEPS = [
  {
    step: 1,
    title: "Understand",
    description:
      "We learn your business, your goals, and the problems you're solving.",
  },
  {
    step: 2,
    title: "Design",
    description:
      "We design the system architecture and user experience before writing code.",
  },
  {
    step: 3,
    title: "Build",
    description:
      "We build with intention, focusing on reliability and long-term maintainability.",
  },
  {
    step: 4,
    title: "Support",
    description: "We support and evolve your systems as your business grows.",
  },
] as const;

export const PACKAGES = [
  {
    name: "Digital Presence",
    price: "$1,500 - $3,000",
    description:
      "Perfect for businesses needing a professional online presence.",
    features: [
      "1-5 page website or landing page",
      "UX & conversion-focused copy",
      "Mobile optimization",
      "Basic SEO setup",
      "Contact or booking form",
      "Up to 5 free Zoho Mail accounts",
    ],
  },
  {
    name: "Brand & Visual Identity",
    price: "$1,500 - $4,000",
    description:
      "Establish a cohesive brand that resonates with your audience.",
    features: [
      "Logo creation or refinement",
      "Color palette & typography",
      "Visual direction & brand rules",
      "Social media templates",
      "Print-ready assets",
    ],
  },
  {
    name: "Automations & Integrations",
    price: "$2,000 - $8,000",
    description: "Streamline operations with smart automations.",
    features: [
      "Booking system setup",
      "CRM configuration",
      "Payment integrations",
      "Email & WhatsApp automations",
      "Internal dashboards",
    ],
  },
  {
    name: "Custom Systems",
    price: "$8,000 - $25,000+",
    description: "Full-scale custom applications for complex needs.",
    features: [
      "Property management tools",
      "Internal tools & logistics platforms",
      "Multi-role applications",
      "Role-based access control",
      "Scalable architecture",
    ],
  },
] as const;

export const RETAINERS = [
  {
    name: "Care Plan",
    price: "$300/month",
    description: "Hosting, monitoring, backups, and minor updates.",
  },
  {
    name: "Growth Plan",
    price: "$600/month",
    description: "Content updates, small features, and priority support.",
  },
  {
    name: "Ops Partner",
    price: "$1,200/month",
    description: "Priority support and ongoing development partnership.",
  },
] as const;

export const CASE_STUDIES = [
  {
    name: "MEP",
    subtitle: "National Education Platform",
    description:
      "Large-scale educational infrastructure serving hundreds of thousands of students across the country.",
    tags: ["Education", "Infrastructure", "Scale"],
  },
  {
    name: "Mandados",
    subtitle: "Logistics Platform",
    description:
      "Custom logistics platform with order management, delivery tracking, and real-time updates.",
    tags: ["Logistics", "Real-time", "Custom Platform"],
  },
  {
    name: "BAP",
    subtitle: "Distributed Systems",
    description:
      "Event-driven architectures and distributed systems for high-performance applications.",
    tags: ["Architecture", "Performance", "Systems"],
  },
] as const;

export const TEAM_MEMBERS = [
  {
    name: "Zacc Pollitt",
    role: "Design & Brand Lead",
    bio: "10+ years of experience crafting brands and digital experiences in Nosara and beyond.",
    initials: "ZP",
    color: "bg-coral",
  },
  {
    name: "Lorenzo Wynberg",
    role: "Systems & Product Lead",
    bio: "Building custom platforms, automation systems, and scalable backends that just work.",
    initials: "LW",
    color: "bg-sea",
  },
  {
    name: "Carlos Villalta",
    role: "Backend & Infrastructure",
    bio: "Expert in Go, Rust, and high-performance systems that handle serious scale.",
    initials: "CV",
    color: "bg-papaya",
  },
] as const;

export const VALUES = [
  "Quality over speed",
  "Reliability and trust",
  "Security by default",
  "Calm confidence",
  "Long-term thinking",
] as const;
