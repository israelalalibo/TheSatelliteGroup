import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

const ACCEPTED_FILE_TYPES = [".pdf", ".ai", ".psd", ".png", ".jpg", ".jpeg"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return NextResponse.json(
        { error: "Database not configured. Please try again later." },
        { status: 503 }
      );
    }

    const formData = await req.formData();
    const fullName = formData.get("fullName") as string | null;
    const email = formData.get("email") as string | null;
    const phone = formData.get("phone") as string | null;
    const company = (formData.get("company") as string | null) || null;
    const service = formData.get("service") as string | null;
    const quantity = (formData.get("quantity") as string | null) || null;
    const deadline = (formData.get("deadline") as string | null) || null;
    const designStatus = formData.get("designStatus") as string | null;
    const message = formData.get("message") as string | null;
    const file = formData.get("file") as File | null;

    if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !service?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Full name, email, phone, service, and message are required." },
        { status: 400 }
      );
    }

    if (!designStatus || !["have", "need"].includes(designStatus)) {
      return NextResponse.json(
        { error: "Invalid design status." },
        { status: 400 }
      );
    }

    let fileUrl: string | null = null;

    if (file && file.size > 0) {
      const ext = "." + (file.name.split(".").pop()?.toLowerCase() || "");
      if (!ACCEPTED_FILE_TYPES.includes(ext)) {
        return NextResponse.json(
          { error: "File type not allowed. Use PDF, AI, PSD, PNG, or JPG." },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "File must be under 10MB." },
          { status: 400 }
        );
      }

      if (process.env.BLOB_READ_WRITE_TOKEN) {
        try {
          const blob = await put(
            `quote-files/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
            file,
            { access: "public" }
          );
          fileUrl = blob.url;
        } catch (err) {
          console.error("Quote file upload error:", err);
          // Continue without file - don't fail the whole request
        }
      }
    }

    const db = neon(dbUrl);
    const parsedDeadline = deadline ? new Date(deadline).toISOString().split("T")[0] : null;

    await db`
      INSERT INTO quote_requests (full_name, email, phone, company, service, quantity, deadline, design_status, message, file_url)
      VALUES (${fullName.trim()}, ${email.trim()}, ${phone.trim()}, ${company?.trim() || null}, ${service.trim()}, ${quantity}, ${parsedDeadline}, ${designStatus}, ${message.trim()}, ${fileUrl})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit quote request. Please try again." },
      { status: 500 }
    );
  }
}
