import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ productIds: [] });
  }

  try {
    const db = neon(process.env.DATABASE_URL!);
    const rows = await db`
      SELECT product_id FROM wishlists WHERE user_id = ${user.id}
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ productIds: rows.map((r) => r.product_id) });
  } catch (error) {
    console.error("Wishlist fetch error:", error);
    return NextResponse.json({ productIds: [] });
  }
}

export async function POST(req: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { productId } = (await req.json()) as { productId: string };
    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const db = neon(process.env.DATABASE_URL!);

    // Toggle: if exists, remove; if not, add
    const existing = await db`
      SELECT id FROM wishlists WHERE user_id = ${user.id} AND product_id = ${productId}
    `;

    if (existing.length > 0) {
      await db`DELETE FROM wishlists WHERE user_id = ${user.id} AND product_id = ${productId}`;
      return NextResponse.json({ action: "removed", productId });
    } else {
      await db`INSERT INTO wishlists (user_id, product_id) VALUES (${user.id}, ${productId})`;
      return NextResponse.json({ action: "added", productId });
    }
  } catch (error) {
    console.error("Wishlist toggle error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const productId = req.nextUrl.searchParams.get("productId");
  if (!productId) {
    return NextResponse.json({ error: "Product ID required" }, { status: 400 });
  }

  try {
    const db = neon(process.env.DATABASE_URL!);
    await db`DELETE FROM wishlists WHERE user_id = ${user.id} AND product_id = ${productId}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Wishlist delete error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
