export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="3">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function ArrowIcon({ stroke = "#06210a" }: { stroke?: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.6">
      <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
    </svg>
  );
}
