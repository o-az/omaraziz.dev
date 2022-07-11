import { defineConfig } from '@unocss/vite';
import presetUno from '@unocss/preset-uno';
import presetWind from '@unocss/preset-wind';
import presetIcons from '@unocss/preset-icons';
import { presetMini } from '@unocss/preset-mini';
import presetWebFonts from '@unocss/preset-web-fonts';
import presetTypography from '@unocss/preset-typography';
import presetAttributify from '@unocss/preset-attributify';
import transformerVariantGroup from '@unocss/transformer-variant-group';

export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
    presetMini(),
    presetIcons(),
    presetAttributify(),
    transformerVariantGroup(),
    presetTypography({
      selectorName: 'markdown',
      cssExtend: {
        code: { color: '#8b5cf6' },
        'a:hover': { color: '#f43f5e' },
        'a:visited': { color: '#14b8a6' },
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
