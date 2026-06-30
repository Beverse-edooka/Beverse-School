import { Reveal } from "@/components/fx/Reveal";
import { SectionBadge } from "@/components/ui/Badge";
import { SectionGlassCard } from "@/components/ui/SectionGlassCard";
import { whoItIsFor } from "@/lib/content";

const icons = [
  <svg key="grad" viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5" />
  </svg>,
  <svg key="recent" viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M12 2v20M2 12h20" />
  </svg>,
  <svg key="pro" viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
  </svg>,
];

export function WhoItIsFor() {
  return (
    <section className="sec" id="who">
      <div className="wrap">
        <div className="shead">
          <Reveal>
            <SectionBadge>{whoItIsFor.badge}</SectionBadge>
          </Reveal>
          <Reveal delay={60}>
            <h2>{whoItIsFor.title}</h2>
          </Reveal>
        </div>

        <div className="who-grid card-grid">
          {whoItIsFor.cards.map((card, i) => (
            <SectionGlassCard key={card.title} delay={i * 60}>
              <div className="wic">{icons[i]}</div>
              <h3>{card.title}</h3>
              <p className="sgcard-desc">{card.desc}</p>
            </SectionGlassCard>
          ))}
        </div>

        <Reveal delay={180}>
          <div className="elig">
            <div className="ei">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
            </div>
            <div>
              <div className="k">Eligibility</div>
              <p>{whoItIsFor.eligibility}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
