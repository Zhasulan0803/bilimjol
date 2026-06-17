import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { name, email, password, grade } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Барлық өрістерді толтырыңыз" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Бұл email тіркелген" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        grade: grade ? parseInt(grade) : null,
      },
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Сервер қатесі" },
      { status: 500 }
    );
  }
} 