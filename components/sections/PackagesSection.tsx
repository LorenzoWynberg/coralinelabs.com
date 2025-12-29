import { PACKAGES, RETAINERS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PackagesSection() {
  return (
    <section id="packages" className="py-20 md:py-28 bg-sand/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-4">
              Packages
            </h2>
            <p className="text-lg text-driftwood max-w-2xl mx-auto">
              Clear pricing for common needs. Custom quotes for complex projects.
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {PACKAGES.map((pkg) => (
              <Card
                key={pkg.name}
                className="bg-white border-sand hover:border-coral/30 transition-colors"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-display text-charcoal">
                      {pkg.name}
                    </CardTitle>
                    <span className="text-coral font-semibold text-lg">
                      {pkg.price}
                    </span>
                  </div>
                  <p className="text-sm text-driftwood">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-coral mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-charcoal/80">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Retainers */}
          <div className="bg-charcoal rounded-2xl p-8 md:p-10">
            <h3 className="text-xl font-display text-bone mb-6 text-center">
              Monthly Retainers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RETAINERS.map((retainer) => (
                <div
                  key={retainer.name}
                  className="text-center p-6 rounded-xl bg-bone/5 hover:bg-bone/10 transition-colors"
                >
                  <h4 className="text-lg font-display text-bone mb-1">
                    {retainer.name}
                  </h4>
                  <p className="text-coral font-semibold text-xl mb-2">
                    {retainer.price}
                  </p>
                  <p className="text-sm text-bone/60">{retainer.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
