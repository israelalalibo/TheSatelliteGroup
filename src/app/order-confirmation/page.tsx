"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Package, Mail, Phone } from "lucide-react";
import { ReceiptUpload } from "@/components/checkout/ReceiptUpload";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") ?? "SG-XXXXXX";
  const method = searchParams.get("method");
  const showReceiptUpload = method === "transfer";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-success/20 text-success">
        <CheckCircle2 className="h-16 w-16" />
      </div>
      <h1 className="mt-6 font-heading text-section font-bold text-navy">
        Order Placed Successfully!
      </h1>
      <p className="mt-4 text-charcoal/80">
        Thank you for your order. We&apos;ll send you a confirmation email shortly.
      </p>
      <div className="mt-8 rounded-xl border border-charcoal/10 bg-soft-gray p-6 text-center">
        <p className="text-sm font-medium text-charcoal/70">Order Number</p>
        <p className="mt-2 font-heading text-2xl font-bold text-red">{orderNumber}</p>
      </div>

      {showReceiptUpload && <ReceiptUpload orderNumber={orderNumber} />}

      <div className="mt-8 space-y-4 text-left">
        <h2 className="font-heading text-lg font-bold text-navy">What happens next?</h2>
        <ul className="space-y-3 text-charcoal/80">
          <li className="flex items-start gap-3">
            <Mail className="h-5 w-5 shrink-0 text-red" />
            <span>You&apos;ll receive an order confirmation email with details</span>
          </li>
          <li className="flex items-start gap-3">
            <Package className="h-5 w-5 shrink-0 text-red" />
            <span>We&apos;ll start processing your order within 24 hours</span>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="h-5 w-5 shrink-0 text-red" />
            <span>Our team may contact you for any design clarifications</span>
          </li>
        </ul>
      </div>
      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center text-center">
        <Link href="/track-order" className="btn-primary">
          Track Order
        </Link>
        <Link href="/products" className="btn-secondary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <Suspense
          fallback={
            <div className="mx-auto max-w-2xl animate-pulse rounded-xl bg-soft-gray h-64" />
          }
        >
          <OrderConfirmationContent />
        </Suspense>
      </div>
    </div>
  );
}
