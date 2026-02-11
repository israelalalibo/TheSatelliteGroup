import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return NextResponse.json(
        { error: "Database not configured. Set DATABASE_URL in Vercel environment variables." },
        { status: 503 }
      );
    }
    const db = neon(dbUrl);
    const rows = await db`
      SELECT id, email, full_name, phone, account_type, role, created_at
      FROM users
      ORDER BY created_at DESC
    `;

    const users = rows.map((r) => ({
      id: r.id,
      email: r.email,
      fullName: r.full_name,
      phone: r.phone,
      accountType: r.account_type,
      role: r.role ?? "user",
      createdAt: r.created_at,
    }));

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Admin users fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { userId, role } = body as { userId?: number; role?: string };

    if (!userId || !role) {
      return NextResponse.json({ error: "userId and role are required" }, { status: 400 });
    }
    if (role !== "user" && role !== "admin") {
      return NextResponse.json({ error: "role must be 'user' or 'admin'" }, { status: 400 });
    }

    // Prevent admin from demoting themselves (optional - or allow for multi-admin)
    if (userId === admin.id && role === "user") {
      return NextResponse.json(
        { error: "Cannot demote yourself. Another admin must change your role." },
        { status: 400 }
      );
    }

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return NextResponse.json(
        { error: "Database not configured. Set DATABASE_URL in Vercel environment variables." },
        { status: 503 }
      );
    }
    const db = neon(dbUrl);
    await db`
      UPDATE users SET role = ${role} WHERE id = ${userId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin role update error:", error);
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
  }
}
