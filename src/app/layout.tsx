import type { Metadata } from "next";
import { Inter, Outfit, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Satelite Group | Premium Printing & Branding | Asaba, Nigeria",
  description:
    "Transform your brand with premium printing, custom branding, and corporate gifting solutions. Trusted by businesses across Nigeria. Fast delivery, quality guaranteed.",
  keywords: [
    "printing Nigeria",
    "branding Asaba",
    "corporate printing",
    "business cards",
    "flyers",
    "banners",
    "corporate gifts",
    "awards",
  ],
  openGraph: {
    title: "Satelite Group | Premium Printing & Branding",
    description: "Premium printing and branding solutions trusted by businesses across Nigeria",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${plusJakarta.variable} ${playfair.variable}`}
    >
      <body className="font-sans min-h-screen flex flex-col">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
