import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, fullName, phone, accountType } = body as {
      email?: string;
      password?: string;
      fullName?: string;
      phone?: string;
      accountType?: string;
    };

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const db = neon(process.env.DATABASE_URL!);
    const existing = await db`SELECT id FROM users WHERE email = ${email.toLowerCase()}`;
    if (existing.length > 0) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const rows = await db`
      INSERT INTO users (email, password_hash, full_name, phone, account_type)
      VALUES (${email.toLowerCase()}, ${passwordHash}, ${fullName ?? null}, ${phone ?? null}, ${accountType ?? "individual"})
      RETURNING id, email, full_name, phone, account_type
    `;

    const user = rows[0];
    await createSession(user.id as number);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        phone: user.phone,
        accountType: user.account_type,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
