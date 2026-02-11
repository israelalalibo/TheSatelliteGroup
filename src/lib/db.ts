import { neon } from "@neondatabase/serverless";

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL environment variable is not set");
  return neon(url);
}

/**
 * Lazy accessor — only connects when actually called at runtime,
 * so the build doesn't crash when DATABASE_URL is absent.
 */
export function getSql() {
  return getDb();
}

/** @deprecated Use getSql() for lazy access. Kept for backwards compat. */
export const sql = typeof process !== "undefined" && process.env.DATABASE_URL
  ? getDb()
  : (null as unknown as ReturnType<typeof neon>);

/**
 * Initialize database tables. Call from /api/db/init or on first deploy.
 */
export async function initDatabase() {
  const db = getDb();

  await db`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT,
      phone TEXT,
      account_type TEXT DEFAULT 'individual',
      role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  // Migration: add role column if it doesn't exist (for existing installs)
  try {
    await db`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'`;
  } catch {
    // Column already exists, ignore
  }

  await db`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      user_id INTEGER REFERENCES users(id),
      status TEXT DEFAULT 'pending',
      items JSONB NOT NULL,
      subtotal INTEGER NOT NULL,
      delivery_fee INTEGER NOT NULL,
      total INTEGER NOT NULL,
      shipping_address JSONB NOT NULL,
      delivery_option JSONB NOT NULL,
      payment_method TEXT NOT NULL,
      receipt_url TEXT,
      receipt_uploaded_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await db`
    CREATE TABLE IF NOT EXISTS wishlists (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      product_id TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user_id, product_id)
    )
  `;

  return { success: true };
}
