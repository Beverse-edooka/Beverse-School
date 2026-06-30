import { Reveal } from "@/components/fx/Reveal";
import { SectionBadge } from "@/components/ui/Badge";
import { GlowButton } from "@/components/ui/Buttons";
import { beverseOne } from "@/lib/content";

const featureIcons = [
  <svg key="net" viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>,
  <svg key="class" viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M23 7l-7 5 7 5V7zM14 5H3a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2z" />
  </svg>,
  <svg key="course" viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
  </svg>,
  <svg key="job" viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M20 7h-3V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
  </svg>,
];

export function BeverseOne() {
  return (
    <section className="sec" id="one">
      <div className="wrap">
        <Reveal>
          <div className="one">
            <div>
              <SectionBadge>{beverseOne.badge}</SectionBadge>
              <h2 style={{ marginTop: 16 }}>{beverseOne.title}</h2>
              <p>{beverseOne.body}</p>
              <GlowButton href={beverseOne.href} className="glow mag" style={{ marginTop: 26 }}>
                {beverseOne.cta}{" "}
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4">
                  <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                </svg>
              </GlowButton>
            </div>
            <div className="feats">
              {beverseOne.features.map((feat, i) => (
                <div key={feat.title} className="feat">
                  <div className="fi">{featureIcons[i]}</div>
                  <b>{feat.title}</b>
                  <span>{feat.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
