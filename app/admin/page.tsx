"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  name: string;
  email: string;
  role: string;
  grade: number | null;
  created_at: string;
};

const ROLES = ["student", "teacher", "admin"];

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        window.location.href = "/login";
        return;
      }

      const { data: me } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", auth.user.id)
        .single();

      if (me?.role !== "admin") {
        window.location.href = "/login";
        return;
      }

      setAuthorized(true);
      await loadProfiles();
      setLoading(false);
    };
    init();
  }, []);

  const loadProfiles = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setProfiles(data ?? []);
  };

  const changeRole = async (id: string, role: string) => {
    const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, role } : p)));
  };

  const removeUser = async (id: string, name: string) => {
    if (!confirm(`Удалить пользователя «${name}»?`)) return;
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", color: "#6B7280" }}>
        Жүктелуде…
      </div>
    );
  }

  if (!authorized) return null;

  const filtered = profiles.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: profiles.length,
    students: profiles.filter((p) => p.role === "student").length,
    teachers: profiles.filter((p) => p.role === "teacher").length,
    admins: profiles.filter((p) => p.role === "admin").length,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8F7FF", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <header style={{ background: "#1E1B4B", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#7C3AED,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800 }}>Б</div>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>Әкімші панелі 👑</span>
        </div>
        <button onClick={logout} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>
          Шығу
        </button>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
        {error && (
          <div style={{ background: "#FEE2E2", color: "#B91C1C", padding: "10px 16px", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 24 }}>
          {[
            { label: "Барлығы", value: stats.total, color: "#7C3AED" },
            { label: "Оқушылар", value: stats.students, color: "#3B82F6" },
            { label: "Мұғалімдер", value: stats.teachers, color: "#10B981" },
            { label: "Әкімшілер", value: stats.admins, color: "#EC4899" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: 18, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <input
          placeholder="Іздеу: аты немесе email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, marginBottom: 16, fontFamily: "inherit", boxSizing: "border-box" }}
        />

        {/* Table */}
        <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#F9FAFB", textAlign: "left", color: "#6B7280" }}>
                  <th style={{ padding: "12px 16px", fontWeight: 600 }}>Аты</th>
                  <th style={{ padding: "12px 16px", fontWeight: 600 }}>Email</th>
                  <th style={{ padding: "12px 16px", fontWeight: 600 }}>Сынып</th>
                  <th style={{ padding: "12px 16px", fontWeight: 600 }}>Рөл</th>
                  <th style={{ padding: "12px 16px", fontWeight: 600 }}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} style={{ borderTop: "1px solid #F3F4F6" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "#111827" }}>{p.name}</td>
                    <td style={{ padding: "12px 16px", color: "#6B7280" }}>{p.email}</td>
                    <td style={{ padding: "12px 16px", color: "#6B7280" }}>{p.grade ?? "—"}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <select
                        value={p.role}
                        onChange={(e) => changeRole(p.id, e.target.value)}
                        style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, fontFamily: "inherit", cursor: "pointer" }}
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "right" }}>
                      <button
                        onClick={() => removeUser(p.id, p.name)}
                        style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
                      >
                        Жою
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: "24px 16px", textAlign: "center", color: "#9CA3AF" }}>
                      Пайдаланушылар табылмады
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
