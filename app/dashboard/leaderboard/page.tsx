"use client";
import { useState } from "react";

const USERS = [
  { rank: 1, name: "Айгерім Сейтқали", grade: "9-сынып", xp: 12450, level: 24, streak: 30, badges: ["🔥","⭐","🏆","💎"], plan: "VIP" },
  { rank: 2, name: "Ерлан Бекұлы", grade: "10-сынып", xp: 11200, level: 22, streak: 25, badges: ["🔥","⭐","🏆"], plan: "PREMIUM" },
  { rank: 3, name: "Дана Жаксыбекова", grade: "9-сынып", xp: 10800, level: 21, streak: 20, badges: ["🔥","⭐"], plan: "PREMIUM" },
  { rank: 4, name: "Асем Нурланова", grade: "8-сынып", xp: 9500, level: 19, streak: 15, badges: ["🔥","⭐"], plan: "BASIC" },
  { rank: 5, name: "Бекзат Омаров", grade: "10-сынып", xp: 8900, level: 18, streak: 12, badges: ["🔥"], plan: "PREMIUM" },
  { rank: 6, name: "Гүлнар Ахметова", grade: "7-сынып", xp: 7600, level: 16, streak: 10, badges: ["⭐"], plan: "BASIC" },
  { rank: 7, name: "Нурлан Әбенов", grade: "8-сынып", xp: 6800, level: 14, streak: 8, badges: ["🔥"], plan: "BASIC" },
  { rank: 8, name: "Мадина Жаксыбек", grade: "9-сынып", xp: 5900, level: 12, streak: 7, badges: [], plan: "FREE" },
  { rank: 9, name: "Зарина Досова", grade: "7-сынып", xp: 4820, level: 12, streak: 7, badges: [], plan: "FREE" },
  { rank: 10, name: "Сенің орның", grade: "9-сынып", xp: 4820, level: 12, streak: 7, badges: [], plan: "PREMIUM", isMe: true },
];

const PERIODS = ["Апта", "Ай", "Барлық уақыт"];

const MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };
const PLAN_COLORS: Record<string, string> = { VIP: "#F97316", PREMIUM: "#7C3AED", BASIC: "#10B981", FREE: "#9CA3AF" };

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("Барлық уақыт");

  return (
    <div style={{ padding: 24, fontFamily: "Inter, sans-serif" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1F2937" }}>Рейтинг 🏆</h1>
        <p style={{ color: "#6B7280", fontSize: 14, marginTop: 4 }}>Үздік оқушылар тізімі</p>
      </div>

      {/* TOP 3 */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 16, marginBottom: 32 }}>
        {/* 2nd */}
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#9CA3AF,#6B7280)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 20, margin: "0 auto 8px" }}>
            {USERS[1].name[0]}
          </div>
          <div style={{ fontSize: 24 }}>🥈</div>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#1F2937", marginTop: 4 }}>{USERS[1].name.split(" ")[0]}</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>{USERS[1].xp.toLocaleString()} XP</div>
          <div style={{ height: 80, background: "#E5E7EB", borderRadius: "8px 8px 0 0", marginTop: 8, width: 80 }} />
        </div>
        {/* 1st */}
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 68, height: 68, borderRadius: "50%", background: "linear-gradient(135deg,#FBBF24,#F59E0B)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 24, margin: "0 auto 8px", boxShadow: "0 4px 16px rgba(251,191,36,0.4)" }}>
            {USERS[0].name[0]}
          </div>
          <div style={{ fontSize: 28 }}>🥇</div>
          <div style={{ fontWeight: 800, fontSize: 14, color: "#1F2937", marginTop: 4 }}>{USERS[0].name.split(" ")[0]}</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>{USERS[0].xp.toLocaleString()} XP</div>
          <div style={{ height: 110, background: "linear-gradient(135deg,#FBBF24,#F59E0B)", borderRadius: "8px 8px 0 0", marginTop: 8, width: 80 }} />
        </div>
        {/* 3rd */}
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,#CD7F32,#A0522D)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 18, margin: "0 auto 8px" }}>
            {USERS[2].name[0]}
          </div>
          <div style={{ fontSize: 22 }}>🥉</div>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#1F2937", marginTop: 4 }}>{USERS[2].name.split(" ")[0]}</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>{USERS[2].xp.toLocaleString()} XP</div>
          <div style={{ height: 60, background: "#CD7F32", borderRadius: "8px 8px 0 0", marginTop: 8, width: 80 }} />
        </div>
      </div>

      {/* Period filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {PERIODS.map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            style={{ padding: "8px 16px", borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "inherit", background: period === p ? "#7C3AED" : "#F3F4F6", color: period === p ? "#fff" : "#374151" }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB", overflow: "hidden" }}>
        {USERS.map((u, i) => (
          <div
            key={i}
            style={{
              display: "flex", alignItems: "center", gap: 12, padding: "14px 20px",
              borderBottom: i < USERS.length - 1 ? "1px solid #F3F4F6" : "none",
              background: u.isMe ? "#F5F3FF" : "#fff",
            }}
          >
            <div style={{ width: 28, textAlign: "center", fontSize: u.rank <= 3 ? 20 : 14, fontWeight: 700, color: "#9CA3AF", flexShrink: 0 }}>
              {MEDAL[u.rank] || u.rank}
            </div>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: u.isMe ? "linear-gradient(135deg,#7C3AED,#EC4899)" : "linear-gradient(135deg,#E5E7EB,#D1D5DB)", display: "flex", alignItems: "center", justifyContent: "center", color: u.isMe ? "#fff" : "#6B7280", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
              {u.name[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: u.isMe ? 800 : 600, fontSize: 14, color: "#1F2937", display: "flex", alignItems: "center", gap: 6 }}>
                {u.name} {u.isMe && <span style={{ fontSize: 11, color: "#7C3AED", fontWeight: 700 }}>(Сен)</span>}
              </div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>{u.grade} · Деңгей {u.level} · 🔥{u.streak} күн</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#1F2937" }}>{u.xp.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>XP</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: PLAN_COLORS[u.plan], padding: "3px 8px", borderRadius: 6, flexShrink: 0 }}>
              {u.plan}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 