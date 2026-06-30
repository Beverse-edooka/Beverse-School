"use client";

import { useState } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { SectionBadge } from "@/components/ui/Badge";
import { CheckIcon } from "@/components/ui/icons";
import { tracks } from "@/lib/content";

export function Tracks() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="sec" id="tracks">
      <div className="wrap">
        <div className="shead">
          <Reveal>
            <SectionBadge>{tracks.badge}</SectionBadge>
          </Reveal>
          <Reveal delay={60}>
            <h2>{tracks.title}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p>{tracks.subtitle}</p>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div className="tabs" role="tablist" aria-label="Leadership tracks">
            {tracks.items.map((item, i) => (
              <button
                key={item.tab}
                type="button"
                role="tab"
                aria-selected={activeTab === i}
                className={`tab${activeTab === i ? " active" : ""}`}
                onClick={() => setActiveTab(i)}
              >
                {item.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="panel-wrap">
            {tracks.items.map((item, i) => (
              <div
                key={item.tab}
                role="tabpanel"
                className={`panel sgcard${activeTab === i ? " active" : ""}`}
              >
                <div className="rib" />
                <div className="left">
                  <SectionBadge>{item.track}</SectionBadge>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="role">{item.role}</span>
                </div>
                <div className="right">
                  <div className="rt">What you build</div>
                  {item.skills.map((skill) => (
                    <div key={skill} className="skill">
                      <span className="tick">
                        <CheckIcon />
                      </span>
                      <b>{skill}</b>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
