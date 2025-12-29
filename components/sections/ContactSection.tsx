"use client";

import { useActionState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContactForm, ContactFormState } from "@/app/actions/contact";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactSection() {
  const [state, formAction, isPending] = useActionState<
    ContactFormState,
    FormData
  >(submitContactForm, null);
  const formRef = useRef<HTMLFormElement>(null);

  // Only reset form on successful submission
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <section id="contact" className="py-20 md:py-28 bg-coral">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
              Let&apos;s Build Something
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              Ready to create a digital system that makes your business easier
              to run? Get in touch and let&apos;s talk.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl">
            {state?.success ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-display text-charcoal mb-2">
                  Message Sent
                </h3>
                <p className="text-driftwood">{state.message}</p>
              </div>
            ) : (
              <form ref={formRef} action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-charcoal">
                      Name <span className="text-coral">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="bg-bone/50 border-sand focus:border-coral"
                    />
                    {state?.errors?.name && (
                      <p className="text-sm text-coral">
                        {state.errors.name[0]}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-charcoal">
                      Email <span className="text-coral">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="bg-bone/50 border-sand focus:border-coral"
                    />
                    {state?.errors?.email && (
                      <p className="text-sm text-coral">
                        {state.errors.email[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-charcoal">
                    Company <span className="text-driftwood">(optional)</span>
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Your company name"
                    className="bg-bone/50 border-sand focus:border-coral"
                  />
                  {state?.errors?.company && (
                    <p className="text-sm text-coral">
                      {state.errors.company[0]}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-charcoal">
                    Message <span className="text-coral">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="bg-bone/50 border-sand focus:border-coral resize-none"
                  />
                  {state?.errors?.message && (
                    <p className="text-sm text-coral">
                      {state.errors.message[0]}
                    </p>
                  )}
                </div>

                {/* Error Message */}
                {state && !state.success && (
                  <div className="flex items-center gap-2 text-coral bg-coral/10 p-3 rounded-lg">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{state.message}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="w-full md:w-auto"
                >
                  {isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Alternative Contact */}
            <div className="mt-8 pt-8 border-t border-sand text-center">
              <p className="text-sm text-driftwood">
                Prefer email?{" "}
                <a
                  href="mailto:info@coralinelabs.com"
                  className="text-coral hover:underline"
                >
                  info@coralinelabs.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
