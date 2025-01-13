module.exports = {
   darkMode: ['class'],
   content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         colors: {
            primary: {
               50: '#e3e9f9',
               100: '#e7ecf0',
               200: '#a3b7e6',
               300: '#7595d8',
               400: '#5273c9',
               500: '#5e72c1',
               600: '#3063ab',
               700: '#2b528c',
               800: '#1f4175',
               900: '#1a365d',
            },
            accent: {
               50: '#f5f5f5',
               100: '#f6f6f6', //M
               200: '#e7ecf0 ',
               300: '#a3a3a3',
               400: '#808080',
               500: '#4b4b4b',
               600: '#333333',
               700: '#2f2f2f',
               800: '#1a1a1a',
               900: '#121212',
            },
         },
      },
   },
   plugins: [require('tailwindcss-animate')],
};
