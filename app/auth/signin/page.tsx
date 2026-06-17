"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", grade: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    if (mode === "register") {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }
    }

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email немесе құпия сөз қате");
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg,#4C1D95,#7C3AED)" }}>
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center text-white font-black text-xl" style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)" }}>Б</div>
          <h1 className="text-2xl font-black text-gray-900">БілімЖол</h1>
          <p className="text-gray-500 text-sm mt-1">
            {mode === "login" ? "Аккаунтыңа кір" : "Тегін тіркел"}
          </p>
        </div>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === m ? "bg-white shadow text-purple-700" : "text-gray-500"}`}
            >
              {m === "login" ? "Кіру" : "Тіркелу"}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {mode === "register" && (
            <input
              placeholder="Аты-жөні"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          )}
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            placeholder="Құпия сөз"
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          {mode === "register" && (
            <select
              value={form.grade}
              onChange={e => setForm({ ...form, grade: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-600"
            >
              <option value="">Сыныпты таңда</option>
              {[5,6,7,8,9,10].map(g => (
                <option key={g} value={g}>{g}-сынып</option>
              ))}
            </select>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-5 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 disabled:opacity-60"
          style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)" }}
        >
          {loading ? "Жүктелуде..." : mode === "login" ? "Кіру" : "Тіркелу — тегін"}
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          <Link href="/" className="hover:text-purple-600">← Басты бетке қайту</Link>
        </p>
      </div>
    </div>
  );
} 