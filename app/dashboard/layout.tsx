"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const studentNav = [
  { href: "/dashboard", label: "Дашборд", icon: "⊞" },
  { href: "/dashboard/courses", label: "Менің курстарым", icon: "📚" },
  { href: "/dashboard/tests", label: "Тесттер", icon: "📝" },
  { href: "/dashboard/leaderboard", label: "Рейтинг", icon: "🏆" },
  { href: "/pricing", label: "Жоспарым", icon: "💎" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8F7FF", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        .sidebar { width: 224px; background: #1E1B4B; display: flex; flex-direction: column; flex-shrink: 0; position: fixed; top: 0; left: 0; height: 100vh; z-index: 40; transition: transform 0.3s; }
        .main-content { margin-left: 224px; flex: 1; overflow: auto; }
        .mobile-header { display: none; }
        .sidebar-overlay { display: none; }
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.open { transform: translateX(0); }
          .main-content { margin-left: 0; }
          .mobile-header { display: flex; align-items: center; justify-content: space-between; padding: 0 16px; height: 56px; background: #1E1B4B; position: sticky; top: 0; z-index: 30; }
          .sidebar-overlay { display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 35; }
        }
      `}</style>

      {/* MOBILE HEADER */}
      <div className="mobile-header">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#7C3AED,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13 }}>Б</div>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>БілімЖол</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ background: "none", border: "none", color: "#fff", fontSize: 24, cursor: "pointer", padding: 4 }}
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Logo */}
        <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#7C3AED,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15 }}>Б</div>
            <span style={{ fontWeight: 800, fontSize: 17, color: "#fff" }}>БілімЖол</span>
          </Link>
        </div>

        {/* User */}
        <div style={{ padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>А</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Оқушы</div>
              <div style={{ color: "#A78BFA", fontSize: 11, fontWeight: 700 }}>PREMIUM · 9-сынып</div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#A78BFA", marginBottom: 4 }}>
              <span>Деңгей 12</span>
              <span>720/1000 XP</span>
            </div>
            <div style={{ height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 3 }}>
              <div style={{ height: "100%", width: "72%", background: "linear-gradient(90deg,#7C3AED,#EC4899)", borderRadius: 3 }} />
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "8px 0", overflowY: "auto" }}>
          {studentNav.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "11px 16px", fontSize: 14,
                  color: active ? "#fff" : "#A78BFA",
                  background: active ? "rgba(124,58,237,0.4)" : "transparent",
                  borderLeft: active ? "3px solid #EC4899" : "3px solid transparent",
                  textDecoration: "none", transition: "all 0.15s",
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", fontSize: 14, color: "#A78BFA", textDecoration: "none" }}>
            🏠 <span>Сайтқа қайту</span>
          </Link>
          <button
            onClick={() => router.push("/")}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", fontSize: 14, color: "#F87171", background: "none", border: "none", width: "100%", cursor: "pointer", fontFamily: "inherit" }}
          >
            🚪 <span>Шығу</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
} 