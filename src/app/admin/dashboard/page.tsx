"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";

type Batch = {
  id: string;
  name: string;
  number: number;
  maxSeats: number;
  status: string;
  _count: { entries: number };
};

export default function AdminDashboardPage() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [mentorCount, setMentorCount] = useState(0);
  const [waitlistCount, setWaitlistCount] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/batches").then((r) => r.json()),
      fetch("/api/admin/mentors").then((r) => r.json()),
      fetch("/api/admin/waitlist").then((r) => r.json()),
    ]).then(([b, m, w]) => {
      setBatches(b.batches || []);
      setMentorCount(m.mentors?.length || 0);
      setWaitlistCount(w.entries?.length || 0);
    });
  }, []);

  async function notifyBatch(batchId: string) {
    const res = await fetch("/api/admin/batches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ batchId }),
    });
    const data = await res.json();
    if (res.ok) alert(`Notification emails sent to ${data.sent} applicants.`);
  }

  return (
    <AdminShell>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 24 }}>
        <div className="admin-card" style={{ margin: 0 }}>
          <div className="modal-sub">Mentors</div>
          <b style={{ fontSize: 28, color: "var(--lime)" }}>{mentorCount}</b>
        </div>
        <div className="admin-card" style={{ margin: 0 }}>
          <div className="modal-sub">Waitlist entries</div>
          <b style={{ fontSize: 28, color: "var(--lime)" }}>{waitlistCount}</b>
        </div>
        <div className="admin-card" style={{ margin: 0 }}>
          <div className="modal-sub">Active batches</div>
          <b style={{ fontSize: 28, color: "var(--lime)" }}>{batches.filter((b) => b.status === "open").length}</b>
        </div>
      </div>

      <div className="admin-card">
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>Cohorts</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Seats</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((b) => (
              <tr key={b.id}>
                <td>{b.name}</td>
                <td>
                  {b._count.entries} / {b.maxSeats}
                </td>
                <td>{b.status}</td>
                <td>
                  <button type="button" className="gbtn" onClick={() => notifyBatch(b.id)}>
                    Email batch
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
