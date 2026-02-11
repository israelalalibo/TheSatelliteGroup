import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const db = neon(process.env.DATABASE_URL!);
    const rows = await db`
      SELECT o.id, o.order_number, o.status, o.items, o.subtotal, o.delivery_fee, o.total,
             o.shipping_address, o.delivery_option, o.payment_method,
             o.receipt_url, o.receipt_uploaded_at, o.created_at,
             u.email, u.full_name
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
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
      customerEmail: r.email,
      customerName: r.full_name,
    }));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Admin orders fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
