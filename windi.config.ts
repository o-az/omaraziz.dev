// plugins
import colors from 'windicss/colors'
import defaultTheme from 'windicss/defaultTheme'
import { defineConfig } from 'windicss/helpers'
import aspectRatio from 'windicss/plugin/aspect-ratio'
import lineClamp from 'windicss/plugin/line-clamp'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  attributify: true,
  extract: {
    include: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
      fontFamily: {
        sans: ['Inter var', 'IBM Plex Serif', ...defaultTheme.fontFamily.sans],
        serif: ['IBM Plex Serif', 'Inter var', ...defaultTheme.fontFamily.serif],
        body: ['Inter var'],
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
  plugins: [typography(), lineClamp, aspectRatio],
})
