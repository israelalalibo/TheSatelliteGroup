import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { fullName, phone, accountType } = body as {
      fullName?: string;
      phone?: string;
      accountType?: string;
    };

    const db = neon(process.env.DATABASE_URL!);
    const rows = await db`
      UPDATE users
      SET full_name = ${fullName ?? user.fullName},
          phone = ${phone ?? user.phone},
          account_type = ${accountType ?? user.accountType}
      WHERE id = ${user.id}
      RETURNING id, email, full_name, phone, account_type
    `;

    const u = rows[0];
    return NextResponse.json({
      user: {
        id: u.id,
        email: u.email,
        fullName: u.full_name,
        phone: u.phone,
        accountType: u.account_type,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
