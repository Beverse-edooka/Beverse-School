import { Reveal } from "@/components/fx/Reveal";
import { SectionBadge } from "@/components/ui/Badge";
import { ApplyButton } from "@/components/ui/AuthButtons";
import { ArrowIcon } from "@/components/ui/icons";
import { finalCta } from "@/lib/content";

export function FinalCta() {
  return (
    <section className="sec" id="apply">
      <div className="wrap">
        <Reveal>
          <div className="final">
            <SectionBadge>{finalCta.badge}</SectionBadge>
            <h2>{finalCta.title}</h2>
            <p>{finalCta.subtitle}</p>
            <div className="cta-row final-cta-single">
              <ApplyButton>
                {finalCta.ctaPrimary} <ArrowIcon />
              </ApplyButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
