/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#3B82F6',
        nebula: '#8B5CF6',
        cyan: '#06B6D4',
        void: '#050510',
        space: '#0A0A1A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 15s linear infinite',
        typewriter: 'typewriter 3s steps(40) forwards',
        blink: 'blink 0.75s step-end infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'spin-reverse': {
          to: { transform: 'rotate(-360deg)' },
        },
        typewriter: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 5px #3B82F6',
          },
          '50%': {
            boxShadow: '0 0 25px #3B82F6, 0 0 50px #8B5CF6',
          },
        },
      },
    },
  },
  plugins: [],
};