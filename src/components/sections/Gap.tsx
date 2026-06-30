import { Reveal } from "@/components/fx/Reveal";
import { SectionBadge } from "@/components/ui/Badge";
import { SectionGlassCard } from "@/components/ui/SectionGlassCard";
import { gap } from "@/lib/content";

export function Gap() {
  return (
    <section className="sec" id="why">
      <div className="wrap">
        <div className="shead">
          <Reveal>
            <SectionBadge>{gap.badge}</SectionBadge>
          </Reveal>
          <Reveal delay={60}>
            <h2>{gap.title}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p>{gap.subtitle}</p>
          </Reveal>
        </div>

        <div className="gap-grid card-grid">
          <SectionGlassCard delay={0}>
            <div className="gic">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M12 14v7m-7 0h14M5 3h14v8a7 7 0 01-14 0V3z" />
              </svg>
            </div>
            <h3>{gap.graduate.title}</h3>
            <div className="sgcard-body">
              {gap.graduate.stats.map((stat) => (
                <div key={stat.value} className="gstat">
                  <span className="n">{stat.value}</span>
                  <span className="c">{stat.caption}</span>
                </div>
              ))}
            </div>
          </SectionGlassCard>

          <SectionGlassCard delay={60}>
            <div className="gic">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
              </svg>
            </div>
            <h3>{gap.industry.title}</h3>
            <div className="sgcard-body">
              {gap.industry.stats.map((stat) => (
                <div key={stat.value} className="gstat">
                  <span className="n">{stat.value}</span>
                  <span className="c">{stat.caption}</span>
                </div>
              ))}
            </div>
          </SectionGlassCard>
        </div>

        <Reveal delay={120}>
          <div className="gbridge">
            <p>
              {gap.bridge} <span className="hl">{gap.bridgeAccent}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
