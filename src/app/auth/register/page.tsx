"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType: "individual" as "individual" | "business",
    acceptTerms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!form.acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          fullName: form.fullName,
          phone: form.phone,
          accountType: form.accountType,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }
      localStorage.setItem("satellite-user", JSON.stringify(data.user));
      router.push("/account");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Register</span>
        </nav>

        <div className="mx-auto max-w-md">
          <h1 className="font-heading text-section font-bold text-navy">Create Account</h1>
          <p className="mt-2 text-charcoal/80">Register for exclusive offers and order tracking</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
            {error && (
              <div className="rounded-lg bg-error/10 p-4 text-sm text-error">{error}</div>
            )}
            <div>
              <label htmlFor="fullName" className="mb-2 block font-medium text-navy">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                value={form.fullName}
                onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                required
                className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                placeholder="John Doe"
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
                className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block font-medium text-navy">
                Phone *
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                required
                className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
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
                    checked={form.accountType === "individual"}
                    onChange={() => setForm((f) => ({ ...f, accountType: "individual" }))}
                  />
                  <span>Individual</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="accountType"
                    checked={form.accountType === "business"}
                    onChange={() => setForm((f) => ({ ...f, accountType: "business" }))}
                  />
                  <span>Business</span>
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block font-medium text-navy">
                Password *
              </label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                required
                minLength={6}
                className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                placeholder="Min 6 characters"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block font-medium text-navy">
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                required
                className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
              />
            </div>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={form.acceptTerms}
                onChange={(e) => setForm((f) => ({ ...f, acceptTerms: e.target.checked }))}
                className="mt-1"
              />
              <span className="text-sm text-charcoal/80">
                I agree to the{" "}
                <Link href="/terms" className="text-red hover:underline">Terms & Conditions</Link>{" "}
                and <Link href="/privacy" className="text-red hover:underline">Privacy Policy</Link>
              </span>
            </label>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-charcoal/80">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-red hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
