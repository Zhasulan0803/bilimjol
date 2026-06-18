"use client";
import { useState } from "react";

const TESTS = [
  { id: 1, subject: "Математика", name: "Алгебра негіздері", questions: 20, time: 30, difficulty: "Базалық", color: "#EDE9FE", done: true, score: 85 },
  { id: 2, subject: "Математика", name: "Геометрия", questions: 15, time: 25, difficulty: "Орта", color: "#DBEAFE", done: true, score: 72 },
  { id: 3, subject: "Физика", name: "Механика", questions: 20, time: 30, difficulty: "Орта", color: "#D1FAE5", done: false, score: 0 },
  { id: 4, subject: "Математика", name: "Квадрат теңдеулер", questions: 25, time: 40, difficulty: "Маңызды", color: "#FCE7F3", done: false, score: 0 },
  { id: 5, subject: "Химия", name: "Химиялық реакциялар", questions: 15, time: 20, difficulty: "Базалық", color: "#FEF3C7", done: true, score: 90 },
  { id: 6, subject: "Биология", name: "Жасушалар", questions: 20, time: 30, difficulty: "Базалық", color: "#DBEAFE", done: false, score: 0 },
];

export default function TestsPage() {
  const [activeTest, setActiveTest] = useState<number | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const SAMPLE_QUESTIONS = [
    { q: "2x + 5 = 13 теңдеуін шеш", options: ["x = 3", "x = 4", "x = 5", "x = 6"], correct: 1 },
    { q: "Үшбұрыштың бұрыштарының қосындысы:", options: ["90°", "180°", "270°", "360°"], correct: 1 },
    { q: "√144 = ?", options: ["11", "12", "13", "14"], correct: 1 },
    { q: "3² + 4² = ?", options: ["20", "25", "30", "35"], correct: 1 },
    { q: "Квадраттың периметрі a = 5 болса:", options: ["15", "20", "25", "30"], correct: 1 },
  ];

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (currentQ + 1 >= SAMPLE_QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  const correctCount = answers.filter((a, i) => a === SAMPLE_QUESTIONS[i]?.correct).length;
  const score = Math.round((correctCount / SAMPLE_QUESTIONS.length) * 100);

  if (activeTest !== null) {
    if (finished) {
      return (
        <div style={{ padding: 24, fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
          <div style={{ background: "#fff", borderRadius: 24, padding: 40, textAlign: "center", maxWidth: 400, width: "100%", border: "1px solid #E5E7EB" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{score >= 80 ? "🎉" : score >= 60 ? "👍" : "📚"}</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#1F2937", marginBottom: 8 }}>Тест аяқталды!</h2>
            <div style={{ fontSize: 48, fontWeight: 900, color: score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444", marginBottom: 8 }}>{score}%</div>
            <p style={{ color: "#6B7280", marginBottom: 24 }}>{correctCount}/{SAMPLE_QUESTIONS.length} дұрыс жауап</p>
            <button
              onClick={() => { setActiveTest(null); setCurrentQ(0); setAnswers([]); setFinished(false); }}
              style={{ width: "100%", padding: "14px", borderRadius: 12, background: "linear-gradient(135deg,#7C3AED,#EC4899)", color: "#fff", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", fontFamily: "inherit" }}
            >
              Тесттерге қайту
            </button>
          </div>
        </div>
      );
    }

    const q = SAMPLE_QUESTIONS[currentQ];
    return (
      <div style={{ padding: 24, fontFamily: "Inter, sans-serif" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <button onClick={() => { setActiveTest(null); setCurrentQ(0); setAnswers([]); }} style={{ background: "none", border: "none", color: "#7C3AED", fontWeight: 600, cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>
              ← Шығу
            </button>
            <span style={{ color: "#6B7280", fontSize: 14 }}>{currentQ + 1}/{SAMPLE_QUESTIONS.length}</span>
          </div>

          <div style={{ height: 6, background: "#E5E7EB", borderRadius: 3, marginBottom: 32 }}>
            <div style={{ height: "100%", width: `${((currentQ + 1) / SAMPLE_QUESTIONS.length) * 100}%`, background: "linear-gradient(90deg,#7C3AED,#EC4899)", borderRadius: 3, transition: "width 0.3s" }} />
          </div>

          <div style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #E5E7EB", marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: "#7C3AED", fontWeight: 700, marginBottom: 12 }}>Сұрақ {currentQ + 1}</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1F2937", lineHeight: 1.4 }}>{q.q}</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                style={{ padding: "16px 20px", borderRadius: 12, border: "2px solid #E5E7EB", background: "#fff", textAlign: "left", fontSize: 15, color: "#1F2937", cursor: "pointer", fontFamily: "inherit", fontWeight: 500, transition: "all 0.15s" }}
              >
                <span style={{ color: "#7C3AED", fontWeight: 700, marginRight: 10 }}>{["A", "B", "C", "D"][i]}.</span>
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, fontFamily: "Inter, sans-serif" }}>
      <style>{`
        .tests-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 900px) { .tests-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .tests-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1F2937" }}>Тесттер 📝</h1>
        <p style={{ color: "#6B7280", fontSize: 14, marginTop: 4 }}>Білімді тексер</p>
      </div>

      <div className="tests-grid">
        {TESTS.map(t => (
          <div key={t.id} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #E5E7EB" }}>
            <div style={{ height: 80, background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
              {t.done ? "✅" : "📝"}
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#7C3AED", marginBottom: 4 }}>{t.subject}</div>
              <div style={{ fontWeight: 700, color: "#1F2937", marginBottom: 8, fontSize: 14 }}>{t.name}</div>
              <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#6B7280", marginBottom: 12 }}>
                <span>❓ {t.questions} сұрақ</span>
                <span>⏱ {t.time} мин</span>
              </div>
              {t.done && (
                <div style={{ fontSize: 13, fontWeight: 700, color: t.score >= 80 ? "#10B981" : "#F59E0B", marginBottom: 8 }}>
                  Нәтиже: {t.score}%
                </div>
              )}
              <button
                onClick={() => { setActiveTest(t.id); setCurrentQ(0); setAnswers([]); setFinished(false); }}
                style={{ width: "100%", padding: "10px", borderRadius: 10, border: "none", background: t.done ? "#F3F4F6" : "linear-gradient(135deg,#7C3AED,#EC4899)", color: t.done ? "#374151" : "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
              >
                {t.done ? "Қайта тапсыру" : "Бастау →"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 