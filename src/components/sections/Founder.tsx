import { Reveal } from "@/components/fx/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { founder } from "@/lib/content";

export function Founder() {
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal>
          <div className="founder">
            <div className="fav">
              {founder.initials[0]}
              <br />
              {founder.initials[1]}
            </div>
            <div>
              <div className="quote">
                &ldquo;{founder.quote}{" "}
                <span className="hl2">{founder.quoteAccent}</span>&rdquo;
              </div>
              <div className="fwho">
                <h4>{founder.name}</h4>
                <span>{founder.role}</span>
              </div>
              <div className="fstats">
                {founder.stats.map((stat) => (
                  <div key={stat.label} className="s">
                    <b>
                      {typeof stat.value === "number" ? (
                        <>
                          <CountUp to={stat.value} />
                          {stat.suffix}
                        </>
                      ) : (
                        stat.value
                      )}
                    </b>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
