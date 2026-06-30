import Image from "next/image";
import { Reveal } from "@/components/fx/Reveal";
import { SectionBadge } from "@/components/ui/Badge";
import { SectionGlassCard } from "@/components/ui/SectionGlassCard";
import { mentors as mentorsCopy } from "@/lib/content";
import type { MentorDisplay } from "@/lib/mentors";

export function Mentors({ mentors }: { mentors: MentorDisplay[] }) {
  return (
    <section className="sec" id="mentors">
      <div className="wrap">
        <div className="shead">
          <Reveal>
            <SectionBadge>{mentorsCopy.badge}</SectionBadge>
          </Reveal>
          <Reveal delay={60}>
            <h2>{mentorsCopy.title}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p>{mentorsCopy.subtitle}</p>
          </Reveal>
        </div>

        <div className="ment-grid card-grid">
          {mentors.map((card, i) => (
            <SectionGlassCard
              key={card.id}
              delay={i * 60}
              variant={card.invite ? "invite" : "default"}
            >
              <div className="mav">
                {card.photoUrl ? (
                  <Image
                    src={card.photoUrl}
                    alt={card.name}
                    width={64}
                    height={64}
                    className="mav-photo"
                  />
                ) : card.invite ? (
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
                )}
              </div>
              <h3>{card.name}</h3>
              <div className="role2">{card.role}</div>
              <p className="sgcard-desc">{card.bio}</p>
            </SectionGlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
