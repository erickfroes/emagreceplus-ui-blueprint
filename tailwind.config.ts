import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        primary: {
          50: "#eefdf8",
          100: "#d5f7ed",
          200: "#aeeddc",
          300: "#76ddc3",
          400: "#39c6a3",
          500: "#0EA37A",
          600: "#078967",
          700: "#067056",
          800: "#075946",
          900: "#06493b",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        success: {
          DEFAULT: "#0EA37A",
          soft: "#E8F8F2",
        },
        warning: {
          DEFAULT: "#F59E0B",
          soft: "#FFF7E6",
        },
        danger: {
          DEFAULT: "#EF4444",
          soft: "#FEECEC",
        },
        info: {
          DEFAULT: "#3B82F6",
          soft: "#EAF2FF",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 12px 32px rgba(15, 23, 42, 0.06)",
        soft: "0 4px 18px rgba(15, 23, 42, 0.05)",
        modal: "0 24px 80px rgba(15, 23, 42, 0.18)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-up": { from: { transform: "translateY(8px)", opacity: "0" }, to: { transform: "translateY(0)", opacity: "1" } },
      },
      animation: {
        "fade-in": "fade-in .18s ease-out",
        "slide-up": "slide-up .22s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
