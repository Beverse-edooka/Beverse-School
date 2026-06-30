"use client";

import { useState } from "react";
import { useModal } from "./ModalProvider";

export function SiteModals() {
  const { modal, closeModal, openLogin, refreshUser } = useModal();
  const [loginTab, setLoginTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!modal) return null;

  async function handleAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload =
      loginTab === "login"
        ? { mode: "login", email: fd.get("email"), password: fd.get("password") }
        : {
            mode: "register",
            fullName: fd.get("fullName"),
            email: fd.get("email"),
            password: fd.get("password"),
          };

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }
    await refreshUser();
    closeModal();
  }

  async function handleWaitlist(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: fd.get("fullName"),
        email: fd.get("email"),
        phone: fd.get("phone") || undefined,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Could not submit application.");
      return;
    }
    setSuccess(data.message);
    e.currentTarget.reset();
  }

  return (
    <div className="modal-backdrop" onClick={closeModal} role="presentation">
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button type="button" className="modal-close" onClick={closeModal} aria-label="Close">
          ×
        </button>

        {modal === "login" && (
          <>
            <h3>Welcome back</h3>
            <p className="modal-sub">Sign in to your Beverse School account.</p>
            <div className="modal-tabs">
              <button
                type="button"
                className={loginTab === "login" ? "active" : ""}
                onClick={() => setLoginTab("login")}
              >
                Log in
              </button>
              <button
                type="button"
                className={loginTab === "register" ? "active" : ""}
                onClick={() => setLoginTab("register")}
              >
                Register
              </button>
            </div>
            <form onSubmit={handleAuth} className="modal-form">
              {loginTab === "register" && (
                <label>
                  Full name
                  <input name="fullName" required minLength={2} autoComplete="name" />
                </label>
              )}
              <label>
                Email
                <input name="email" type="email" required autoComplete="email" />
              </label>
              <label>
                Password
                <input name="password" type="password" required minLength={8} autoComplete="current-password" />
              </label>
              {error && <p className="modal-error">{error}</p>}
              <button type="submit" className="glow" disabled={loading}>
                {loading ? "Please wait…" : loginTab === "login" ? "Log in" : "Create account"}
              </button>
            </form>
          </>
        )}

        {modal === "apply" && (
          <>
            <h3>Apply for Cohort 1</h3>
            <p className="modal-sub">
              Join the waitlist. We will email you when your cohort opens — 25 seats per batch.
            </p>
            <form onSubmit={handleWaitlist} className="modal-form">
              <label>
                Full name
                <input name="fullName" required minLength={2} autoComplete="name" />
              </label>
              <label>
                Email
                <input name="email" type="email" required autoComplete="email" />
              </label>
              <label>
                Phone <span className="opt">(optional)</span>
                <input name="phone" type="tel" autoComplete="tel" />
              </label>
              {error && <p className="modal-error">{error}</p>}
              {success && <p className="modal-success">{success}</p>}
              <button type="submit" className="glow mag" disabled={loading}>
                {loading ? "Submitting…" : "Apply for Cohort 1"}
              </button>
              <p className="modal-foot">
                Already have an account?{" "}
                <button type="button" className="link-btn" onClick={() => openLogin()}>
                  Log in
                </button>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
