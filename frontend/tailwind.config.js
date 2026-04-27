/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:       '#1F6F5F',
        'primary-dark':'#164f45',
        'primary-light':'#e6f4f1',
        accent:        '#2FA084',
        'accent-light':'#6FCF97',
        gold:          '#c8a84b',
        dark:          '#0d2420',
        'gray-bg':     '#f4faf8',
      },
      fontFamily: {
        sans:    ['DM Sans', 'sans-serif'],
        heading: ['Sora', 'sans-serif'],
      },
      animation: {
        'fade-up':  'fadeUp 0.6s ease forwards',
        'fade-in':  'fadeIn 0.4s ease forwards',
        'ticker':   'ticker 30s linear infinite',
        'pulse-slow':'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:  { '0%':{ opacity:0, transform:'translateY(24px)' }, '100%':{ opacity:1, transform:'translateY(0)' } },
        fadeIn:  { '0%':{ opacity:0 }, '100%':{ opacity:1 } },
        ticker:  { '0%':{ transform:'translateX(0)' }, '100%':{ transform:'translateX(-50%)' } },
      },
      boxShadow: {
        'green': '0 4px 24px rgba(31,111,95,0.18)',
        'green-lg': '0 8px 48px rgba(31,111,95,0.22)',
      }
    },
  },
  plugins: [],
}
