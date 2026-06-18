import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Public client for auth.signUp (uses anon key)
const anonClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Admin client for profile update (bypasses RLS)
const adminClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

export async function POST(req: Request) {
  const { fullName, email, password, phone } = await req.json();

  if (!fullName || !email || !password) {
    return NextResponse.json({ error: "Барлық өрістерді толтырыңыз" }, { status: 400 });
  }

  const { data, error } = await anonClient.auth.signUp({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const userId = data.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Тіркелу сәтсіз аяқталды" }, { status: 500 });
  }

  // Use service role to update profile (trigger may not have run yet,
  // so use upsert to cover both cases)
  const { error: profileError } = await adminClient()
    .from("profiles")
    .upsert({ id: userId, full_name: fullName, phone: phone ?? null, role: "student" });

  if (profileError) {
    console.error("Profile upsert error:", profileError.message);
    return NextResponse.json({ error: "Профиль сақталмады: " + profileError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, userId });
}
