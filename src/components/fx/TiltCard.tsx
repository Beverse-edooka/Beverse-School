"use client";

import { useTilt } from "@/hooks/useTilt";

export function TiltCard({
  children,
  className = "gpanel",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { area, card } = useTilt(7);

  return (
    <div className="tilt-area" ref={area}>
      <div className={className} ref={card}>
        {children}
      </div>
    </div>
  );
}
