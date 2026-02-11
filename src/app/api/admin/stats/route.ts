import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { requireAdmin } from "@/lib/auth";
import { PRODUCTS } from "@/lib/data/products";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const db = neon(process.env.DATABASE_URL!);

    const [ordersResult, usersResult] = await Promise.all([
      db`
        SELECT COUNT(*)::int as count, COALESCE(SUM(total), 0)::int as revenue
        FROM orders
      `,
      db`SELECT COUNT(*)::int as count FROM users`,
    ]);

    const orders = ordersResult[0]?.count ?? 0;
    const revenue = ordersResult[0]?.revenue ?? 0;
    const customers = usersResult[0]?.count ?? 0;
    const products = PRODUCTS.length;

    // Recent orders (last 5)
    const recentOrders = await db`
      SELECT o.id, o.order_number, o.status, o.total, o.created_at,
             u.email, u.full_name
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      LIMIT 5
    `;

    return NextResponse.json({
      orders,
      revenue,
      customers,
      products,
      recentOrders: recentOrders.map((r) => ({
        id: r.id,
        orderNumber: r.order_number,
        status: r.status,
        total: r.total,
        createdAt: r.created_at,
        customerEmail: r.email,
        customerName: r.full_name,
      })),
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
