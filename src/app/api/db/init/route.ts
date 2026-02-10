import { NextResponse } from "next/server";
import { initDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await initDatabase();
    return NextResponse.json(result);
  } catch (error) {
    console.error("DB init error:", error);
    return NextResponse.json(
      { error: "Failed to initialize database" },
      { status: 500 }
    );
  }
}
