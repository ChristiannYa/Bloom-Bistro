/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: '400px',
      },
      fontSize: {
        '07': '0.75rem', // 12px
        '08': '.875rem', // 14px
        1: '1rem', // 16px
        2: '1.3125rem', // 21px
        3: '1.5rem', // 24px
        4: '1.75rem', // 28px
        5: '2rem', // 32px
        6: '2.25rem', // 36px
      },
      fontFamily: {
        livvic: ['Livvic', 'serif'],
        inter: ['Inter', 'serif'],
      },
      colors: {
        'acc-1': '#90512E',
        'acc-180': '#90512E80',
        'acc-2': '#FBF8F6',
        'acc-3': '#EFE4D6',
        'acc-4': '#F5EFEC',
        'black-1': '#1C1C1C',
        'black-2': '#737070',
        'white-1': '#F1F2F3',
        'white-2': '#B3B3B3',
      },
      padding: {
        'custom-1': '50px',
        'custom-2': '100px',
      },
      backgroundImage: {
        hero: 'url(./assets/images/backgrounds/background1.jpg)',
        proudly: 'url(./assets/images/backgrounds/background2.jpg)',
      },
    },
  },
  plugins: [],
};
