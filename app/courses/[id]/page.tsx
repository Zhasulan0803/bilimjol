"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

const ALL_COURSES: Record<string, any> = {
  "1": { subject: "math", grade: 7, name: "Алгебра негіздері", teacher: "Нурлан Әбенов", rating: 4.9, reviews: 312, level: "Базалық", plan: "ТЕГІН", color: "#EDE9FE", students: 1240, duration: "24 сабақ", desc: "Алгебраның негізгі ұғымдары, өрнектер, теңдеулер және функциялар. 7-сынып оқушыларына арналған толық курс.", lessons: ["Натурал сандар", "Бүтін сандар", "Рационал сандар", "Алгебралық өрнектер", "Бір айнымалылы теңдеулер", "Пропорция", "Пайыз есептері", "Координаталар жүйесі"] },
  "2": { subject: "math", grade: 8, name: "Геометрия", teacher: "Зарина Досова", rating: 4.8, reviews: 245, level: "Орта", plan: "BASIC", color: "#DBEAFE", students: 980, duration: "32 сабақ", desc: "Планиметрия және стереометрия негіздері. Дәлелдеу, есеп шығару дағдылары.", lessons: ["Үшбұрыш", "Теңбүйірлі үшбұрыш", "Параллель түзулер", "Параллелограмм", "Трапеция", "Дөңгелек", "Ұқсас үшбұрыштар", "Пифагор теоремасы"] },
  "3": { subject: "math", grade: 8, name: "Квадрат теңдеулер", teacher: "Бекзат Омаров", rating: 4.8, reviews: 289, level: "Маңызды", plan: "BASIC", color: "#FCE7F3", students: 1100, duration: "18 сабақ", desc: "Квадрат теңдеулерді шешудің барлық тәсілдері. ҰБТ-ға дайындалуға өте пайдалы.", lessons: ["Квадрат теңдеу түсінігі", "Толымды квадрат теңдеу", "Толымсыз квадрат теңдеу", "Дискриминант формуласы", "Виет теоремасы", "Квадрат үшмүше", "Теңсіздіктер", "Есептер шығару"] },
  "4": { subject: "math", grade: 9, name: "Тригонометрия", teacher: "Бекзат Омаров", rating: 4.7, reviews: 198, level: "Күрделі", plan: "PREMIUM", color: "#FEF3C7", students: 760, duration: "28 сабақ", desc: "Тригонометриялық функциялар, формулалар және теңдеулер. Олимпиадаға дайындық.", lessons: ["Бұрыш өлшемі", "sin, cos, tan, cot", "Тригонометриялық кестелер", "Негізгі тождества", "Қосынды формулалары", "Екі еселік бұрыш", "Тригонометриялық теңдеулер", "Обратные функции"] },
  "5": { subject: "physics", grade: 7, name: "Механика негіздері", teacher: "Асем Нурланова", rating: 4.6, reviews: 156, level: "Базалық", plan: "ТЕГІН", color: "#DBEAFE", students: 890, duration: "20 сабақ", desc: "Физика ғылымына кіріспе. Механикалық қозғалыс, күш, энергия негіздері.", lessons: ["Физика ғылымы", "Дене және материя", "Механикалық қозғалыс", "Жылдамдық", "Үдеу", "Ньютон заңдары", "Үйкеліс күші", "Энергия"] },
};

const PLAN_COLORS: Record<string, string> = {
  "ТЕГІН": "#10B981", "BASIC": "#374151", "PREMIUM": "#7C3AED",
};

