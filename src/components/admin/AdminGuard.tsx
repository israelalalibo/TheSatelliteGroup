"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "allowed" | "forbidden">("loading");

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.replace("/auth/login?redirect=/admin");
          return;
        }
        if (data.user.role !== "admin") {
          setStatus("forbidden");
          return;
        }
        setStatus("allowed");
      })
      .catch(() => {
        router.replace("/auth/login?redirect=/admin");
      });
  }, [router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-soft-gray">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-charcoal/20 border-t-charcoal" />
          <p className="mt-4 text-charcoal/70">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (status === "forbidden") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-soft-gray">
        <div className="rounded-xl border border-charcoal/10 bg-white p-8 text-center max-w-md">
          <h1 className="font-heading text-xl font-bold text-navy">Access Denied</h1>
          <p className="mt-2 text-charcoal/70">
            You don&apos;t have permission to access the admin area.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-navy px-6 py-2 font-semibold text-white hover:bg-red hover:text-navy"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
