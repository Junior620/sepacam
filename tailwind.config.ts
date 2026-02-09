import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // SEPACAM Brand Colors
                "sepacam-green": {
                    light: "#4a7a2c",
                    DEFAULT: "#2d5016",
                    dark: "#1a3009",
                },
                "sepacam-gold": {
                    light: "#e5c158",
                    DEFAULT: "#d4af37",
                    dark: "#b8941f",
                },
                "sepacam-grey": {
                    light: "#9ca3af",
                    DEFAULT: "#6b7280",
                    dark: "#4b5563",
                },
                // Primary - SEPACAM Green
                primary: {
                    DEFAULT: "#2d5016",
                    light: "#4a7a2c",
                    dark: "#1a3009",
                    50: "#f0f7ec",
                    100: "#dfefd5",
                    200: "#c0dfab",
                    300: "#98c978",
                    400: "#6eb04c",
                    500: "#4a7a2c",
                    600: "#2d5016",
                    700: "#244012",
                    800: "#1a3009",
                    900: "#102006",
                },
                // Accent - SEPACAM Gold
                accent: {
                    DEFAULT: "#d4af37",
                    light: "#e5c158",
                    dark: "#b8941f",
                    50: "#fdf9ed",
                    100: "#f9f0d0",
                    200: "#f3e1a1",
                    300: "#edd072",
                    400: "#e5c158",
                    500: "#d4af37",
                    600: "#c19a28",
                    700: "#a17d1f",
                    800: "#846519",
                    900: "#6c5214",
                },
                // Neutrals - SEPACAM Grey
                neutral: {
                    50: "#FAFAFA",
                    100: "#F5F5F5",
                    200: "#E5E5E5",
                    300: "#d1d5db",
                    400: "#9ca3af",
                    500: "#6b7280",
                    600: "#4b5563",
                    700: "#374151",
                    800: "#1f2937",
                    900: "#111827",
                    950: "#030712",
                },
                // Semantic
                error: {
                    DEFAULT: "#DC2626",
                    light: "#FEE2E2",
                    dark: "#B91C1C",
                },
                success: {
                    DEFAULT: "#16A34A",
                    light: "#DCFCE7",
                    dark: "#15803D",
                },
                warning: {
                    DEFAULT: "#F59E0B",
                    light: "#FEF3C7",
                    dark: "#D97706",
                },
                // Dark mode surfaces
                surface: {
                    dark: "#151D18",
                    "dark-hover": "#1D2721",
                },
                background: {
                    dark: "#0A0F0C",
                },
                border: {
                    dark: "#2A3D31",
                },
            },
            fontFamily: {
                heading: ["var(--font-outfit)", "system-ui", "sans-serif"],
                body: ["var(--font-inter)", "system-ui", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            fontSize: {
                display: ["4rem", { lineHeight: "1.1", fontWeight: "700" }],
                "display-sm": ["3rem", { lineHeight: "1.15", fontWeight: "700" }],
                h1: ["3rem", { lineHeight: "1.2", fontWeight: "700" }],
                "h1-sm": ["2.25rem", { lineHeight: "1.25", fontWeight: "700" }],
                h2: ["2.25rem", { lineHeight: "1.25", fontWeight: "600" }],
                "h2-sm": ["1.875rem", { lineHeight: "1.3", fontWeight: "600" }],
                h3: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
                h4: ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
                body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
                small: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
                xs: ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
            },
            spacing: {
                "18": "4.5rem",
                "22": "5.5rem",
                "26": "6.5rem",
                "30": "7.5rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
            boxShadow: {
                "elevation-1": "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)",
                "elevation-2": "0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)",
                "elevation-3": "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
                "elevation-4": "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)",
                "glow-primary": "0 0 20px rgba(27, 94, 59, 0.3)",
                "glow-accent": "0 0 20px rgba(212, 168, 83, 0.3)",
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out",
                "slide-up": "slideUp 0.5s ease-out",
                "slide-down": "slideDown 0.3s ease-out",
                "scale-in": "scaleIn 0.2s ease-out",
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            backgroundImage: {
                "dots-pattern": "radial-gradient(#2d5016 1px, transparent 1px)",
            },
            backgroundSize: {
                "dots-pattern": "24px 24px",
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
                slideDown: {
                    "0%": { opacity: "0", transform: "translateY(-10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                scaleIn: {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
            },
            transitionDuration: {
                "400": "400ms",
            },
            zIndex: {
                "60": "60",
                "70": "70",
                "80": "80",
                "90": "90",
                "100": "100",
            },
        },
    },
    plugins: [],
};

export default config;
