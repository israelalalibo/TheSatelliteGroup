"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/account";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid email or password");
        return;
      }
      localStorage.setItem("satellite-user", JSON.stringify(data.user));
      window.location.href = redirectTo.startsWith("/") ? redirectTo : "/account";
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
          <span className="text-navy">Login</span>
        </nav>

        <div className="mx-auto max-w-md">
          <h1 className="font-heading text-section font-bold text-navy">Login</h1>
          <p className="mt-2 text-charcoal/80">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
            {error && (
              <div className="rounded-lg bg-error/10 p-4 text-sm text-error">{error}</div>
            )}
            <div>
              <label htmlFor="email" className="mb-2 block font-medium text-navy">
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block font-medium text-navy">
                Password *
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-charcoal/80">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm font-medium text-red hover:underline">
                Forgot password?
              </Link>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-charcoal/80">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-medium text-red hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
