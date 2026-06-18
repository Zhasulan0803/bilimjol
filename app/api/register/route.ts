import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { fullName, email, password, phone, role } = await req.json();

  if (!fullName || !email || !password) {
    return NextResponse.json({ error: "Барлық өрістерді толтырыңыз" }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const userId = data.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Тіркелу сәтсіз аяқталды" }, { status: 500 });
  }

  const { error: profileError } = await supabase.from("profiles").insert({
    id: userId,
    full_name: fullName,
    phone: phone ?? null,
    role: role ?? "student",
  });

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, userId });
}
