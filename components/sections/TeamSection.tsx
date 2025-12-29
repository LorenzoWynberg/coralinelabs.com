import { TEAM_MEMBERS } from "@/lib/constants";

export default function TeamSection() {
  return (
    <section id="team" className="py-20 md:py-28 bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-bone mb-4">
              The Team
            </h2>
            <p className="text-lg text-bone/60 max-w-2xl mx-auto">
              We intentionally stay small. Every project gets direct access to
              senior expertise from start to finish.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center text-center"
              >
                {/* Avatar Placeholder */}
                <div
                  className={`w-32 h-32 rounded-full ${member.color} flex items-center justify-center mb-6`}
                >
                  <span className="text-3xl font-display text-white">
                    {member.initials}
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="text-xl font-display text-bone mb-1">
                  {member.name}
                </h3>
                <p className="text-coral text-sm font-medium mb-3">
                  {member.role}
                </p>

                {/* Bio */}
                <p className="text-sm text-bone/60 leading-relaxed max-w-xs">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

          {/* Work Philosophy */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-wrap justify-center gap-4 text-sm text-bone/40">
              <span className="px-4 py-2 border border-bone/10 rounded-full">
                No outsourcing
              </span>
              <span className="px-4 py-2 border border-bone/10 rounded-full">
                No junior handoffs
              </span>
              <span className="px-4 py-2 border border-bone/10 rounded-full">
                High accountability
              </span>
              <span className="px-4 py-2 border border-bone/10 rounded-full">
                Local presence
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
