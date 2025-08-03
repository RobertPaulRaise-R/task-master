/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode via the `dark` class
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust paths for your project
  ],
  theme: {
    extend: {
      colors: {
        light: {
          50: 'var(--color-light-50)',
          100: 'var(--color-light-100)',
          200: 'var(--color-light-200)',
          300: 'var(--color-light-300)',
          400: 'var(--color-light-400)',
          500: 'var(--color-light-500)',
          600: 'var(--color-light-600)',
          700: 'var(--color-light-700)',
          800: 'var(--color-light-800)',
          900: 'var(--color-light-900)',
          950: 'var(--color-light-950)',
        },
        brand: {
          50: 'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
          950: 'var(--color-brand-950)',
        },
        // Uncomment to use alternative brand colors
        // brand: {
        //   50: '#eff5ff',
        //   100: '#dbe8fe',
        //   ...
        // },
        primary: '#3B82F6',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        high: '#EF4444',
        medium: '#F59E0B',
        low: '#10B981',
      },
      backgroundColor: {
        sidebar: 'hsl(var(--sidebar-background))',
      },
      textColor: {
        sidebar: 'hsl(var(--sidebar-foreground))',
      },
      borderColor: {
        sidebar: 'hsl(var(--sidebar-border))',
      },
      ringColor: {
        sidebar: 'hsl(var(--sidebar-ring))',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'orange-10-gradient': 'linear-gradient(to bottom right, #f97316 10%, #171717 100%)',
      },
    },
  },
  plugins: [],
};
