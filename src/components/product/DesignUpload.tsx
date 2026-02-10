"use client";

import { useState, useRef } from "react";
import { Upload, File, X } from "lucide-react";

const ACCEPTED_FORMATS = "application/pdf,.ai,.psd,image/png,image/jpeg,image/jpg,image/tiff";
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export interface UploadedFile {
  name: string;
  size: number;
  url: string; // For demo, we use object URL
}

interface DesignUploadProps {
  onFileChange?: (file: UploadedFile | null) => void;
  required?: boolean;
}

export function DesignUpload({ onFileChange, required = false }: DesignUploadProps) {
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (f: File): string | null => {
    const validTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/tiff",
    ];
    if (!validTypes.includes(f.type) && !f.name.endsWith(".ai") && !f.name.endsWith(".psd")) {
      return "Please upload PDF, AI, PSD, PNG, JPG, or TIFF files";
    }
    if (f.size > MAX_FILE_SIZE) {
      return "File size must be under 50MB";
    }
    return null;
  };

  const handleFile = (f: File | null) => {
    setError(null);
    if (!f) {
      setFile(null);
      onFileChange?.(null);
      return;
    }
    const err = validateFile(f);
    if (err) {
      setError(err);
      setFile(null);
      onFileChange?.(null);
      return;
    }
    const url = URL.createObjectURL(f);
    const uploaded: UploadedFile = { name: f.name, size: f.size, url };
    setFile(uploaded);
    onFileChange?.(uploaded);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    handleFile(f ?? null);
  };

  const removeFile = () => {
    if (file) URL.revokeObjectURL(file.url);
    setFile(null);
    setError(null);
    onFileChange?.(null);
    inputRef.current?.form?.reset();
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium text-navy">Upload Your Design</label>
      <p className="text-sm text-charcoal/70">
        Accepted: PDF, AI, PSD, PNG, JPG, TIFF (Max 50MB)
      </p>

      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-colors ${
            dragActive
              ? "border-red bg-red/10"
              : "border-charcoal/20 hover:border-red/50 hover:bg-soft-gray"
          }`}
        >
          <Upload className="h-12 w-12 text-charcoal/50" />
          <p className="mt-2 font-medium text-navy">Drag and drop or click to upload</p>
          <p className="mt-1 text-sm text-charcoal/60">Design guidelines</p>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_FORMATS}
            onChange={handleChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-charcoal/20 bg-soft-gray px-4 py-3">
          <div className="flex items-center gap-3">
            <File className="h-8 w-8 text-red" />
            <div>
              <p className="font-medium text-navy">{file.name}</p>
              <p className="text-sm text-charcoal/60">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={removeFile}
            className="rounded-full p-2 text-charcoal/60 hover:bg-white hover:text-error"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {error && <p className="text-sm text-error">{error}</p>}
      <a
        href="#"
        className="text-sm font-medium text-red hover:underline"
      >
        View design guidelines →
      </a>
    </div>
  );
}
