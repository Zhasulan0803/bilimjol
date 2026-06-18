"use client";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const activityData = [
  { day: "Дс", min: 35 }, { day: "Сс", min: 60 }, { day: "Ср", min: 25 },
  { day: "Бс", min: 90 }, { day: "Жм", min: 45 }, { day: "Сб", min: 120 }, { day: "Жс", min: 40 },
];

const testData = [
  { week: "1-апта", score: 65 }, { week: "2-апта", score: 68 },
  { week: "3-апта", score: 72 }, { week: "4-апта", score: 75 },
  { week: "5-апта", score: 80 }, { week: "6-апта", score: 85 },
];

const COURSES = [
  { name: "Алгебра негіздері", progress: 65, color: "#7C3AED" },
  { name: "Геометрия", progress: 30, color: "#3B82F6" },
  { name: "Квадрат теңдеулер", progress: 10, color: "#F97316" },
];

export default function DashboardPage() {
  return (
    <div style={{ padding: 24, fontFamily: "Inter, sans-serif" }}>
      <style>{`
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        .charts-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-bottom: 24px; }
        .bottom-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .charts-grid { grid-template-columns: 1fr; }
          .bottom-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1F2937" }}>Сәлем, Айгерім! 👋</h1>
        <p style={{ color: "#6B7280", marginTop: 4, fontSize: 14 }}>Бүгін де оқуды жалғастырайық!</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {[
          { icon: "⭐", value: "4 820", label: "Жалпы ұпай" },
          { icon: "⚡", value: "Lv.12", label: "Деңгей" },
          { icon: "📚", value: "4", label: "Тіркелген курс" },
          { icon: "🔥", value: "7 күн", label: "Streak" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 16, padding: 16, border: "1px solid #E5E7EB" }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1F2937" }}>{s.value}</div>
            <div style={{ color: "#6B7280", fontSize: 12 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #E5E7EB" }}>
          <h3 style={{ fontWeight: 700, color: "#1F2937", margin: "0 0 4px", fontSize: 15 }}>Апталық белсенділік</h3>
          <p style={{ color: "#9CA3AF", fontSize: 12, margin: "0 0 16px" }}>Оқуға жұмсалған уақыт (минут)</p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={activityData} barSize={24}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9CA3AF" }} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 12 }} />
              <Bar dataKey="min" radius={[6, 6, 0, 0]} fill="url(#barGrad)" />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #E5E7EB" }}>
          <h3 style={{ fontWeight: 700, color: "#1F2937", margin: "0 0 16px", fontSize: 15 }}>Жалғастыру</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {COURSES.map(c => (
              <div key={c.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1F2937" }}>{c.name}</span>
                  <span style={{ fontSize: 12, color: "#9CA3AF" }}>{c.progress}%</span>
                </div>
                <div style={{ height: 6, background: "#F3F4F6", borderRadius: 3 }}>
                  <div style={{ height: "100%", width: `${c.progress}%`, background: c.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bottom-grid">
        <div style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #E5E7EB" }}>
          <h3 style={{ fontWeight: 700, color: "#1F2937", margin: "0 0 4px", fontSize: 15 }}>Тест нәтижелері</h3>
          <p style={{ color: "#9CA3AF", fontSize: 12, margin: "0 0 16px" }}>6 аптадағы жетістік (%)</p>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={testData}>
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9CA3AF" }} />
              <YAxis domain={[60, 100]} hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 12 }} />
              <Line type="monotone" dataKey="score" stroke="#7C3AED" strokeWidth={2.5} dot={{ fill: "#7C3AED", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ borderRadius: 16, padding: 20, background: "linear-gradient(135deg,#1E1B4B,#4C1D95)", color: "#fff" }}>
          <div style={{ fontSize: 18, marginBottom: 8 }}>🔥 7 күн қатарынан!</div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginBottom: 16 }}>Апталық жазбаны сақта — 50 бонус XP!</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
            {["Дс","Сс","Ср","Бс","Жм","Сб","Жс"].map((d, i) => (
              <div key={d} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: i < 5 ? "#F97316" : "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                  {i < 5 ? "🔥" : "·"}
                </div>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 9 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 