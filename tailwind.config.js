/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          bg: '#0f1f14',
          elevated: '#163020',
          sidebar: '#0b170f',
          text: '#D2E3C8',
          muted: '#B6C7AA',
          deep: '#698474',
          warm: '#F6E6CB',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'Arial', 'sans-serif'],
        sans: ['Questrial', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
