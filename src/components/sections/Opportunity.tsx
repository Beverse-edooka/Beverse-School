import { Reveal } from "@/components/fx/Reveal";
import { SectionBadge } from "@/components/ui/Badge";
import { SectionGlassCard } from "@/components/ui/SectionGlassCard";
import { CheckIcon } from "@/components/ui/icons";
import { opportunity } from "@/lib/content";

function PathRow({
  row,
  variant,
}: {
  row: { title: string; desc: string; salary?: boolean };
  variant: "clinical" | "lead";
}) {
  return (
    <div className={`opp-row opp-row-${variant}${row.salary ? " sal" : ""}`}>
      <span className="ic">
        {variant === "lead" ? (
          <CheckIcon />
        ) : (
          <span className="d" />
        )}
      </span>
      <div>
        <b>{row.title}</b>
        <span className="sm">{row.desc}</span>
      </div>
    </div>
  );
}

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
          <SectionGlassCard delay={60} showRib>
            <div className="opp-eyebrow">{clinical.label}</div>
            <h3>{clinical.title}</h3>
            <p className="sgcard-desc opp-intro">{clinical.subtitle}</p>
            <div className="sgcard-body">
              {clinical.rows.map((row) => (
                <PathRow key={row.title} row={row} variant="clinical" />
              ))}
            </div>
          </SectionGlassCard>

          <SectionGlassCard delay={120} showRib>
            <span className="newpill">{leadership.pill}</span>
            <div className="opp-eyebrow opp-eyebrow-lead">{leadership.label}</div>
            <h3>{leadership.title}</h3>
            <p className="sgcard-desc opp-intro">{leadership.subtitle}</p>
            <div className="sgcard-body">
              {leadership.rows.map((row) => (
                <PathRow key={row.title} row={row} variant="lead" />
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
