import Image from "next/image";
import { Reveal } from "@/components/fx/Reveal";
import { TiltCard } from "@/components/fx/TiltCard";
import { HeroPill } from "@/components/ui/Badge";
import { ApplyButton } from "@/components/ui/AuthButtons";
import { GhostButton } from "@/components/ui/Buttons";
import { CountUp } from "@/components/ui/CountUp";
import { ArrowIcon, CheckIcon } from "@/components/ui/icons";
import { hero } from "@/lib/content";
import type { MentorDisplay } from "@/lib/mentors";

export function Hero({ mentors }: { mentors: MentorDisplay[] }) {
  const { panel } = hero;

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hgrid">
          <div>
            <Reveal delay={0}>
              <HeroPill>{hero.badge}</HeroPill>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="title">
                {hero.title} <span className="grad">{hero.titleAccent}</span>.
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="sub">{hero.subtitle}</p>
            </Reveal>
            <Reveal delay={180}>
              <div className="cta-row">
                <ApplyButton>
                  {hero.ctaPrimary} <ArrowIcon />
                </ApplyButton>
                <GhostButton href="#how">{hero.ctaSecondary}</GhostButton>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="proof">
                <div className="avs">
                  {mentors.map((m) => (
                    <span key={m.id} className="av" title={m.name}>
                      {m.photoUrl ? (
                        <Image
                          src={m.photoUrl}
                          alt={m.name}
                          width={34}
                          height={34}
                          className="av-img"
                        />
                      ) : null}
                    </span>
                  ))}
                </div>
                <div className="ptxt">
                  <div className="stars">{hero.proofStars}</div>
                  <b>{hero.proofText}</b> {hero.proofSub}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <TiltCard>
              <div className="rib" />
              <div className="ph">
                <div className="l">{panel.eyebrow}</div>
                <div className="t">{panel.title}</div>
              </div>
              <div className="gb">
                {panel.rows.map((row) => (
                  <div key={row.phase} className={`gs${row.future ? " fut" : ""}`}>
                    <div className="gd">
                      {row.done ? (
                        <CheckIcon />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4">
                          <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="n">{row.phase}</div>
                      <b>{row.title}</b>
                      <span className="ds">{row.desc}</span>
                    </div>
                    {row.tag && <span className="tag">{row.tag}</span>}
                  </div>
                ))}
              </div>
              <div className="gf">
                <b>Cohort 1</b> · 25 seats · Bengaluru · Q4 2026
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div className="hstats">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="hs">
                <div className="n">
                  {stat.value !== null ? (
                    <>
                      <CountUp to={stat.value} />
                      {stat.suffix}
                    </>
                  ) : (
                    stat.text
                  )}
                </div>
                <div className="l">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
