import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const orderNumber = formData.get("orderNumber") as string | null;

    if (!file || !orderNumber) {
      return NextResponse.json({ error: "File and order number are required" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are accepted" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File must be under 5MB" }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(`receipts/${orderNumber}-${Date.now()}.${file.name.split(".").pop()}`, file, {
      access: "public",
    });

    // Update order with receipt URL
    const db = neon(process.env.DATABASE_URL!);
    await db`
      UPDATE orders
      SET receipt_url = ${blob.url}, receipt_uploaded_at = NOW()
      WHERE order_number = ${orderNumber}
    `;

    return NextResponse.json({ url: blob.url, success: true });
  } catch (error) {
    console.error("Receipt upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const orderNumber = req.nextUrl.searchParams.get("orderNumber");
  if (!orderNumber) {
    return NextResponse.json({ error: "Order number required" }, { status: 400 });
  }

  try {
    const db = neon(process.env.DATABASE_URL!);
    const rows = await db`
      SELECT receipt_url, receipt_uploaded_at
      FROM orders WHERE order_number = ${orderNumber}
    `;

    if (rows.length === 0) {
      return NextResponse.json({ uploaded: false });
    }

    return NextResponse.json({
      uploaded: !!rows[0].receipt_url,
      url: rows[0].receipt_url,
      uploadedAt: rows[0].receipt_uploaded_at,
    });
  } catch (error) {
    console.error("Receipt check error:", error);
    return NextResponse.json({ error: "Check failed" }, { status: 500 });
  }
}
