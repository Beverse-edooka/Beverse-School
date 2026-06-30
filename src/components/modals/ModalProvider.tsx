"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ModalType = "login" | "apply" | null;

type AuthUser = { id: string; email: string; fullName: string } | null;

type ModalContextValue = {
  modal: ModalType;
  openLogin: () => void;
  openApply: () => void;
  closeModal: () => void;
  user: AuthUser;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalType>(null);
  const [user, setUser] = useState<AuthUser>(null);

  const refreshUser = useCallback(async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    setUser(data.user ?? null);
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const logout = useCallback(async () => {
    await fetch("/api/auth/me", { method: "DELETE" });
    setUser(null);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        modal,
        openLogin: () => setModal("login"),
        openApply: () => setModal("apply"),
        closeModal: () => setModal(null),
        user,
        refreshUser,
        logout,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
