"use client";

import { usePaystackPayment } from "react-paystack";

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "pk_test_xxxx";

interface PaystackConfig {
  email: string;
  amount: number; // in kobo (NGN * 100)
  reference: string;
  metadata?: Record<string, string>;
}

interface PaystackPaymentProps {
  config: PaystackConfig;
  onSuccess: (reference: string) => void;
  onClose: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export function PaystackPayment({
  config,
  onSuccess,
  onClose,
  children,
  disabled,
}: PaystackPaymentProps) {
  const initializePayment = usePaystackPayment({
    publicKey: PAYSTACK_PUBLIC_KEY,
    email: config.email,
    amount: config.amount,
    reference: config.reference,
  });

  const handlePayment = () => {
    if (PAYSTACK_PUBLIC_KEY === "pk_test_xxxx") {
      // Demo mode - simulate success
      onSuccess(config.reference);
      return;
    }
    initializePayment({
      onSuccess: (ref) => onSuccess(ref.reference),
      onClose: () => onClose(),
    });
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={disabled}
      className="btn-primary w-full"
    >
      {children}
    </button>
  );
}
