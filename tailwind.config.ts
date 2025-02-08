import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        timer: {
          '0%': { width: '100%' },
          '100%': { width: '0%' }
        },
        wiggle: {
          '0%': { transform: 'translateX(-5px)' },
          '25%': { transform: 'translateX(5px)' },
          '50%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
          '100%': { transform: 'translateX(0px)' },
        }
      },
      animation: {
        timer: 'timer 5000ms linear forwards',
        wiggle: 'wiggle 500ms ease-in-out'
      }
    },
  },
  plugins: [],
} satisfies Config;
