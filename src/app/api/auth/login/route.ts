import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const db = neon(process.env.DATABASE_URL!);
    const rows = await db`
      SELECT id, email, password_hash, full_name, phone, account_type, role
      FROM users WHERE email = ${email.toLowerCase()}
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash as string);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Bootstrap: if FIRST_ADMIN_EMAIL matches and no admins exist, promote this user
    const firstAdminEmail = process.env.FIRST_ADMIN_EMAIL?.toLowerCase();
    const admins = await db`SELECT id FROM users WHERE role = 'admin'`;
    if (
      firstAdminEmail &&
      (user.email as string).toLowerCase() === firstAdminEmail &&
      admins.length === 0
    ) {
      await db`UPDATE users SET role = 'admin' WHERE id = ${user.id}`;
      user.role = "admin";
    }

    await createSession(user.id as number);

    const role = (user.role as string) === "admin" ? "admin" : "user";
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        phone: user.phone,
        accountType: user.account_type,
        role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
