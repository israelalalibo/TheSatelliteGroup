import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const db = neon(process.env.DATABASE_URL!);
    const rows = await db`
      SELECT id, order_number, status, items, subtotal, delivery_fee, total,
             shipping_address, delivery_option, payment_method,
             receipt_url, receipt_uploaded_at, created_at
      FROM orders
      WHERE user_id = ${user.id}
      ORDER BY created_at DESC
    `;

    const orders = rows.map((r) => ({
      id: r.id,
      orderNumber: r.order_number,
      status: r.status,
      items: r.items,
      subtotal: r.subtotal,
      deliveryFee: r.delivery_fee,
      total: r.total,
      shippingAddress: r.shipping_address,
      deliveryOption: r.delivery_option,
      paymentMethod: r.payment_method,
      receiptUrl: r.receipt_url,
      receiptUploadedAt: r.receipt_uploaded_at,
      createdAt: r.created_at,
    }));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getSession();

  try {
    const body = await req.json();
    const {
      orderNumber,
      items,
      subtotal,
      deliveryFee,
      total,
      shippingAddress,
      deliveryOption,
      paymentMethod,
    } = body;

    if (!orderNumber || !items || !shippingAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = neon(process.env.DATABASE_URL!);
    const rows = await db`
      INSERT INTO orders (order_number, user_id, items, subtotal, delivery_fee, total, shipping_address, delivery_option, payment_method)
      VALUES (
        ${orderNumber},
        ${user?.id ?? null},
        ${JSON.stringify(items)},
        ${subtotal},
        ${deliveryFee},
        ${total},
        ${JSON.stringify(shippingAddress)},
        ${JSON.stringify(deliveryOption)},
        ${paymentMethod}
      )
      RETURNING id, order_number, status, created_at
    `;

    return NextResponse.json({
      order: {
        id: rows[0].id,
        orderNumber: rows[0].order_number,
        status: rows[0].status,
        createdAt: rows[0].created_at,
      },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
