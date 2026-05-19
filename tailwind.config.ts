import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "roboto"],
        heading: ["var(--font-sans)", "roboto"],
      },
      colors: {
        primary: "#000000",
        "on-primary": "#ffffff",
        "primary-container": "#131b2e",
        "on-primary-container": "#7c839b",
        secondary: "#006a61",
        "on-secondary": "#ffffff",
        "secondary-container": "#86f2e4",
        "on-secondary-container": "#006f66",
        background: "#f0fdfa",
        "on-background": "#0d3f38",
        surface: "#f0fdfa",
        "on-surface": "#0d3f38",
        "on-surface-variant": "#3e5c57",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#e5f8f5",
        "surface-container": "#d5f2ec",
        "surface-container-high": "#c5ece4",
        "surface-container-highest": "#b4e6db",
        "surface-dim": "#9cded0",
        "inverse-surface": "#124a41",
        "inverse-on-surface": "#f0fdfa",
        outline: "#739992",
        "outline-variant": "#c6c6cd",
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        "surface-variant": "#d3e4fe",
        "surface-tint": "#565e74",
        "inverse-primary": "#bec6e0",
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      fontSize: {
        "headline-lg": ["34px", { lineHeight: "42px", fontWeight: "700", letterSpacing: "-0.02em" }],
        "headline-lg-mobile": ["30px", { lineHeight: "34px", fontWeight: "700", letterSpacing: "-0.01em" }],
        "headline-md": ["26px", { lineHeight: "34px", fontWeight: "600" }],
        "headline-sm": ["22px", { lineHeight: "30px", fontWeight: "600" }],
        "body-lg": ["20px", { lineHeight: "30px", fontWeight: "400" }],
        "body-md": ["18px", { lineHeight: "26px", fontWeight: "400" }],
        "label-md": ["16px", { lineHeight: "22px", fontWeight: "500", letterSpacing: "0.01em" }],
        "label-sm": ["14px", { lineHeight: "18px", fontWeight: "600" }],
      },
    },
  },
};

export default config;