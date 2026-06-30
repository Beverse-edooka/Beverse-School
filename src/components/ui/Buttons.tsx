import { MagneticButton } from "@/components/fx/MagneticButton";

export function GlowButton({
  href,
  children,
  className = "glow mag",
  style,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <MagneticButton href={href} className={className} style={style}>
      {children}
    </MagneticButton>
  );
}

export function GhostButton({
  href,
  children,
  className = "gbtn",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
