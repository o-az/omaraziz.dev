import * as Solid from 'solid-js';
import { emojis } from '@/data';
import { randomArrayElement } from '@/utilities';
import type { HTMLElementType } from '@/types';

type Theme = 'light' | 'dark';

const randomEmoji = () => randomArrayElement<typeof emojis[number]>([...emojis]);

const htmlTag = document.querySelector<HTMLHtmlElement>('html') as HTMLElementType<HTMLHtmlElement>;
const current: Theme = window && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const [theme, setTheme] = Solid.createSignal<Theme>(current);
const [toggleText, setToggleText] = Solid.createSignal(randomEmoji());

type ThemeTargetAttribute = 'class' | 'style' | 'data-theme';

type NextTarget<T extends ThemeTargetAttribute> = [T, Theme | `color-scheme: ${Theme}`];

const themeTargetAttributes = (
  nextTheme: Theme
): [NextTarget<'class'>, NextTarget<'data-theme'>, NextTarget<'style'>] => [
  ['class', nextTheme],
  ['data-theme', nextTheme],
  ['style', `color-scheme: ${nextTheme}`],
];

const toggleTheme = () => {
  const nextTheme = theme() === 'light' ? 'dark' : 'light';
  setTheme(() => {
    themeTargetAttributes(nextTheme).forEach(([attribute, value]) => htmlTag.setAttribute(attribute, value));
    // Update code syntax highlighting theme
    document.querySelectorAll('[data-language]').forEach(element => {
      const currentDataTheme = element.getAttribute('data-theme');
      const { style } = element as HTMLElementType<HTMLElement>;
      style.display = currentDataTheme !== nextTheme ? 'none' : 'block';
    });
    setToggleText(randomEmoji());
    return nextTheme;
  });
};

export function Toggle() {
  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      class="text-3xl pt-2 sm:pt-3 hover:(scale-110 transition transform duration-150 ease-in-out) active:rotate-90"
      onClick={toggleTheme}
    >
      {toggleText()}
    </button>
  );
}
