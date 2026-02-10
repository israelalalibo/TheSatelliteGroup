"use client";

import { useState } from "react";
import { Upload, CheckCircle2, Building2 } from "lucide-react";

const BANK_DETAILS = {
  bankName: "First Bank of Nigeria",
  accountName: "Satellite Group Ltd",
  accountNumber: "2012345678",
  sortCode: "011",
};

export function ReceiptUpload({ orderNumber }: { orderNumber: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    setError("");
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, etc.)");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("File must be under 5MB");
      return;
    }
    setFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file first");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("orderNumber", orderNumber);
      const res = await fetch("/api/receipts", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed. Please try again.");
        return;
      }
      setUploaded(true);
      setFile(null);
    } catch {
      setError("Failed to upload. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-8 rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
      <h2 className="font-heading text-lg font-bold text-navy">Bank Transfer Details</h2>
      <p className="mt-2 text-sm text-charcoal/70">
        Payments in Nigeria are primarily made via bank transfer. Please transfer the order total to:
      </p>
      <div className="mt-4 rounded-lg bg-soft-gray p-4 font-mono text-sm">
        <div className="flex items-center gap-2 text-navy">
          <Building2 className="h-4 w-4" />
          <span className="font-semibold">{BANK_DETAILS.bankName}</span>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div>
            <span className="text-charcoal/60">Account Name</span>
            <p className="font-medium">{BANK_DETAILS.accountName}</p>
          </div>
          <div>
            <span className="text-charcoal/60">Account Number</span>
            <p className="font-mono font-bold text-red">{BANK_DETAILS.accountNumber}</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-charcoal/60">
          Use your order number <strong>{orderNumber}</strong> as the transfer reference.
        </p>
      </div>

      <h3 className="mt-6 font-heading font-semibold text-navy">Upload Payment Receipt</h3>
      <p className="mt-1 text-sm text-charcoal/70">
        After making the transfer, upload a screenshot or photo of your payment confirmation so we can verify and process your order.
      </p>

      {uploaded ? (
        <div className="mt-4 flex items-center gap-3 rounded-lg bg-success/10 p-4 text-success">
          <CheckCircle2 className="h-6 w-6 shrink-0" />
          <div>
            <p className="font-medium">Receipt uploaded successfully</p>
            <p className="text-sm opacity-90">We&apos;ll confirm your payment and start processing your order shortly.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-charcoal/20 px-6 py-8 transition-colors hover:border-red/50 hover:bg-soft-gray/50">
              <Upload className="h-10 w-10 text-charcoal/60" />
              <span className="text-sm font-medium text-navy">
                {file ? file.name : "Click to select receipt (image)"}
              </span>
              <span className="text-xs text-charcoal/60">JPG, PNG, max 5MB</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <button
            type="submit"
            disabled={!file || uploading}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Receipt"}
          </button>
        </form>
      )}
    </div>
  );
}
