import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-bone pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-charcoal leading-tight mb-6">
            Built with care.
            <br />
            <span className="text-coral">Engineered to last.</span>
          </h1>

          {/* Mission Statement */}
          <p className="text-lg md:text-xl text-driftwood max-w-2xl mx-auto mb-8 leading-relaxed">
            We design and build dependable digital systems for businesses that
            value longevity, quality, and calm execution.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-base px-8">
              <Link href="#contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8">
              <Link href="#services">See What We Do</Link>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 md:mt-24 animate-bounce">
            <Link
              href="#about"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-sand text-driftwood hover:border-coral hover:text-coral transition-colors"
            >
              <ArrowDown className="h-5 w-5" />
              <span className="sr-only">Scroll to learn more</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
