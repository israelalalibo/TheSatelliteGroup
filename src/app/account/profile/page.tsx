"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface UserData {
  email: string;
  fullName?: string;
  phone?: string;
  accountType?: "individual" | "business";
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [form, setForm] = useState<UserData>({
    email: "",
    fullName: "",
    phone: "",
    accountType: "individual",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("satellite-user");
    if (!stored) {
      router.push("/auth/login");
      return;
    }
    try {
      const parsed = JSON.parse(stored) as UserData;
      setUser(parsed);
      setForm({
        email: parsed.email ?? "",
        fullName: parsed.fullName ?? "",
        phone: parsed.phone ?? "",
        accountType: parsed.accountType ?? "individual",
      });
    } catch {
      router.push("/auth/login");
    }
    setLoading(false);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName || undefined,
          phone: form.phone || undefined,
          accountType: form.accountType,
        }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        localStorage.setItem("satellite-user", JSON.stringify(data.user));
        setUser(data.user);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="animate-pulse rounded-xl bg-soft-gray h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/account" className="hover:text-red">Account</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Profile</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-8">Profile</h1>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-xl rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm"
        >
          {saved && (
            <div className="mb-6 rounded-lg bg-success/10 p-4 text-sm text-success">
              Profile updated successfully.
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="mb-2 block font-medium text-navy">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={form.fullName}
                onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                className="w-full rounded-lg border border-charcoal/20 px-4 py-3 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block font-medium text-navy">
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
                className="w-full rounded-lg border border-charcoal/20 px-4 py-3 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block font-medium text-navy">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full rounded-lg border border-charcoal/20 px-4 py-3 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20"
                placeholder="+234 801 234 5678"
              />
            </div>
            <div>
              <label className="mb-2 block font-medium text-navy">Account Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="accountType"
                    value="individual"
                    checked={form.accountType === "individual"}
                    onChange={() => setForm((f) => ({ ...f, accountType: "individual" }))}
                    className="text-red focus:ring-red"
                  />
                  <span className="text-charcoal/80">Individual</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="accountType"
                    value="business"
                    checked={form.accountType === "business"}
                    onChange={() => setForm((f) => ({ ...f, accountType: "business" }))}
                    className="text-red focus:ring-red"
                  />
                  <span className="text-charcoal/80">Business</span>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
            <Link href="/account" className="btn-secondary">
              Back to Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
