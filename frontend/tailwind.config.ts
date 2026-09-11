import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: '#00E5FF',
          dark: '#00B8CC',
        },
        pink: {
          DEFAULT: '#EC4899',
          dark: '#BE185D',
        },
        dark: {
          DEFAULT: '#0B0B0B',
          card: '#1A1A1A',
          secondary: '#111111',
        },
        'border-custom': '#2A2A2A',
      },
    },
  },
  plugins: [],
}
export default config
