/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#090D16',
        surface: '#111827',
        border: 'rgba(255, 255, 255, 0.1)',
        primary: {
          500: '#6366F1',
          600: '#4F46E5',
        },
        accent: {
          purple: '#8B5CF6',
          blue: '#3B82F6',
          red: '#EF4444',
          green: '#10B981',
          amber: '#F59E0B',
        }
      }
    },
  },
  plugins: [],
}
