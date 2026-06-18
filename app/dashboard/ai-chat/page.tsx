"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const SUGGESTIONS = [
  "Квадрат теңдеуді қалай шешемін?",
  "Пифагор теоремасын түсіндір",
  "sin 30° неге тең?",
  "Периметр мен ауданның айырмасы",
  "Олимпиада есебін шығаруға көмектес",
];

export default function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Сәлем! Мен БілімЖол ЖИ кеңесшісімін 🤖\n\nМатематика, физика, химия және басқа пәндер бойынша сұрақтарыңа жауап беремін. Қалай көмектесе аламын?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Кешіріңіз, қате шықты. Қайта көріңіз." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid #E5E7EB", background: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🤖</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#1F2937" }}>ЖИ кеңесші</div>
          <div style={{ fontSize: 12, color: "#10B981", fontWeight: 600 }}>● Онлайн</div>
        </div>
        <span style={{ marginLeft: "auto", background: "#10B981", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 50 }}>NEW</span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px", background: "#F9FAFB", display: "flex", flexDirection: "column", gap: 16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 10 }}>
            {m.role === "assistant" && (
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, marginTop: 2 }}>🤖</div>
            )}
            <div style={{
              maxWidth: "75%", padding: "12px 16px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: m.role === "user" ? "linear-gradient(135deg,#7C3AED,#EC4899)" : "#fff",
              color: m.role === "user" ? "#fff" : "#1F2937",
              fontSize: 14, lineHeight: 1.6,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              whiteSpace: "pre-wrap",
              border: m.role === "assistant" ? "1px solid #E5E7EB" : "none",
            }}>
              {m.text}
            </div>
            {m.role === "user" && (
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14, flexShrink: 0, marginTop: 2 }}>А</div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "18px 18px 18px 4px", padding: "14px 18px", display: "flex", gap: 6, alignItems: "center" }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#7C3AED", animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div style={{ padding: "12px 16px", background: "#F9FAFB", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              style={{ padding: "8px 14px", borderRadius: 50, fontSize: 13, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding: "16px", background: "#fff", borderTop: "1px solid #E5E7EB", display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
          placeholder="Сұрағыңды жаз..."
          disabled={loading}
          style={{ flex: 1, border: "1px solid #E5E7EB", borderRadius: 50, padding: "12px 20px", fontSize: 14, outline: "none", fontFamily: "inherit" }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          style={{ width: 48, height: 48, borderRadius: "50%", border: "none", background: "linear-gradient(135deg,#7C3AED,#EC4899)", color: "#fff", fontSize: 20, cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: loading || !input.trim() ? 0.6 : 1 }}
        >
          ➤
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
} 