import { Reveal } from "@/components/fx/Reveal";
import { SectionBadge } from "@/components/ui/Badge";
import { SectionGlassCard } from "@/components/ui/SectionGlassCard";
import { CheckIcon } from "@/components/ui/icons";
import { opportunity } from "@/lib/content";

export function Opportunity() {
  const { clinical, leadership } = opportunity;

  return (
    <section className="sec">
      <div className="wrap">
        <div className="shead">
          <Reveal>
            <SectionBadge>{opportunity.badge}</SectionBadge>
          </Reveal>
          <Reveal delay={60}>
            <h2>{opportunity.title}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p>{opportunity.subtitle}</p>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div className="frame-cap">
            {opportunity.caption} <b>{opportunity.captionBold}</b>
          </div>
        </Reveal>

        <div className="paths card-grid">
          <SectionGlassCard delay={60} variant="default" tilt={false}>
            <div className="st clinical-label">{clinical.label}</div>
            <h3 className="clinical-title">{clinical.title}</h3>
            <div className="psub clinical-sub">{clinical.subtitle}</div>
            <div className="sgcard-body">
              {clinical.rows.map((row) => (
                <div key={row.title} className={`prow clinical-row${row.salary ? " sal" : ""}`}>
                  <span className="ic">
                    <span className="d" />
                  </span>
                  <div>
                    <b>{row.title}</b>
                    <span className="sm">{row.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionGlassCard>

          <SectionGlassCard delay={120} variant="lead">
            <div className="newpill">{leadership.pill}</div>
            <div className="st">{leadership.label}</div>
            <h3>{leadership.title}</h3>
            <div className="psub">{leadership.subtitle}</div>
            <div className="sgcard-body">
              {leadership.rows.map((row) => (
                <div key={row.title} className={`prow lead-row${row.salary ? " sal" : ""}`}>
                  <span className="ic">
                    <CheckIcon />
                  </span>
                  <div>
                    <b>{row.title}</b>
                    <span className="sm">{row.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionGlassCard>
        </div>

        <Reveal delay={180}>
          <p className="opp-foot">
            {opportunity.closing} <span className="hl2">{opportunity.closingAccent}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
