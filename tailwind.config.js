/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'background-accent': 'var(--color-background-accent)',
        'background-universal': 'var(--color-background-universal)',
        foreground: 'var(--color-foreground)',
        'foreground-accent': 'var(--color-foreground-accent)',
        universal: 'var(--color-universal)',
        'border-universal': 'var(--color-border-universal)',

        'badge-background': 'var(--color-badge-background)',
        'badge-border': 'var(--color-badge-border)',
        'badge-active': 'var(--color-badge-active)',

        'arrow-primary': 'var(--color-arrow-primary)',
        'arrow-secondary': 'var(--color-arrow-secondary)',

        'employee-card-border': 'var(--color-employee-card-border)',

        'input-border': 'var(--color-input-border)',

        'icon-primary': 'var(--color-icon-primary)',
        'icon-secondary': 'var(--color-icon-secondary)',
        'icon-accent': 'var(--color-icon-accent)',
        'icon-bg-universe': 'var(--color-icon-bg-universe)',

        'border-active': 'var(--color-border-active)',
        'border-inactive': 'var(--color-border-inactive)',
      },

      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-500%)' },
        },
      },

      animation: {
        marquee: 'marquee 20s linear infinite',
      },
    },
  },
  plugins: [],
};
