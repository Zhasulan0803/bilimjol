"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const studentNav = [
  { href: "/dashboard", label: "Дашборд", icon: "⊞" },
  { href: "/dashboard/courses", label: "Менің курстарым", icon: "📚" },
  { href: "/dashboard/tests", label: "Тесттер", icon: "📝" },
  { href: "/dashboard/leaderboard", label: "Рейтинг", icon: "🏆" },
  { href: "/dashboard/ai-chat", label: "ЖИ кеңесші", icon: "🤖", badge: "NEW" },
  { href: "/pricing", label: "Жоспарым", icon: "💎" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8F7FF", fontFamily: "Inter, sans-serif" }}>
      {/* SIDEBAR */}
      <aside style={{ width: 224, background: "#1E1B4B", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh" }}>
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
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>А</div>
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
        <nav style={{ flex: 1, padding: "8px 0" }}>
          {studentNav.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  fontSize: 14,
                  color: active ? "#fff" : "#A78BFA",
                  background: active ? "rgba(124,58,237,0.4)" : "transparent",
                  borderLeft: active ? "3px solid #EC4899" : "3px solid transparent",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{ marginLeft: "auto", background: "#10B981", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 6 }}>
                    {item.badge}
                  </span>
                )}
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
      <main style={{ flex: 1, overflow: "auto" }}>
        {children}
      </main>
    </div>
  );
} 