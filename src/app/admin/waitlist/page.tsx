"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";

type Entry = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  status: string;
  createdAt: string;
  batch: { name: string; number: number };
};

export default function AdminWaitlistPage() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    fetch("/api/admin/waitlist")
      .then((r) => r.json())
      .then((d) => setEntries(d.entries || []));
  }, []);

  return (
    <AdminShell>
      <div className="admin-card">
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>Waitlist applications</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Batch</th>
              <th>Status</th>
              <th>Applied</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id}>
                <td>{e.fullName}</td>
                <td>{e.email}</td>
                <td>{e.phone || "—"}</td>
                <td>{e.batch.name}</td>
                <td>{e.status}</td>
                <td>{new Date(e.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
