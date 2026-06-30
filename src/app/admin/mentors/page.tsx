"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";

type Mentor = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string | null;
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
};

const emptyForm = {
  name: "",
  role: "",
  bio: "",
  photoUrl: "",
  featured: false,
  sortOrder: 0,
  isActive: true,
};

export default function AdminMentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/mentors");
    const data = await res.json();
    setMentors(data.mentors || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function uploadPhoto(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/mentors/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (res.ok) setForm((f) => ({ ...f, photoUrl: data.photoUrl }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      photoUrl: form.photoUrl || null,
    };
    const res = editingId
      ? await fetch(`/api/admin/mentors/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/admin/mentors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
    if (res.ok) {
      setForm(emptyForm);
      setEditingId(null);
      load();
    }
  }

  function edit(m: Mentor) {
    setEditingId(m.id);
    setForm({
      name: m.name,
      role: m.role,
      bio: m.bio,
      photoUrl: m.photoUrl || "",
      featured: m.featured,
      sortOrder: m.sortOrder,
      isActive: m.isActive,
    });
  }

  async function remove(id: string) {
    if (!confirm("Delete this mentor?")) return;
    await fetch(`/api/admin/mentors/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <AdminShell>
      <div className="admin-card">
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>
          {editingId ? "Edit mentor" : "Add mentor"}
        </h2>
        <form className="admin-form" onSubmit={save}>
          <label>
            Name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </label>
          <label>
            Role
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
          </label>
          <label>
            Bio
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} required />
          </label>
          <label>
            Photo
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && uploadPhoto(e.target.files[0])}
            />
            {uploading && <span className="modal-sub">Uploading…</span>}
            {form.photoUrl && (
              <Image src={form.photoUrl} alt="Preview" width={64} height={64} className="admin-thumb" />
            )}
          </label>
          <label>
            Sort order
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
            />
          </label>
          <label style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Show on hero avatars
          </label>
          <label style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            Active on website
          </label>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit" className="glow">
              {editingId ? "Update" : "Create"}
            </button>
            {editingId && (
              <button
                type="button"
                className="gbtn"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>All mentors</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Role</th>
              <th>Hero</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mentors.map((m) => (
              <tr key={m.id}>
                <td>
                  {m.photoUrl ? (
                    <Image src={m.photoUrl} alt={m.name} width={48} height={48} className="admin-thumb" />
                  ) : (
                    "—"
                  )}
                </td>
                <td>{m.name}</td>
                <td>{m.role}</td>
                <td>{m.featured ? "Yes" : "No"}</td>
                <td style={{ display: "flex", gap: 8 }}>
                  <button type="button" className="gbtn" onClick={() => edit(m)}>
                    Edit
                  </button>
                  <button type="button" className="gbtn" onClick={() => remove(m.id)}>
                    Delete
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
