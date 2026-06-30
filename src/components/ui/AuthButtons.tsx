"use client";

import { useModal } from "@/components/modals/ModalProvider";
import { useMagnetic } from "@/hooks/useMagnetic";

export function LoginButton({ className = "gbtn" }: { className?: string }) {
  const { openLogin, user, logout } = useModal();

  if (user) {
    return (
      <button type="button" className={className} onClick={logout}>
        Log out
      </button>
    );
  }

  return (
    <button type="button" className={className} onClick={openLogin}>
      Log in
    </button>
  );
}

export function ApplyButton({
  children,
  className = "glow mag",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { openApply } = useModal();
  const ref = useMagnetic<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      type="button"
      className={className}
      style={style}
      onClick={openApply}
    >
      {children}
    </button>
  );
}
