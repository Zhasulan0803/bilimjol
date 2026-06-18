"use client";
import Link from "next/link";

const TOP_COURSES = [
  { name: "Алгебра негіздері", rating: 4.9, reviews: 312 },
  { name: "Жасушалар биологиясы", rating: 4.4, reviews: 112 },
  { name: "Қазақ тілі: сөз таптары", rating: 4.6, reviews: 198 },
];

const SUBJECTS = [
  { name: "Математика", emoji: "🔢" },
  { name: "Физика", emoji: "⚡" },
  { name: "Химия", emoji: "🧪" },
  { name: "Биология", emoji: "🔬" },
  { name: "Қазақ тілі", emoji: "📚" },
  { name: "Тарих", emoji: "🏛️" },
  { name: "Ағылшын", emoji: "🌍" },
];

const POPULAR_COURSES = [
  { grade: "7-сынып", name: "Алгебра негіздері", teacher: "Нурлан Әбенов", rating: 4.9, reviews: 312, level: "Базалық", plan: "ТЕГІН", color: "#EDE9FE" },
  { grade: "8-сынып", name: "Геометрия", teacher: "Зарина Досова", rating: 4.8, reviews: 245, level: "Орта", plan: "BASIC", color: "#DBEAFE" },
  { grade: "8-сынып", name: "Квадрат теңдеулер", teacher: "Бекзат Омаров", rating: 4.8, reviews: 289, level: "Маңызды", plan: "BASIC", color: "#FCE7F3" },
  { grade: "9-сынып", name: "Тригонометрия", teacher: "Бекзат Омаров", rating: 4.7, reviews: 198, level: "Күрделі", plan: "PREMIUM", color: "#FEF3C7" },
];

const FEATURES = [
  { icon: "🤖", title: "ЖИ-кеңесші", desc: "Кез келген сұрақты ЖИ-ге бер — қазақ тілінде жауап ал", bg: "#EDE9FE" },
  { icon: "🏆", title: "Олимпиада дайындық", desc: "Аудандық, облыстық, республикалық олимпиадаға арналған тапсырмалар", bg: "#FEF3C7" },
  { icon: "🎮", title: "Геймификация", desc: "Деңгей көтер, жетістік ал, рейтингте өр — оқу ойынға айналады", bg: "#FCE7F3" },
  { icon: "📊", title: "Прогресс бақылау", desc: "Апталық, айлық нәтижелер графиктермен көрсетіледі", bg: "#DBEAFE" },
  { icon: "👨‍👩‍👧", title: "Ата-ана панелі", desc: "Баланың белсенділігін реал уақытта бақыла, есеп ал", bg: "#D1FAE5" },
  { icon: "🎓", title: "Сертификат", desc: "Курсты аяқтаған соң ресми сертификат — резюмеге қос", bg: "#FEF9C3" },
];

const PLANS = [
  { name: "Тегін", price: "0", unit: "тегін", color: "#1F2937", btnBorder: "1px solid #D1D5DB", btnColor: "#374151", btnBg: "#fff", features: ["3 тегін курс", "Базалық тесттер", "Прогресс бақылау", "Қоғамдық форум"], btnText: "Тегін бастау" },
  { name: "Базалық", price: "2 900", unit: "₸/ай", color: "#10B981", btnBorder: "1px solid #10B981", btnColor: "#10B981", btnBg: "#fff", features: ["Барлық тегін курстар", "5-7 сынып курстары", "Тест жауаптары", "Email қолдау"], btnText: "Таңдау" },
  { name: "Премиум", price: "4 900", unit: "₸/ай", color: "#7C3AED", popular: true, btnBorder: "none", btnColor: "#fff", btnBg: "#7C3AED", features: ["Basic барлығы", "8-9 сынып курстары", "Олимпиада тапсырмалары", "ЖИ-кеңесші"], btnText: "Таңдау" },
  { name: "ВИП", price: "7 900", unit: "₸/ай", color: "#F97316", btnBorder: "1px solid #F97316", btnColor: "#F97316", btnBg: "#fff", features: ["Premium барлығы", "10-сынып курстары", "Жеке мұғаліммен сессия", "Жеке оқу жоспары"], btnText: "Таңдау" },
];

const STATS = [
  { value: "12 000+", label: "Оқушы" },
  { value: "86", label: "Курс" },
  { value: "4 800+", label: "Тапсырма" },
  { value: "98%", label: "Қанағаттану" },
];

