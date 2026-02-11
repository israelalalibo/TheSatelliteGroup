import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { getSession } from "@/lib/auth";
import { getProductById } from "@/lib/data/products";
import type { CartItemOption } from "@/lib/types/cart";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ items: [] });
  }

  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return NextResponse.json({ items: [] });
    }

    const db = neon(dbUrl);
    const rows = await db`
      SELECT item_id, product_id, quantity, selected_options, unit_price, design_file
      FROM cart_items
      WHERE user_id = ${user.id}
      ORDER BY created_at ASC
    `;

    const items = [];
    for (const r of rows) {
      const product = getProductById(r.product_id as string);
      if (!product) continue;
      const options = (r.selected_options as CartItemOption[]) || [];
      items.push({
        id: r.item_id,
        product,
        quantity: r.quantity as number,
        selectedOptions: options,
        unitPrice: r.unit_price as number,
        designFile: r.design_file as { name: string; url: string; size: number } | null,
      });
    }

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Cart fetch error:", error);
    return NextResponse.json({ items: [] });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const items = body.items as Array<{
      id: string;
      productId: string;
      quantity: number;
      selectedOptions: CartItemOption[];
      unitPrice: number;
      designFile?: { name: string; url: string; size: number };
    }>;

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid items" }, { status: 400 });
    }

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const db = neon(dbUrl);

    await db`DELETE FROM cart_items WHERE user_id = ${user.id}`;

    for (const item of items) {
      if (!item.id || !item.productId || typeof item.quantity !== "number" || item.quantity < 1) continue;
      await db`
        INSERT INTO cart_items (user_id, item_id, product_id, quantity, selected_options, unit_price, design_file)
        VALUES (
          ${user.id},
          ${item.id},
          ${item.productId},
          ${item.quantity},
          ${JSON.stringify(item.selectedOptions || [])},
          ${item.unitPrice},
          ${item.designFile ? JSON.stringify(item.designFile) : null}
        )
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart sync error:", error);
    return NextResponse.json({ error: "Failed to sync cart" }, { status: 500 });
  }
}
