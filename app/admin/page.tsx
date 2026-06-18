"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  full_name: string;
  phone: string | null;
  role: string;
  created_at: string;
};

type Course = {
  id: string;
  name: string;
  subject: string;
  grade: number;
  teacher: string | null;
  level: string;
  plan: string;
  description: string | null;
  created_at: string;
};

type Lesson = {
  id: string;
  course_id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  position: number;
  created_at: string;
};

const ROLES = ["student", "teacher", "admin"];
const SUBJECTS = ["math", "physics", "chemistry", "biology", "kazakh", "history", "english"];
const LEVELS = ["Базалық", "Орта", "Күрделі"];
const PLANS = ["ТЕГІН", "BASIC", "PREMIUM"];
const GRADES = [5, 6, 7, 8, 9, 10, 11];

const card = { background: "#fff", borderRadius: 14, padding: 18, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" };
const btnPrimary: React.CSSProperties = { background: "linear-gradient(135deg,#7C3AED,#EC4899)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "inherit" };

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [tab, setTab] = useState<"users" | "courses" | "lessons">("users");
  const [error, setError] = useState("");

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [search, setSearch] = useState("");

  // course form
  const [courseForm, setCourseForm] = useState({ name: "", subject: "math", grade: 7, teacher: "", level: "Базалық", plan: "ТЕГІН", description: "" });
  // lesson form
  const [selectedCourse, setSelectedCourse] = useState("");
  const [lessonForm, setLessonForm] = useState({ title: "", content: "", video_url: "", position: 0 });

  useEffect(() => {
    const init = async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) { window.location.href = "/auth/signin"; return; }

      const { data: me } = await supabase.from("profiles").select("role").eq("id", auth.user.id).single();
      if (me?.role !== "admin") { window.location.href = "/auth/signin"; return; }

      setAuthorized(true);
      await Promise.all([loadProfiles(), loadCourses()]);
      setLoading(false);
    };
    init();
  }, []);

  const loadProfiles = async () => {
    const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (error) setError(error.message); else setProfiles(data ?? []);
  };

  const loadCourses = async () => {
    const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
    if (error) setError(error.message); else setCourses(data ?? []);
  };

  const loadLessons = async (courseId: string) => {
    if (!courseId) { setLessons([]); return; }
    const { data, error } = await supabase.from("lessons").select("*").eq("course_id", courseId).order("position", { ascending: true });
    if (error) setError(error.message); else setLessons(data ?? []);
  };

  // ---- users ----
  const changeRole = async (id: string, role: string) => {
    const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
    if (error) { setError(error.message); return; }
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, role } : p)));
  };
  const removeUser = async (id: string, name: string) => {
    if (!confirm(`Удалить пользователя «${name}»?`)) return;
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) { setError(error.message); return; }
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  // ---- courses ----
  const addCourse = async () => {
    setError("");
    if (!courseForm.name) { setError("Курс атауын енгізіңіз"); return; }
    const { data, error } = await supabase.from("courses").insert({ ...courseForm }).select().single();
    if (error) { setError(error.message); return; }
    setCourses((prev) => [data as Course, ...prev]);
    setCourseForm({ name: "", subject: "math", grade: 7, teacher: "", level: "Базалық", plan: "ТЕГІН", description: "" });
  };
  const removeCourse = async (id: string, name: string) => {
    if (!confirm(`Удалить курс «${name}» вместе с уроками?`)) return;
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) { setError(error.message); return; }
    setCourses((prev) => prev.filter((c) => c.id !== id));
    if (selectedCourse === id) { setSelectedCourse(""); setLessons([]); }
  };

  // ---- lessons ----
  const addLesson = async () => {
    setError("");
    if (!selectedCourse) { setError("Алдымен курс таңдаңыз"); return; }
    if (!lessonForm.title) { setError("Сабақ атауын енгізіңіз"); return; }
    const { data, error } = await supabase.from("lessons").insert({ course_id: selectedCourse, ...lessonForm }).select().single();
    if (error) { setError(error.message); return; }
    setLessons((prev) => [...prev, data as Lesson].sort((a, b) => a.position - b.position));
    setLessonForm({ title: "", content: "", video_url: "", position: 0 });
  };
  const removeLesson = async (id: string) => {
    if (!confirm("Удалить урок?")) return;
    const { error } = await supabase.from("lessons").delete().eq("id", id);
    if (error) { setError(error.message); return; }
    setLessons((prev) => prev.filter((l) => l.id !== id));
  };

  const logout = async () => { await supabase.auth.signOut(); window.location.href = "/auth/signin"; };

  if (loading) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", color: "#6B7280" }}>Жүктелуде…</div>;
  }
  if (!authorized) return null;

  const filteredUsers = profiles.filter((p) =>
    p.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    p.phone?.toLowerCase().includes(search.toLowerCase())
  );

  const tabs: { key: typeof tab; label: string }[] = [
    { key: "users", label: "Пайдаланушылар" },
    { key: "courses", label: "Курстар" },
    { key: "lessons", label: "Сабақтар" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#F8F7FF", fontFamily: "Inter, sans-serif" }}>
      <header style={{ background: "#1E1B4B", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#7C3AED,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800 }}>Б</div>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>Әкімші панелі 👑</span>
        </div>
        <button onClick={logout} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>Шығу</button>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
        {error && <div style={{ background: "#FEE2E2", color: "#B91C1C", padding: "10px 16px", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>{error}</div>}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {tabs.map((t) => (
            <button key={t.key} onClick={() => { setTab(t.key); setError(""); }}
              style={{ padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "inherit",
                background: tab === t.key ? "#7C3AED" : "#fff", color: tab === t.key ? "#fff" : "#6B7280", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* USERS */}
        {tab === "users" && (
          <>
            <input placeholder="Іздеу: аты немесе телефон…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...inputStyle, marginBottom: 16 }} />
            <div style={{ ...card, padding: 0, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: "#F9FAFB", textAlign: "left", color: "#6B7280" }}>
                      <th style={{ padding: "12px 16px", fontWeight: 600 }}>Аты</th>
                      <th style={{ padding: "12px 16px", fontWeight: 600 }}>Телефон</th>
                      <th style={{ padding: "12px 16px", fontWeight: 600 }}>Рөл</th>
                      <th style={{ padding: "12px 16px", fontWeight: 600 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((p) => (
                      <tr key={p.id} style={{ borderTop: "1px solid #F3F4F6" }}>
                        <td style={{ padding: "12px 16px", fontWeight: 600, color: "#111827" }}>{p.full_name}</td>
                        <td style={{ padding: "12px 16px", color: "#6B7280" }}>{p.phone ?? "—"}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <select value={p.role} onChange={(e) => changeRole(p.id, e.target.value)} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, fontFamily: "inherit", cursor: "pointer" }}>
                            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                          </select>
                        </td>
                        <td style={{ padding: "12px 16px", textAlign: "right" }}>
                          <button onClick={() => removeUser(p.id, p.full_name)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Жою</button>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && <tr><td colSpan={4} style={{ padding: "24px 16px", textAlign: "center", color: "#9CA3AF" }}>Пайдаланушылар табылмады</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* COURSES */}
        {tab === "courses" && (
          <div style={{ display: "grid", gap: 20 }}>
            <div style={card}>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 800 }}>Жаңа курс қосу</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}>
                <input placeholder="Курс атауы" value={courseForm.name} onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })} style={inputStyle} />
                <input placeholder="Мұғалім" value={courseForm.teacher} onChange={(e) => setCourseForm({ ...courseForm, teacher: e.target.value })} style={inputStyle} />
                <select value={courseForm.subject} onChange={(e) => setCourseForm({ ...courseForm, subject: e.target.value })} style={inputStyle}>
                  {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={courseForm.grade} onChange={(e) => setCourseForm({ ...courseForm, grade: parseInt(e.target.value) })} style={inputStyle}>
                  {GRADES.map((g) => <option key={g} value={g}>{g}-сынып</option>)}
                </select>
                <select value={courseForm.level} onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })} style={inputStyle}>
                  {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                <select value={courseForm.plan} onChange={(e) => setCourseForm({ ...courseForm, plan: e.target.value })} style={inputStyle}>
                  {PLANS.map((pl) => <option key={pl} value={pl}>{pl}</option>)}
                </select>
              </div>
              <textarea placeholder="Сипаттама" value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} style={{ ...inputStyle, marginTop: 12, minHeight: 70, resize: "vertical" }} />
              <button onClick={addCourse} style={{ ...btnPrimary, marginTop: 12 }}>Қосу</button>
            </div>

            <div style={{ ...card, padding: 0, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: "#F9FAFB", textAlign: "left", color: "#6B7280" }}>
                      <th style={{ padding: "12px 16px", fontWeight: 600 }}>Атауы</th>
                      <th style={{ padding: "12px 16px", fontWeight: 600 }}>Пән</th>
                      <th style={{ padding: "12px 16px", fontWeight: 600 }}>Сынып</th>
                      <th style={{ padding: "12px 16px", fontWeight: 600 }}>Жоспар</th>
                      <th style={{ padding: "12px 16px", fontWeight: 600 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c) => (
                      <tr key={c.id} style={{ borderTop: "1px solid #F3F4F6" }}>
                        <td style={{ padding: "12px 16px", fontWeight: 600, color: "#111827" }}>{c.name}</td>
                        <td style={{ padding: "12px 16px", color: "#6B7280" }}>{c.subject}</td>
                        <td style={{ padding: "12px 16px", color: "#6B7280" }}>{c.grade}</td>
                        <td style={{ padding: "12px 16px", color: "#6B7280" }}>{c.plan}</td>
                        <td style={{ padding: "12px 16px", textAlign: "right" }}>
                          <button onClick={() => removeCourse(c.id, c.name)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Жою</button>
                        </td>
                      </tr>
                    ))}
                    {courses.length === 0 && <tr><td colSpan={5} style={{ padding: "24px 16px", textAlign: "center", color: "#9CA3AF" }}>Курстар жоқ</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* LESSONS */}
        {tab === "lessons" && (
          <div style={{ display: "grid", gap: 20 }}>
            <div style={card}>
              <label style={{ display: "block", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>Курс таңдаңыз</label>
              <select value={selectedCourse} onChange={(e) => { setSelectedCourse(e.target.value); loadLessons(e.target.value); }} style={inputStyle}>
                <option value="">— курс таңдау —</option>
                {courses.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.grade}-сынып)</option>)}
              </select>
            </div>

            {selectedCourse && (
              <>
                <div style={card}>
                  <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 800 }}>Жаңа сабақ қосу</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: 12 }}>
                    <input placeholder="Сабақ атауы" value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} style={inputStyle} />
                    <input type="number" placeholder="Реті" value={lessonForm.position} onChange={(e) => setLessonForm({ ...lessonForm, position: parseInt(e.target.value) || 0 })} style={inputStyle} />
                  </div>
                  <input placeholder="Видео сілтемесі (YouTube т.б.)" value={lessonForm.video_url} onChange={(e) => setLessonForm({ ...lessonForm, video_url: e.target.value })} style={{ ...inputStyle, marginTop: 12 }} />
                  <textarea placeholder="Сабақ мазмұны" value={lessonForm.content} onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })} style={{ ...inputStyle, marginTop: 12, minHeight: 100, resize: "vertical" }} />
                  <button onClick={addLesson} style={{ ...btnPrimary, marginTop: 12 }}>Қосу</button>
                </div>

                <div style={{ ...card, padding: 0, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    <thead>
                      <tr style={{ background: "#F9FAFB", textAlign: "left", color: "#6B7280" }}>
                        <th style={{ padding: "12px 16px", fontWeight: 600, width: 60 }}>Реті</th>
                        <th style={{ padding: "12px 16px", fontWeight: 600 }}>Атауы</th>
                        <th style={{ padding: "12px 16px", fontWeight: 600 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {lessons.map((l) => (
                        <tr key={l.id} style={{ borderTop: "1px solid #F3F4F6" }}>
                          <td style={{ padding: "12px 16px", color: "#6B7280" }}>{l.position}</td>
                          <td style={{ padding: "12px 16px", fontWeight: 600, color: "#111827" }}>{l.title}</td>
                          <td style={{ padding: "12px 16px", textAlign: "right" }}>
                            <button onClick={() => removeLesson(l.id)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Жою</button>
                          </td>
                        </tr>
                      ))}
                      {lessons.length === 0 && <tr><td colSpan={3} style={{ padding: "24px 16px", textAlign: "center", color: "#9CA3AF" }}>Сабақтар жоқ</td></tr>}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
