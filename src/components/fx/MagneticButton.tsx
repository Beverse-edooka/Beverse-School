"use client";

import { useMagnetic } from "@/hooks/useMagnetic";

export function MagneticButton({
  children,
  className = "",
  href,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  style?: React.CSSProperties;
}) {
  const ref = useMagnetic<HTMLAnchorElement>();

  return (
    <a ref={ref} href={href} className={className} style={style}>
      {children}
    </a>
  );
}
