"use client";
import Link from "next/link";
import { useState } from "react";

const SUBJECTS = [
  { id: "all", name: "Барлығы", emoji: "📋" },
  { id: "math", name: "Математика", emoji: "🔢" },
  { id: "physics", name: "Физика", emoji: "⚡" },
  { id: "chemistry", name: "Химия", emoji: "🧪" },
  { id: "biology", name: "Биология", emoji: "🔬" },
  { id: "kazakh", name: "Қазақ тілі", emoji: "📚" },
  { id: "history", name: "Тарих", emoji: "🏛️" },
  { id: "english", name: "Ағылшын", emoji: "🌍" },
];

const ALL_COURSES = [
  { id: "1", subject: "math", grade: 7, name: "Алгебра негіздері", teacher: "Нурлан Әбенов", rating: 4.9, reviews: 312, level: "Базалық", plan: "ТЕГІН", color: "#EDE9FE" },
  { id: "2", subject: "math", grade: 8, name: "Геометрия", teacher: "Зарина Досова", rating: 4.8, reviews: 245, level: "Орта", plan: "BASIC", color: "#DBEAFE" },
  { id: "3", subject: "math", grade: 8, name: "Квадрат теңдеулер", teacher: "Бекзат Омаров", rating: 4.8, reviews: 289, level: "Маңызды", plan: "BASIC", color: "#FCE7F3" },
  { id: "4", subject: "math", grade: 9, name: "Тригонометрия", teacher: "Бекзат Омаров", rating: 4.7, reviews: 198, level: "Күрделі", plan: "PREMIUM", color: "#FEF3C7" },
  { id: "5", subject: "physics", grade: 7, name: "Механика негіздері", teacher: "Асем Нурланова", rating: 4.6, reviews: 156, level: "Базалық", plan: "ТЕГІН", color: "#DBEAFE" },
  { id: "6", subject: "physics", grade: 8, name: "Электр тогы", teacher: "Асем Нурланова", rating: 4.7, reviews: 203, level: "Орта", plan: "BASIC", color: "#EDE9FE" },
  { id: "7", subject: "chemistry", grade: 8, name: "Химиялық реакциялар", teacher: "Дана Сейткали", rating: 4.5, reviews: 178, level: "Базалық", plan: "ТЕГІН", color: "#D1FAE5" },
  { id: "8", subject: "biology", grade: 7, name: "Жасушалар биологиясы", teacher: "Айгерім Бекова", rating: 4.4, reviews: 112, level: "Базалық", plan: "ТЕГІН", color: "#FEF3C7" },
  { id: "9", subject: "kazakh", grade: 5, name: "Қазақ тілі: сөз таптары", teacher: "Гүлнар Ахметова", rating: 4.6, reviews: 198, level: "Базалық", plan: "ТЕГІН", color: "#FCE7F3" },
  { id: "10", subject: "english", grade: 6, name: "English for Beginners", teacher: "Мадина Жаксыбекова", rating: 4.8, reviews: 267, level: "Базалық", plan: "BASIC", color: "#DBEAFE" },
  { id: "11", subject: "history", grade: 9, name: "Қазақстан тарихы", teacher: "Ерлан Сатыбалды", rating: 4.5, reviews: 143, level: "Орта", plan: "BASIC", color: "#FEF9C3" },
  { id: "12", subject: "math", grade: 10, name: "Математикалық анализ", teacher: "Нурлан Әбенов", rating: 4.9, reviews: 89, level: "Күрделі", plan: "PREMIUM", color: "#EDE9FE" },
];

const PLAN_COLORS: Record<string, string> = {
  "ТЕГІН": "#10B981",
  "BASIC": "#374151",
  "PREMIUM": "#7C3AED",
};

export default function CoursesPage() {
  const [activeSubject, setActiveSubject] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = ALL_COURSES.filter(c => {
    const matchSubject = activeSubject === "all" || c.subject === activeSubject;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.teacher.toLowerCase().includes(search.toLowerCase());
    return matchSubject && matchSearch;
  });

  return (
    <div style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh", background: "#F9FAFB" }}>
      <style>{`
        .courses-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        @media (max-width: 900px) { .courses-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .courses-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 16px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 40 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#7C3AED,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13 }}>Б</div>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#7C3AED" }}>БілімЖол</span>
        </Link>
        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/auth/signin" style={{ fontSize: 14, color: "#6B7280", textDecoration: "none", fontWeight: 500 }}>Кіру</Link>
          <Link href="/auth/signin" style={{ fontSize: 13, color: "#fff", fontWeight: 700, padding: "7px 16px", borderRadius: 50, background: "linear-gradient(135deg,#7C3AED,#EC4899)", textDecoration: "none" }}>Тіркелу</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 16px" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1F2937", marginBottom: 8 }}>Барлық курстар</h1>
          <p style={{ color: "#6B7280" }}>Өзіңе сай курсты таңда</p>
        </div>

        {/* Search */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Курс немесе мұғалім іздеу..."
          style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 12, padding: "12px 16px", fontSize: 14, marginBottom: 24, outline: "none", fontFamily: "inherit" }}
        />

        {/* Subject Filter */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
          {SUBJECTS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSubject(s.id)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 16px", borderRadius: 50, fontSize: 13, fontWeight: 600,
                cursor: "pointer", border: "none", fontFamily: "inherit",
                background: activeSubject === s.id ? "#7C3AED" : "#fff",
                color: activeSubject === s.id ? "#fff" : "#374151",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                transition: "all 0.15s",
              }}
            >
              {s.emoji} {s.name}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 20 }}>
          {filtered.length} курс табылды
        </p>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filtered.map(c => (
            <Link key={c.id} href={`/courses/${c.id}`} style={{ textDecoration: "none" }}>
              <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #E5E7EB", transition: "all 0.2s", cursor: "pointer" }}>
                <div style={{ height: 120, background: c.color, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 40, opacity: 0.4 }}>📐</span>
                  <span style={{ position: "absolute", top: 8, left: 8, fontSize: 11, fontWeight: 700, color: "#7C3AED", background: "#EDE9FE", padding: "3px 8px", borderRadius: 50 }}>{c.level}</span>
                  <span style={{ position: "absolute", top: 8, right: 8, fontSize: 11, fontWeight: 700, color: "#fff", background: PLAN_COLORS[c.plan] || "#374151", padding: "3px 8px", borderRadius: 6 }}>{c.plan}</span>
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#7C3AED", marginBottom: 3 }}>{c.grade}-сынып</div>
                  <div style={{ fontWeight: 700, color: "#1F2937", marginBottom: 3, fontSize: 14 }}>{c.name}</div>
                  <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 8 }}>{c.teacher}</div>
                  <div style={{ color: "#FBBF24", fontSize: 12 }}>
                    {"★".repeat(Math.floor(c.rating))}
                    <span style={{ color: "#374151", fontWeight: 600, marginLeft: 4 }}>{c.rating}</span>
                    <span style={{ color: "#9CA3AF" }}> ({c.reviews})</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9CA3AF" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Курс табылмады</div>
            <div style={{ fontSize: 14, marginTop: 8 }}>Басқа сөз іздеп көр</div>
          </div>
        )}
      </div>
    </div>
  );
} 