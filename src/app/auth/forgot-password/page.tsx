"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-md text-center">
            <h1 className="font-heading text-section font-bold text-navy">
              Check Your Email
            </h1>
            <p className="mt-4 text-charcoal/80">
              If an account exists for {email}, you&apos;ll receive password reset instructions.
            </p>
            <Link href="/auth/login" className="btn-primary mt-8 inline-flex">
              Back to Login
            </Link>
          </div>
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
          <Link href="/auth/login" className="hover:text-red">Login</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Forgot Password</span>
        </nav>

        <div className="mx-auto max-w-md">
          <h1 className="font-heading text-section font-bold text-navy">
            Forgot Password
          </h1>
          <p className="mt-2 text-charcoal/80">
            Enter your email and we&apos;ll send you reset instructions.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
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
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-charcoal/80">
            <Link href="/auth/login" className="font-medium text-red hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
