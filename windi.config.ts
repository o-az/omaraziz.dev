// plugins
import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import plugin from 'windicss/plugin'
import defaultTheme from 'windicss/defaultTheme'

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
  theme: {
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
      },
      backgroundOpacity: {
        15: '0.15',
      },
      colors: {
        ...colors,
        'blue-opaque': 'rgb(13 42 148 / 18%)',
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
  },
  plugins: [
    require('windicss/plugin/forms'),
    require('windicss/plugin/filters'),
    require('windicss/plugin/line-clamp'),
    // require('windicss/plugin/line-height'),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/typography')({
      modifiers: ['DEFAULT', 'sm', 'lg', 'red', 'xs'],
    }),
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.skew-10deg': {
          transform: 'skewY(-10deg)',
        },
        '.skew-15deg': {
          transform: 'skewY(-15deg)',
        },
      }
      addUtilities(newUtilities)
    }),
    plugin(({ addComponents }) => {
      const buttons = {
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.btn-blue': {
          backgroundColor: '#3490dc',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2779bd',
          },
        },
        '.btn-red': {
          backgroundColor: '#e3342f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#cc1f1a',
          },
        },
      }
      addComponents(buttons)
    }),
    plugin(({ addDynamic, variants }) => {
      addDynamic(
        'skew',
        ({ Utility, Style }) => {
          return Utility.handler
            .handleStatic(Style('skew'))
            .handleNumber(0, 360, 'int', number => `skewY(-${number}deg)`)
            .createProperty('transform')
        },
        variants('skew')
      )
    }),
  ],
})
