import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--page)",
        surface: "var(--panel)",
        border: "var(--line)",
        "neon-blue": "#2997ff",
        "neon-purple": "#7b2fff",
        "neon-green": "#30d158",
        "text-primary": "var(--text)",
        "text-secondary": "var(--text-soft)",
        page: "var(--page)",
        panel: "var(--panel)",
        "panel-2": "var(--panel-2)",
        line: "var(--line)",
        moss: "var(--accent)",
        sky: "var(--accent-blue-soft)",
        violet: "#af52de",
        amber: "#ffd60a",
        coral: "#ff6b35",
        pink: "#ff2d9b",
        yellow: "#ffd700"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      boxShadow: {
        "neon-blue": "0 18px 46px rgba(41,151,255,0.24)",
        "neon-purple": "0 14px 34px rgba(175,82,222,0.15)",
        "neon-green": "0 14px 34px rgba(48,209,88,0.18)",
        "panel-glow": "0 36px 110px rgba(0,0,0,0.48)"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 50% -10%, rgba(41,151,255,0.28), transparent 32rem), linear-gradient(180deg, #050506 0%, #000000 100%)"
      },
      borderRadius: {
        panel: "24px"
      },
      maxWidth: {
        shell: "1180px"
      }
    }
  },
  plugins: []
};

export default config;
