"use client";

import { Reveal } from "@/components/fx/Reveal";
import { TiltCard } from "@/components/fx/TiltCard";

export function SectionGlassCard({
  children,
  delay = 0,
  tilt = true,
  variant = "default",
  showRib = false,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  tilt?: boolean;
  variant?: "default" | "lead" | "invite";
  showRib?: boolean;
  className?: string;
}) {
  const variantClass =
    variant === "lead" ? " sgcard-lead" : variant === "invite" ? " sgcard-invite" : "";
  const cardClass = `sgcard${variantClass} ${className}`.trim();

  const inner = showRib ? (
    <>
      <div className="rib sgcard-rib" />
      <div className="sgcard-inner">{children}</div>
    </>
  ) : (
    children
  );

  return (
    <Reveal delay={delay} className="sgcard-wrap">
      {tilt ? (
        <TiltCard className={cardClass}>{inner}</TiltCard>
      ) : (
        <div className={cardClass}>{inner}</div>
      )}
    </Reveal>
  );
}