export default function CoursePage() {
  const params = useParams();
  const id = params.id as string;
  const course = ALL_COURSES[id];

  if (!course) {
    return (
      <div style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{ fontSize: 64 }}>😕</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1F2937" }}>Курс табылмады</h1>
        <Link href="/courses" style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}>← Курстарға қайту</Link>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh", background: "#F9FAFB" }}>
      <style>{`
        .course-layout { display: grid; grid-template-columns: 1fr 340px; gap: 32px; align-items: start; }
        @media (max-width: 768px) { .course-layout { grid-template-columns: 1fr !important; } }
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

      {/* BREADCRUMB */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 16px 0" }}>
        <div style={{ fontSize: 13, color: "#6B7280" }}>
          <Link href="/" style={{ color: "#6B7280", textDecoration: "none" }}>Басты</Link>
          {" → "}
          <Link href="/courses" style={{ color: "#6B7280", textDecoration: "none" }}>Курстар</Link>
          {" → "}
          <span style={{ color: "#1F2937" }}>{course.name}</span>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#4C1D95,#7C3AED)", color: "#fff", padding: "40px 16px", marginBottom: 0 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: 50, padding: "4px 14px", fontSize: 12, marginBottom: 16, fontWeight: 600 }}>
            {course.grade}-сынып · {course.level}
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12, lineHeight: 1.2 }}>{course.name}</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, marginBottom: 20, maxWidth: 600 }}>{course.desc}</p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontSize: 14 }}>
            <span>👨‍🏫 {course.teacher}</span>
            <span>⭐ {course.rating} ({course.reviews} пікір)</span>
            <span>👥 {course.students} оқушы</span>
            <span>📖 {course.duration}</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 16px" }}>
        <div className="course-layout">
          {/* LEFT — Lessons */}
          <div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #E5E7EB", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1F2937", marginBottom: 20 }}>📚 Сабақтар бағдарламасы</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {course.lessons.map((lesson: string, i: number) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, background: i === 0 ? "#F5F3FF" : "#fff", border: "1px solid #F3F4F6" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: i === 0 ? "#7C3AED" : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", color: i === 0 ? "#fff" : "#9CA3AF", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: 14, color: "#1F2937", fontWeight: i === 0 ? 600 : 400 }}>{lesson}</span>
                    {i === 0 && <span style={{ marginLeft: "auto", fontSize: 11, color: "#10B981", fontWeight: 700 }}>ТЕГІН</span>}
                    {i > 0 && course.plan !== "ТЕГІН" && <span style={{ marginLeft: "auto", fontSize: 16 }}>🔒</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Teacher info */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #E5E7EB" }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1F2937", marginBottom: 16 }}>👨‍🏫 Мұғалім туралы</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 22, flexShrink: 0 }}>
                  {course.teacher[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#1F2937" }}>{course.teacher}</div>
                  <div style={{ color: "#6B7280", fontSize: 13, marginTop: 2 }}>Математика мұғалімі · 10 жыл тәжірибе</div>
                  <div style={{ color: "#FBBF24", fontSize: 13, marginTop: 4 }}>{"★".repeat(5)} <span style={{ color: "#374151" }}>{course.rating}</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Enrollment card */}
          <div style={{ position: "sticky", top: 80 }}>
            <div style={{ background: "#fff", borderRadius: 20, border: "2px solid #E5E7EB", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <div style={{ height: 120, background: course.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 56, opacity: 0.5 }}>📐</span>
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", background: PLAN_COLORS[course.plan], padding: "4px 12px", borderRadius: 6 }}>{course.plan}</span>
                  {course.plan === "ТЕГІН" && <span style={{ fontSize: 13, color: "#10B981", fontWeight: 700 }}>Ақысыз!</span>}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20, fontSize: 13, color: "#4B5563" }}>
                  <div>📖 {course.duration}</div>
                  <div>👥 {course.students} оқушы</div>
                  <div>⭐ {course.rating} рейтинг</div>
                  <div>🎓 Сертификат беріледі</div>
                </div>

                <Link href="/auth/signin" style={{ display: "block", width: "100%", padding: "14px", borderRadius: 12, background: "linear-gradient(135deg,#7C3AED,#EC4899)", color: "#fff", fontWeight: 700, fontSize: 15, textAlign: "center", textDecoration: "none", marginBottom: 10 }}>
                  {course.plan === "ТЕГІН" ? "Тегін бастау →" : "Курсқа жазылу →"}
                </Link>
                <Link href="/courses" style={{ display: "block", width: "100%", padding: "12px", borderRadius: 12, border: "1px solid #E5E7EB", color: "#6B7280", fontWeight: 600, fontSize: 14, textAlign: "center", textDecoration: "none" }}>
                  ← Барлық курстар
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 