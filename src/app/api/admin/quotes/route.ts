import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: "Access denied. Log in as an admin to view quote requests." },
      { status: 403 }
    );
  }

  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return NextResponse.json(
        { error: "Database not configured." },
        { status: 503 }
      );
    }

    const db = neon(dbUrl);
    const rows = await db`
      SELECT id, full_name, email, phone, company, service, quantity, deadline, design_status, message, file_url, created_at
      FROM quote_requests
      ORDER BY created_at DESC
    `;

    const quotes = rows.map((r) => ({
      id: r.id,
      fullName: r.full_name,
      email: r.email,
      phone: r.phone,
      company: r.company,
      service: r.service,
      quantity: r.quantity,
      deadline: r.deadline,
      designStatus: r.design_status,
      message: r.message,
      fileUrl: r.file_url,
      createdAt: r.created_at,
    }));

    return NextResponse.json({ quotes });
  } catch (error) {
    console.error("Admin quotes fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch quote requests" }, { status: 500 });
  }
}
