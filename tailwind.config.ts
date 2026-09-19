import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'], // Disable automatic dark mode detection
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'courage-green': '#1A6B3C',
        'courage-gold': '#F3AE29',
        'off-white': '#F4F1EB',
        'mint-tint': '#A8D5B5',
        'deep-sapphire': '#2C3E6B',
        'deep-navy': '#1A1A2E',
      },
      fontFamily: {
        heading: ['var(--font-display)', 'Playfair Display', 'serif'],
        body: ['var(--font-body)', 'Montserrat', 'sans-serif'],
        display: ['var(--font-display)', 'Playfair Display', 'serif'],
        sans: ['var(--font-body)', 'Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
