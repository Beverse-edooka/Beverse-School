export function SectionBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`badge ${className}`.trim()}>
      <span className="dot badge-dot" aria-hidden="true" />
      {children}
    </div>
  );
}

export function HeroPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="pill">
      <span className="d badge-dot" aria-hidden="true" />
      {children}
    </div>
  );
}
