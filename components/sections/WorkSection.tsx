import { CASE_STUDIES } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

export default function WorkSection() {
  return (
    <section id="work" className="py-20 md:py-28 bg-bone">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-4">
              Our Work
            </h2>
            <p className="text-lg text-driftwood max-w-2xl mx-auto">
              A selection of projects that showcase our approach to building
              reliable systems.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASE_STUDIES.map((study) => (
              <Card
                key={study.name}
                className="bg-white border-sand hover:border-coral/30 transition-all hover:shadow-lg group"
              >
                <CardContent className="p-6">
                  {/* Project Name */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-display text-charcoal group-hover:text-coral transition-colors">
                      {study.name}
                    </h3>
                    <p className="text-sm text-driftwood">{study.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-charcoal/70 leading-relaxed mb-4">
                    {study.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-sand/50 text-driftwood"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
