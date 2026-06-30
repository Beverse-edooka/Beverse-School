import { Reveal } from "@/components/fx/Reveal";
import { SectionBadge } from "@/components/ui/Badge";
import { SectionGlassCard } from "@/components/ui/SectionGlassCard";
import { howItWorks } from "@/lib/content";

export function HowItWorks() {
  return (
    <section className="sec" id="how">
      <div className="wrap">
        <div className="shead">
          <Reveal>
            <SectionBadge>{howItWorks.badge}</SectionBadge>
          </Reveal>
          <Reveal delay={60}>
            <h2>{howItWorks.title}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p>{howItWorks.subtitle}</p>
          </Reveal>
        </div>

        <div className="steps card-grid">
          {howItWorks.steps.map((step, i) => (
            <SectionGlassCard key={step.num} delay={i * 60}>
              <div className="num">{step.num}</div>
              <div className="ph2">{step.eyebrow}</div>
              <h3>{step.title}</h3>
              <p className="sgcard-desc">{step.desc}</p>
            </SectionGlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
