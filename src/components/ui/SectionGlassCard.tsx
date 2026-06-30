"use client";

import { Reveal } from "@/components/fx/Reveal";
import { TiltCard } from "@/components/fx/TiltCard";

export function SectionGlassCard({
  children,
  delay = 0,
  tilt = true,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  tilt?: boolean;
  variant?: "default" | "lead" | "invite";
  className?: string;
}) {
  const variantClass =
    variant === "lead" ? " sgcard-lead" : variant === "invite" ? " sgcard-invite" : "";
  const cardClass = `sgcard${variantClass} ${className}`.trim();

  return (
    <Reveal delay={delay} className="sgcard-wrap">
      {tilt ? (
        <TiltCard className={cardClass}>{children}</TiltCard>
      ) : (
        <div className={cardClass}>{children}</div>
      )}
    </Reveal>
  );
}
