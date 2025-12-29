import { APPROACH_STEPS } from "@/lib/constants";

export default function ApproachSection() {
  return (
    <section id="approach" className="py-20 md:py-28 bg-bone">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-4">
              Our Approach
            </h2>
            <p className="text-lg text-driftwood max-w-2xl mx-auto">
              A methodical process that ensures we understand your business
              before we build anything.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {APPROACH_STEPS.map((item, index) => (
              <div key={item.step} className="relative">
                {/* Connector Line (hidden on mobile, shown on lg) */}
                {index < APPROACH_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-sand" />
                )}

                <div className="relative flex flex-col items-center text-center">
                  {/* Step Number */}
                  <div className="w-16 h-16 rounded-full bg-coral text-bone flex items-center justify-center text-2xl font-display mb-4 relative z-10">
                    {item.step}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display text-charcoal mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-driftwood leading-relaxed max-w-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
