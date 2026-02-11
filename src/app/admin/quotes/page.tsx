"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Mail, Phone, FileText, ExternalLink } from "lucide-react";

interface QuoteRequest {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  company: string | null;
  service: string;
  quantity: string | null;
  deadline: string | null;
  designStatus: string;
  message: string;
  fileUrl: string | null;
  createdAt: string;
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    fetch("/api/admin/quotes", { credentials: "include", signal: controller.signal })
      .then(async (res) => {
        const text = await res.text();
        let data: { quotes?: unknown[]; error?: string } = {};
        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          throw new Error(res.ok ? "Invalid response" : `Server error (${res.status})`);
        }
        if (!res.ok) {
          throw new Error(data.error || `Failed to fetch quotes (${res.status})`);
        }
        setQuotes(Array.isArray(data.quotes) ? (data.quotes as QuoteRequest[]) : []);
      })
      .catch((e) => setError(e.name === "AbortError" ? "Request timed out. Please try again." : e.message))
      .finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString("en-NG", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return dateStr;
    }
  };

  const formatServiceLabel = (service: string) => {
    return service
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-soft-gray">
      <aside className="fixed left-0 top-0 z-40 h-full w-64 bg-navy text-white">
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <span className="font-heading font-bold">Admin</span>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            Orders
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            Products
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            Users & Roles
          </Link>
          <Link
            href="/admin/quotes"
            className="flex items-center gap-3 rounded-lg bg-red/20 px-4 py-3 font-medium text-red"
          >
            Quote Requests
          </Link>
        </nav>
      </aside>

      <main className="ml-64 p-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/admin" className="hover:text-red">Admin</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Quote Requests</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-2">
          Quote Requests
        </h1>
        <p className="text-charcoal/70 mb-8">
          View and respond to quote requests from potential customers. Use the contact details to get back in touch.
        </p>

        {loading && <p className="text-charcoal/70">Loading quote requests...</p>}
        {error && (
          <div className="rounded-lg border border-red/30 bg-red/10 p-4">
            <p className="font-medium text-red">{error}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fetchQuotes()}
                className="rounded-lg bg-red px-4 py-2 text-sm font-medium text-white hover:bg-red-dark"
              >
                Try again
              </button>
              {error.toLowerCase().includes("access denied") && (
                <Link
                  href="/auth/login?redirect=/admin/quotes"
                  className="rounded-lg border border-red px-4 py-2 text-sm font-medium text-red hover:bg-red/10"
                >
                  Log in again
                </Link>
              )}
            </div>
          </div>
        )}

        {!loading && !error && quotes.length === 0 && (
          <div className="rounded-xl border border-charcoal/10 bg-white p-12 text-center">
            <p className="text-charcoal/70">No quote requests yet</p>
          </div>
        )}

        {!loading && !error && quotes.length > 0 && (
          <div className="space-y-4">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="font-semibold text-navy">{quote.fullName}</h2>
                      <span className="rounded-full bg-charcoal/10 px-2 py-0.5 text-xs font-medium text-charcoal/80">
                        {formatServiceLabel(quote.service)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-charcoal/70">
                      {formatDate(quote.createdAt)}
                    </p>
                    {quote.company && (
                      <p className="mt-1 text-sm text-charcoal/80">Company: {quote.company}</p>
                    )}
                    <p className="mt-2 text-charcoal/80">{quote.message}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-sm">
                      {quote.quantity && (
                        <span className="text-charcoal/70">Qty: {quote.quantity}</span>
                      )}
                      {quote.deadline && (
                        <span className="text-charcoal/70">Deadline: {new Date(quote.deadline).toLocaleDateString("en-NG")}</span>
                      )}
                      <span className="text-charcoal/70">
                        Design: {quote.designStatus === "have" ? "Has design" : "Needs design help"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <a
                      href={`mailto:${quote.email}?subject=Re: Your quote request - ${quote.service}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-red/20 px-4 py-2 font-medium text-red hover:bg-red/30 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                    <a
                      href={`tel:${quote.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-charcoal/20 px-4 py-2 font-medium text-navy hover:bg-soft-gray transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      Call
                    </a>
                    {quote.fileUrl && (
                      <a
                        href={quote.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-charcoal/20 px-4 py-2 font-medium text-navy hover:bg-soft-gray transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        View File
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
