/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // --- CORES ADICIONADAS PARA DARK MODE ---
        // Fundo principal para o modo escuro (um cinza/azul profundo, melhor que preto puro)
        'dark-bg': '#0f172a', // Slate 900
        
        // Superfícies: Cartões, Modais, Sidebars (um tom acima do fundo)
        'dark-surface': '#1e293b', // Slate 800
        'dark-surface-hover': '#334155', // Slate 700 (para hovers)
        
        // Bordas sutis para separar elementos no escuro
        'dark-border': '#334155', // Slate 700
        
        // Textos para fundo escuro
        'dark-text-primary': '#f8fafc', // Slate 50 (Branco suave)
        'dark-text-secondary': '#cbd5e1', // Slate 300 (Cinza claro para subtítulos)
        'dark-text-muted': '#64748b', // Slate 500 (Texto de apoio)
        //
        accent: '#f3f4f6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        btSuccess: '#006400',
        'text-orange': '#ea5c2f',
        'text-red': '#e31e46',
        'text-lime-green': '#04AD01',
        'background-light-blue': '#f5f8ff',
        'background-dark-blue': '#240046',
        'neutral-dark': '#18273B',
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      aspectRatio: {
        '16/9': '16 / 9',
      },
    },
  },
  plugins: [],
}