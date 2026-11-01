import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest-dark': '#07190e',
        'forest-base': '#0a2012',
        'forest-card': '#0c2616',
        'forest-card-hover': '#10321e',
        'forest-border': '#1d442a',
        'forest-border-light': '#275836',
        'brand-green': '#2d7a46',
        'brand-green-accent': '#389456',
        'brand-green-light': '#48b86e',
        'sage-mint': '#a3caad',
        'sage-light': '#d1e7d8',
        'sage-bright': '#e8f5ec',
        'gold-amber': '#f3ae29',
        'gold-light': '#f8c764',
        'courage-green': '#2d7a46',
        'courage-gold': '#f3ae29',
        'mint-tint': '#a3caad',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Playfair Display', 'serif'],
        serif: ['var(--font-heading)', 'Playfair Display', 'serif'],
        display: ['var(--font-heading)', 'Playfair Display', 'serif'],
        sans: ['var(--font-sans)', 'DM Sans', 'Montserrat', 'sans-serif'],
        urdu: ['var(--font-urdu)', 'Noto Nastaliq Urdu', 'Playfair Display', 'serif'],
      },
      borderRadius: {
        'pill-eliminated': '12px',
      },
    },
  },
  plugins: [],
};

export default config;
