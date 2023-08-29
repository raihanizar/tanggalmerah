/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'orange': '#f54f29',
      'ivory': '#fcf6e5',
      'shadeivory': '#ebe6d6',
      'darkivory': '#727068',
      'black': '#1c1c1c',
      'violet': '#8b5cf6',
      'darkviolet': '#5f3fa9'
    },
    extend: {
      fontSize: {
        'xxs': '0.6rem'
      }
    }
  },
  plugins: [],
}
