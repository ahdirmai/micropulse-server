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
        brand: {
          DEFAULT: '#FF7A59',
          50: '#FFF4F0',
          100: '#FFE8DF',
          200: '#FFD1C0',
          300: '#FFB9A0',
          400: '#FF9879',
          500: '#FF7A59',
          600: '#FF5C38',
          700: '#F04420',
          800: '#C23618',
          900: '#8A2711',
        },
        dark: {
          DEFAULT: '#0F1419',
          50: '#2A2F36',
          100: '#1F242A',
          200: '#191E23',
          300: '#14181D',
          400: '#0F1419',
          500: '#0A0D11',
          600: '#060809',
          700: '#020303',
          800: '#000000',
          900: '#000000',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 122, 89, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 122, 89, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
