/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '425px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
      '3xl': '1520px',
    },
    extend: {
      boxShadow: {
        customShadow: '0 0 20px 0 rgba(255, 255, 255, 0.7)',
      },
      colors: {
        customBlue1: '#1C7CD4',
        customBlue2: '#005BA1',
        customBlue3: '#2F97FF',
        customBlue4: '#12609F',
        customMint: '#CAFFFC',
        customCyan: '#00FFFF',
        customAqua: '#00F0FF',
        customNavy: '#0B4383',
        customSky: '#3FA6F6',
        customLightBlue: '#C8F2FE',
        customVeryLightBlue: '#E6F5FE',
        customTeal: '#16B3C3',
        customDarkGray: '#323232',
        customDarkBlue: '#006FDE',
        customMediumBlue: '#3C92DD',
        customBrightBlue: '#0D86FF',
        customLightBlue2: '#49B8FD',
      },
    },
  },
  plugins: [],
}