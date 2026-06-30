"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((d) => {
        if (!d.admin) {
          router.replace("/admin");
          return;
        }
        setEmail(d.admin.email);
        setReady(true);
      });
  }, [router]);

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin");
  }

  if (!ready) return null;

  const links = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/mentors", label: "Mentors" },
    { href: "/admin/waitlist", label: "Waitlist" },
  ];

  return (
    <div className="admin-shell">
      <div className="admin-wrap">
        <div className="admin-top">
          <div>
            <h1 style={{ fontSize: 26 }}>Beverse Admin</h1>
            <p className="modal-sub" style={{ marginBottom: 0 }}>
              {email}
            </p>
          </div>
          <div className="admin-nav">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={pathname === l.href ? "active" : ""}
              >
                {l.label}
              </Link>
            ))}
            <button type="button" onClick={logout}>
              Log out
            </button>
            <Link href="/">View site</Link>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
