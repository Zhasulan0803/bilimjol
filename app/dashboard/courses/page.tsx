"use client";
import Link from "next/link";
import { useState } from "react";

const MY_COURSES = [
  { id: "1", name: "Алгебра негіздері", subject: "Математика", grade: "7-сынып", teacher: "Нурлан Әбенов", progress: 65, totalLessons: 8, doneLessons: 5, color: "#EDE9FE", lastStudied: "Бүгін" },
  { id: "2", name: "Геометрия", subject: "Математика", grade: "8-сынып", teacher: "Зарина Досова", progress: 30, totalLessons: 8, doneLessons: 2, color: "#DBEAFE", lastStudied: "Кеше" },
  { id: "3", name: "Квадрат теңдеулер", subject: "Математика", grade: "8-сынып", teacher: "Бекзат Омаров", progress: 10, totalLessons: 8, doneLessons: 1, color: "#FCE7F3", lastStudied: "3 күн бұрын" },
  { id: "4", name: "Тригонометрия", subject: "Математика", grade: "9-сынып", teacher: "Бекзат Омаров", progress: 0, totalLessons: 8, doneLessons: 0, color: "#FEF3C7", lastStudied: "Басталмаған" },
];

const TABS = ["Барлығы", "Жалғасып жатыр", "Аяқталған"];

export default function MyCoursesPage() {
  const [tab, setTab] = useState("Барлығы");

  const filtered = MY_COURSES.filter(c => {
    if (tab === "Жалғасып жатыр") return c.progress > 0 && c.progress < 100;
    if (tab === "Аяқталған") return c.progress === 100;
    return true;
  });

  return (
    <div style={{ padding: 24, fontFamily: "Inter, sans-serif" }}>
      <style>{`
        .courses-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 900px) { .courses-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .courses-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1F2937" }}>Менің курстарым 📚</h1>
        <p style={{ color: "#6B7280", fontSize: 14, marginTop: 4 }}>Тіркелген курстарың</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { icon: "📚", value: MY_COURSES.length, label: "Барлық курс" },
          { icon: "⚡", value: MY_COURSES.filter(c => c.progress > 0 && c.progress < 100).length, label: "Жалғасып жатыр" },
          { icon: "✅", value: MY_COURSES.filter(c => c.progress === 100).length, label: "Аяқталған" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: 16, border: "1px solid #E5E7EB", textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1F2937" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{ padding: "8px 16px", borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "inherit", background: tab === t ? "#7C3AED" : "#F3F4F6", color: tab === t ? "#fff" : "#374151" }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Courses */}
      <div className="courses-grid">
        {filtered.map(c => (
          <div key={c.id} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #E5E7EB" }}>
            <div style={{ height: 100, background: c.color, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 36, opacity: 0.4 }}>📐</span>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "#E5E7EB" }}>
                <div style={{ height: "100%", width: `${c.progress}%`, background: "linear-gradient(90deg,#7C3AED,#EC4899)" }} />
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#7C3AED", marginBottom: 3 }}>{c.subject} · {c.grade}</div>
              <div style={{ fontWeight: 700, color: "#1F2937", marginBottom: 3, fontSize: 14 }}>{c.name}</div>
              <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 12 }}>{c.teacher}</div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B7280", marginBottom: 6 }}>
                <span>{c.doneLessons}/{c.totalLessons} сабақ</span>
                <span style={{ fontWeight: 700, color: "#7C3AED" }}>{c.progress}%</span>
              </div>
              <div style={{ height: 6, background: "#F3F4F6", borderRadius: 3, marginBottom: 12 }}>
                <div style={{ height: "100%", width: `${c.progress}%`, background: "linear-gradient(90deg,#7C3AED,#EC4899)", borderRadius: 3 }} />
              </div>

              <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 12 }}>
                🕐 {c.lastStudied}
              </div>

              <Link
                href={`/courses/${c.id}`}
                style={{ display: "block", width: "100%", padding: "10px", borderRadius: 10, background: c.progress === 0 ? "linear-gradient(135deg,#7C3AED,#EC4899)" : "#F5F3FF", color: c.progress === 0 ? "#fff" : "#7C3AED", fontWeight: 600, fontSize: 13, textAlign: "center", textDecoration: "none" }}
              >
                {c.progress === 0 ? "Бастау →" : c.progress === 100 ? "Қайталау" : "Жалғастыру →"}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9CA3AF" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#374151" }}>Курс табылмады</div>
          <Link href="/courses" style={{ display: "inline-block", marginTop: 16, padding: "10px 24px", borderRadius: 50, background: "linear-gradient(135deg,#7C3AED,#EC4899)", color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
            Курс қосу →
          </Link>
        </div>
      )}
    </div>
  );
} 