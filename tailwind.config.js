/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
      },
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#dce7fb',
          200: '#c2d6f8',
          300: '#9cbcf3',
          400: '#759bee',
          500: '#5578ea',
          600: '#3d58d8',
          700: '#3144b4',
          800: '#2b3b8f',
          900: '#283774',
        },
      },
      boxShadow: {
        card: '0 20px 50px -12px rgba(48, 60, 120, 0.25)',
        input: '0 1px 2px 0 rgba(48, 60, 120, 0.08)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
