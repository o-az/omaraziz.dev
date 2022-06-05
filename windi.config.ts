// plugins
import { defineConfig } from 'windicss/helpers'
import defaultTheme from 'windicss/defaultTheme'
import colors from 'windicss/colors'
import plugin from 'windicss/plugin'

export default defineConfig({
  attributify: true,
  extract: {
    include: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css,scss,sass,less,styl}'],
  },
  darkMode: 'class',
  alias: {
    hstack: 'flex items-center',
    vstack: 'flex flex-col',
    icon: 'w-6 h-6 fill-current',
    app: 'text-red',
    'app-border': 'border border-gray-200 dark:border-dark-300',
  },
  shortcuts: {
    'logo-float-xl': 'text-6xl m-2 mr-6 float-right',
  },
  extend: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      sans: ['"IBM Plex Sans"', ...defaultTheme.fontFamily.sans],
      serif: ['"IBM Plex Sans"', ...defaultTheme.fontFamily.serif],
      inter: ['"Inter Var"', ...defaultTheme.fontFamily.serif],
      body: ['Merriweather', 'serif'],
      merriWeather: ['Merriweather', 'serif'],
    },
    backgroundOpacity: {
      15: '0.15',
    },
    colors: {
      ...colors,
      gray: {
        0: '#fff',
        100: '#fafafa',
        200: '#eaeaea',
        300: '#999999',
        400: '#888888',
        500: '#666666',
        600: '#444444',
        700: '#333333',
        800: '#222222',
        900: '#111111',
      },
    },
  },
  plugins: [
    require('windicss/plugin/typography'),
    require('windicss/plugin/line-clamp'),
    require('windicss/plugin/aspect-ratio'),
    // plugin(({ addUtilities }) => {}),
  ],
})
