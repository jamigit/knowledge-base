/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(205, 85%, 55%)',
          light: 'hsl(205, 75%, 65%)',
          dark: 'hsl(205, 95%, 45%)',
          50: 'hsl(205, 85%, 95%)',
          100: 'hsl(205, 85%, 90%)',
          200: 'hsl(205, 85%, 80%)',
          300: 'hsl(205, 85%, 70%)',
          400: 'hsl(205, 85%, 60%)',
          500: 'hsl(205, 85%, 55%)',
          600: 'hsl(205, 85%, 50%)',
          700: 'hsl(205, 85%, 45%)',
          800: 'hsl(205, 85%, 40%)',
          900: 'hsl(205, 85%, 35%)',
        },
        surface: {
          DEFAULT: 'hsl(220, 15%, 8%)',
          light: 'hsl(220, 15%, 12%)',
          lighter: 'hsl(220, 15%, 16%)',
          lightest: 'hsl(220, 15%, 20%)',
        },
        text: {
          primary: 'hsl(220, 15%, 90%)',
          secondary: 'hsl(220, 10%, 55%)',
          muted: 'hsl(220, 10%, 45%)',
        },
        success: {
          DEFAULT: 'hsl(140, 70%, 45%)',
          light: 'hsl(140, 70%, 55%)',
          dark: 'hsl(140, 70%, 35%)',
        },
        warning: {
          DEFAULT: 'hsl(35, 85%, 55%)',
          light: 'hsl(35, 85%, 65%)',
          dark: 'hsl(35, 85%, 45%)',
        },
        error: {
          DEFAULT: 'hsl(0, 70%, 55%)',
          light: 'hsl(0, 70%, 65%)',
          dark: 'hsl(0, 70%, 45%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Source Serif Pro', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'skeleton-pulse': 'skeletonPulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        skeletonPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}