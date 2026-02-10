import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";

function getDb() {
  return neon(process.env.DATABASE_URL!);
}

export interface SessionUser {
  id: number;
  email: string;
  fullName: string | null;
  phone: string | null;
  accountType: string;
}

/**
 * Simple token-based session. In production, use a signed JWT or NextAuth.
 * For now we store user ID in an httpOnly cookie.
 */
export async function createSession(userId: number): Promise<string> {
  const token = `sg_${userId}_${Date.now().toString(36)}`;
  const cookieStore = await cookies();
  cookieStore.set("sg-session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
  return token;
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("sg-session");
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("sg-session")?.value;
  if (!token) return null;

  const parts = token.split("_");
  if (parts.length < 3) return null;
  const userId = parseInt(parts[1], 10);
  if (isNaN(userId)) return null;

  try {
    const db = getDb();
    const rows = await db`
      SELECT id, email, full_name, phone, account_type
      FROM users WHERE id = ${userId}
    `;
    if (rows.length === 0) return null;
    const u = rows[0];
    return {
      id: u.id as number,
      email: u.email as string,
      fullName: u.full_name as string | null,
      phone: u.phone as string | null,
      accountType: (u.account_type as string) ?? "individual",
    };
  } catch {
    return null;
  }
}
