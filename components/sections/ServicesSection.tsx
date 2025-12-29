import { SERVICES } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-bone mb-4">
              What We Do
            </h2>
            <p className="text-lg text-bone/60 max-w-2xl mx-auto">
              Design, engineering, and product thinking under one roof. We build
              complete systems, not just websites.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className="bg-charcoal border-bone/10 hover:border-coral/50 transition-colors group"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-4 group-hover:bg-coral/20 transition-colors">
                      <Icon className="w-6 h-6 text-coral" />
                    </div>
                    <h3 className="text-lg font-display text-bone mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-bone/60 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
