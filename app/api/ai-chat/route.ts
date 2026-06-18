import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        messages: [{ role: "user", content: message }],
        system: "Сен БілімЖол платформасының ЖИ кеңесшісісің. Қазақстандық мектеп оқушыларына (5-10 сынып) математика, физика, химия, биология және басқа пәндер бойынша көмектесесің. Барлық жауаптарды қазақ тілінде бер. Түсінікті, қысқа және нақты жауап бер. Формулаларды жақша ішінде жаз.",
      }),
    });

    const data = await res.json();
    const reply = data.content?.[0]?.text || "Кешіріңіз, жауап алу мүмкін болмады.";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Сервер қатесі. Қайта көріңіз." }, { status: 500 });
  }
} 