export default function HomePage() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", margin: 0, padding: 0, overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        .nav-links { display: flex; gap: 24px; }
        .hero-section { padding: 80px 16px; }
        .hero-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 380px; gap: 48px; align-items: center; }
        .hero-card { display: block; }
        .stats-row { display: flex; gap: 32px; flex-wrap: wrap; margin-top: 40px; }
        .subjects-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
        .courses-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .plans-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .section { padding: 64px 16px; }
        @media (max-width: 900px) {
          .courses-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .plans-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .hero-inner { grid-template-columns: 1fr !important; }
          .hero-card { display: none !important; }
          .hero-section { padding: 40px 16px !important; }
          .hero-title { font-size: 34px !important; }
          .stats-row { gap: 20px; }
          .courses-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .plans-grid { grid-template-columns: 1fr !important; }
          .section { padding: 40px 16px !important; }
          .footer-inner { flex-direction: column !important; }
        }
        @media (max-width: 400px) {
          .courses-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 28px !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "#fff", borderBottom: "1px solid #F3F4F6", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#7C3AED,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13 }}>Б</div>
              <span style={{ fontWeight: 800, fontSize: 17, color: "#7C3AED" }}>БілімЖол</span>
            </Link>
            <div className="nav-links">
              {["Басты","Курстар","Бағалар","Рейтинг"].map(l => (
                <a key={l} href="#" style={{ color: "#6B7280", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>{l}</a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link href="/auth/signin" style={{ fontSize: 14, color: "#6B7280", fontWeight: 500, textDecoration: "none" }}>Кіру</Link>
            <Link href="/auth/signin" style={{ fontSize: 13, color: "#fff", fontWeight: 700, padding: "8px 16px", borderRadius: 50, background: "linear-gradient(135deg,#7C3AED,#EC4899)", textDecoration: "none", whiteSpace: "nowrap" }}>
              Тіркелу
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section" style={{ background: "linear-gradient(135deg,#4C1D95,#7C3AED)", color: "#fff" }}>
        <div className="hero-inner">
          <div>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: 50, padding: "6px 16px", fontSize: 13, marginBottom: 20 }}>
              🇰🇿 Қазақстанның №1 мектеп платформасы
            </div>
            <h1 className="hero-title" style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.15, marginBottom: 16 }}>
              5–10 сыныпқа<br />
              <span style={{ color: "#FBBF24" }}>ақылды оқу</span><br />
              платформасы
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, marginBottom: 28, maxWidth: 480 }}>
              Математика, физика, химия — интерактивті сабақтар, ЖИ кеңесші және олимпиада дайындығы бір жерде.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/auth/signin" style={{ background: "linear-gradient(135deg,#F97316,#EC4899)", color: "#fff", fontWeight: 700, padding: "13px 26px", borderRadius: 50, fontSize: 15, textDecoration: "none" }}>
                Тегін бастау →
              </Link>
              <a href="#courses" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, padding: "13px 26px", borderRadius: 50, fontSize: 15, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}>
                Курстарды қарау
              </a>
            </div>
            <div className="stats-row">
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>{s.value}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-card" style={{ background: "rgba(255,255,255,0.1)", borderRadius: 20, padding: 20, border: "1px solid rgba(255,255,255,0.2)" }}>
            <div style={{ fontWeight: 600, marginBottom: 14, fontSize: 15 }}>🔥 Үздік курстар</div>
            {TOP_COURSES.map(c => (
              <div key={c.name} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: 12, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                  <div style={{ color: "#FBBF24", fontSize: 12 }}>{"★".repeat(Math.floor(c.rating))} ({c.reviews})</div>
                </div>
                <span style={{ background: "#10B981", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>ТЕГІН</span>
              </div>
            ))}
            <button style={{ width: "100%", marginTop: 8, padding: "12px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#7C3AED,#EC4899)", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
              Барлық курстар →
            </button>
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1F2937" }}>Пәндер бойынша</h2>
            <p style={{ color: "#6B7280", marginTop: 6 }}>Өз пәніңді таңда</p>
          </div>
          <div className="subjects-grid">
            {SUBJECTS.map(s => (
              <button key={s.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 16px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, cursor: "pointer", minWidth: 80 }}>
                <span style={{ fontSize: 26 }}>{s.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{s.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR COURSES */}
      <section id="courses" className="section" style={{ background: "#F9FAFB" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1F2937" }}>Танымал курстар</h2>
            <a href="#" style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none", fontSize: 14 }}>Барлығы →</a>
          </div>
          <div className="courses-grid">
            {POPULAR_COURSES.map(c => (
              <div key={c.name} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #E5E7EB" }}>
                <div style={{ height: 110, background: c.color, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 36, opacity: 0.4 }}>📐</span>
                  <span style={{ position: "absolute", top: 8, left: 8, fontSize: 11, fontWeight: 700, color: "#7C3AED", background: "#EDE9FE", padding: "3px 8px", borderRadius: 50 }}>{c.level}</span>
                  <span style={{ position: "absolute", top: 8, right: 8, fontSize: 11, fontWeight: 700, color: "#fff", background: c.plan === "ТЕГІН" ? "#10B981" : "#374151", padding: "3px 8px", borderRadius: 6 }}>{c.plan}</span>
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#7C3AED", marginBottom: 3 }}>{c.grade}</div>
                  <div style={{ fontWeight: 700, color: "#1F2937", marginBottom: 3, fontSize: 14 }}>{c.name}</div>
                  <div style={{ color: "#6B7280", fontSize: 12, marginBottom: 6 }}>{c.teacher}</div>
                  <div style={{ color: "#FBBF24", fontSize: 12 }}>{"★".repeat(Math.floor(c.rating))} <span style={{ color: "#374151", fontWeight: 600 }}>{c.rating}</span> <span style={{ color: "#9CA3AF" }}>({c.reviews})</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1F2937" }}>Неліктен БілімЖол?</h2>
            <p style={{ color: "#6B7280", marginTop: 6 }}>Оқушыларға арнайы жасалған функциялар</p>
          </div>
          <div className="features-grid">
            {FEATURES.map(f => (
              <div key={f.title} style={{ borderRadius: 16, padding: 22, background: f.bg }}>
                <div style={{ fontSize: 30, marginBottom: 10 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, color: "#1F2937", marginBottom: 6, fontSize: 15 }}>{f.title}</div>
                <div style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" style={{ background: "#F9FAFB" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1F2937" }}>Жоспарлар</h2>
            <p style={{ color: "#6B7280", marginTop: 6 }}>Өз деңгейіңе сай жоспар таңда</p>
          </div>
          <div className="plans-grid">
            {PLANS.map(p => (
              <div key={p.name} style={{ background: "#fff", borderRadius: 20, padding: 22, border: p.popular ? "2px solid #7C3AED" : "1px solid #E5E7EB", position: "relative" }}>
                {p.popular && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#7C3AED", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 50, whiteSpace: "nowrap" }}>
                    ⭐ ЕҢ ТАНЫМАЛ
                  </div>
                )}
                <div style={{ fontWeight: 700, fontSize: 16, color: p.color, marginBottom: 6 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 16 }}>
                  <span style={{ fontSize: 26, fontWeight: 900, color: "#1F2937" }}>{p.price}</span>
                  <span style={{ color: "#6B7280", fontSize: 13, paddingBottom: 2 }}>{p.unit}</span>
                </div>
                <div style={{ marginBottom: 16 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#4B5563", marginBottom: 6 }}>
                      <span style={{ color: p.color }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                <button style={{ width: "100%", padding: "10px", borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit", border: p.btnBorder, color: p.btnColor, background: p.btnBg }}>
                  {p.btnText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg,#4C1D95,#7C3AED)", padding: "60px 16px", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 10 }}>Бүгіннен бастай бер!</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, marginBottom: 28 }}>Тіркелу тегін. Кредит картасы қажет емес.</p>
        <Link href="/auth/signin" style={{ display: "inline-block", background: "linear-gradient(135deg,#F97316,#EC4899)", color: "#fff", fontWeight: 700, padding: "14px 36px", borderRadius: 50, fontSize: 15, textDecoration: "none" }}>
          Тіркелу — тегін →
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111827", color: "#9CA3AF", padding: "40px 16px" }}>
        <div className="footer-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg,#7C3AED,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 12 }}>Б</div>
              <span style={{ fontWeight: 800, color: "#fff", fontSize: 15 }}>БілімЖол</span>
            </div>
            <p style={{ fontSize: 13 }}>Қазақстандық мектеп оқушыларына арналған<br />ең үздік білім платформасы</p>
          </div>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            <div>
              <div style={{ color: "#fff", fontWeight: 600, marginBottom: 10, fontSize: 14 }}>Платформа</div>
              {["Курстар","Бағалар","Рейтинг","ЖИ-кеңесші"].map(l => (
                <a key={l} href="#" style={{ display: "block", marginBottom: 7, fontSize: 13, color: "#9CA3AF", textDecoration: "none" }}>{l}</a>
              ))}
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 600, marginBottom: 10, fontSize: 14 }}>Байланыс</div>
              {["info@bilimjol.kz","WhatsApp","Telegram"].map(l => (
                <div key={l} style={{ marginBottom: 7, fontSize: 13 }}>{l}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: "20px auto 0", paddingTop: 20, borderTop: "1px solid #1F2937", textAlign: "center", fontSize: 12 }}>
          © 2025 БілімЖол. Барлық құқықтар қорғалған.
        </div>
      </footer>
    </div>
  );
} 