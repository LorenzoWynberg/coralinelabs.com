import { VALUES } from "@/lib/constants";
import { Check } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-bone">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-driftwood leading-relaxed mb-6">
                Coraline Labs is a premium digital studio focused on building
                reliable, well-crafted digital systems for design-conscious,
                high-value businesses.
              </p>
              <p className="text-lg text-driftwood leading-relaxed mb-8">
                We blend coastal elegance with technical precision, avoiding
                trends in favor of longevity and trust. We help premium
                businesses turn ideas, operations, and complexity into clear,
                reliable digital systems.
              </p>

              {/* Positioning Statement */}
              <blockquote className="border-l-4 border-coral pl-6 py-2 mb-8">
                <p className="text-xl font-display text-charcoal italic">
                  &ldquo;We design and build systems that make businesses easier
                  to run — and harder to break.&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Values */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
              <h3 className="text-xl font-display text-charcoal mb-6">
                Our Values
              </h3>
              <ul className="space-y-4">
                {VALUES.map((value) => (
                  <li key={value} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-coral/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-coral" />
                    </span>
                    <span className="text-charcoal">{value}</span>
                  </li>
                ))}
              </ul>

              {/* How We're Different */}
              <div className="mt-8 pt-8 border-t border-sand">
                <h4 className="text-sm font-semibold text-driftwood uppercase tracking-wider mb-4">
                  How We&apos;re Different
                </h4>
                <ul className="space-y-2 text-sm text-charcoal/80">
                  <li>Think in terms of systems, not pages</li>
                  <li>Focus on operations, not features</li>
                  <li>Prioritize reliability over demos</li>
                  <li>Long-term ownership over one-off delivery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
