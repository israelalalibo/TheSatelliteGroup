import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1628",
          dark: "#050d18",
          light: "#0f2847",
        },
        red: {
          DEFAULT: "#DC2626",
          light: "#EF4444",
          dark: "#B91C1C",
        },
        orange: {
          DEFAULT: "#FF6B35",
          light: "#ff8c5a",
          dark: "#e55a28",
        },
        charcoal: "#1A1A2E",
        "soft-gray": "#F8F9FA",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        heading: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        accent: ["var(--font-playfair)", "Georgia", "serif"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      maxWidth: {
        container: "1280px",
      },
      fontSize: {
        "hero": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1" }],
        "section": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.2" }],
        "sub": ["clamp(1.25rem, 2vw, 2rem)", { lineHeight: "1.3" }],
      },
      backgroundImage: {
        "gradient-navy": "linear-gradient(135deg, #0A1628 0%, #050d18 100%)",
        "gradient-red": "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
        "gradient-hero": "linear-gradient(135deg, rgba(10, 22, 40, 0.95) 0%, rgba(5, 13, 24, 0.9) 100%)",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        "card-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.2)",
        "red-glow": "0 0 30px rgba(220, 38, 38, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
