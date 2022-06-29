import { defineConfig } from '@unocss/vite';
import { presetMini } from '@unocss/preset-mini';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import presetAttributify from '@unocss/preset-attributify';
import presetTypography from '@unocss/preset-typography';
import presetWebFonts from '@unocss/preset-web-fonts';
import presetWind from '@unocss/preset-wind';
import transformerVariantGroup from '@unocss/transformer-variant-group';

export default defineConfig({
  presets: [
    presetUno(),
    presetMini(),
    transformerVariantGroup(),
    presetAttributify(),
    presetIcons(),
    presetWind(),
    presetTypography({
      selectorName: 'markdown',
      cssExtend: {
        code: {
          color: '#8b5cf6',
        },
        'a:hover': {
          color: '#f43f5e',
        },
        'a:visited': {
          color: '#14b8a6',
        },
      },
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter:200,400,900',
        serif: 'IBM Plex Sans:100,400,700',
        mono: 'JetBrains Mono:200,400,800',
      },
    }),
  ],
  extendTheme: [],
});
