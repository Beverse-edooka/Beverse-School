import { Reveal } from "@/components/fx/Reveal";
import { trustStrip } from "@/lib/content";

export function TrustStrip() {
  return (
    <div className="strip">
      <div className="wrap">
        <Reveal>
          <div className="lab">{trustStrip.label}</div>
        </Reveal>
        <Reveal delay={60}>
          <div className="chips">
            {trustStrip.chips.map((chip) => (
              <span key={chip} className="chip">
                {chip}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
