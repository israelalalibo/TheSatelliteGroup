"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "2348012345678"; // Replace with actual number
const MESSAGE = "Hello! I'd like to inquire about your printing and branding services.";

export function WhatsAppButton() {
  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl md:h-16 md:w-16"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
    </button>
  );
}
