import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-bone/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo & Tagline */}
          <div className="flex flex-col gap-4">
            <Image
              src="/imgs/logos/02_stacked.png"
              alt="Coraline Labs"
              width={120}
              height={94}
              className="w-auto"
            />
            <p className="text-sm text-bone/60 max-w-xs">
              Built with care. Engineered to last.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-bone font-semibold mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-bone/60 hover:text-coral transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-bone font-semibold mb-4">Get in Touch</h4>
            <div className="flex flex-col gap-2 text-sm text-bone/60">
              <a
                href="mailto:info@coralinelabs.com"
                className="hover:text-coral transition-colors"
              >
                info@coralinelabs.com
              </a>
              <p>Nosara, Costa Rica</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-bone/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-bone/40">
            &copy; {currentYear} Coraline Labs. All rights reserved.
          </p>
          <p className="text-sm text-bone/40">
            Coastal taste. Technical depth.
          </p>
        </div>
      </div>
    </footer>
  );
}
