/** @type {import('tailwindcss').Config} */

// "Violet Aurora" — a premium, professional palette (indigo-violet + cyan).
const brand = {
  blue: '#7C5CFF', // primary indigo-violet
  'blue-dark': '#5B3DF5', // deep primary
  accent: '#22D3EE', // cyan accent
  accent2: '#F472B6', // soft pink for multi-stop gradients
  navy: '#15132B', // deep indigo ink (text + dark surfaces)
  dark: '#0A0917', // page background in dark mode
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand,
        // Backwards-compatible alias so existing `moto-*` classes adopt the new theme.
        moto: brand,
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Sora', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        script: ['Dancing Script', 'Segoe Script', 'cursive'],
      },
      backgroundImage: {
        aurora:
          'radial-gradient(at 20% 20%, rgba(124,92,255,0.55) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(34,211,238,0.45) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(244,114,182,0.40) 0px, transparent 50%)',
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(124,92,255,0.55)',
        'glow-accent': '0 0 40px -8px rgba(34,211,238,0.55)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        aurora: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(40px,-30px,0) scale(1.15)' },
          '66%': { transform: 'translate3d(-30px,20px,0) scale(0.9)' },
          '100%': { transform: 'translate3d(0,0,0) scale(1)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%' },
          '33%': { borderRadius: '70% 30% 46% 54% / 30% 60% 40% 70%' },
          '66%': { borderRadius: '34% 66% 32% 68% / 63% 34% 66% 37%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'text-shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'letter-up': {
          '0%': { opacity: '0', transform: 'translateY(1.1em) rotate(6deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(0)' },
        },
        ring: {
          '0%': { transform: 'scale(0.4)', opacity: '0.8' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
        'reveal-blur': {
          '0%': { opacity: '0', filter: 'blur(16px)', transform: 'scale(1.08)' },
          '100%': { opacity: '1', filter: 'blur(0)', transform: 'scale(1)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(0.85)' },
          '50%': { opacity: '0.9', transform: 'scale(1.15)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        aurora: 'aurora 18s ease-in-out infinite',
        'aurora-slow': 'aurora 26s ease-in-out infinite',
        blob: 'blob 12s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'text-shimmer': 'text-shimmer 6s ease infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
        'pulse-glow': 'pulse-glow 5s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 2.5s ease-in-out infinite',
        marquee: 'marquee 22s linear infinite',
        'letter-up': 'letter-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        ring: 'ring 1.8s ease-out infinite',
        'reveal-blur': 'reveal-blur 1s ease-out both',
        twinkle: 'twinkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
