module.exports = {
  mode: "jit",
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    neumorphismFlat: ['responsive'],
    neumorphismConcave: false,
    neumorphismConvex: ['responsive', 'hover'],
    neumorphismInset: ['focus', 'active'],
  },
  plugins: [require('tailwindcss-neumorphism')],
}
