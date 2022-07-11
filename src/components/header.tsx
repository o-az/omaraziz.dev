import * as Solid from 'solid-js';
import { Link } from 'solid-app-router';
import { Toggle } from '@/components';

interface HeaderItem {
  name: string;
  path: string;
}

const HEADER_ITEMS: ReadonlyArray<HeaderItem> = [
  {
    name: 'home',
    path: '/',
  },
  {
    name: 'blog',
    path: '/blog',
  },
  // },
] as const;

export function Header() {
  return (
    <header class="flex m-3 mb-2 h-full w-full justify-between px-4 sm:px-5 pt-1 bg-transparent h-full subpixel-antialiased">
      <nav class="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 mx-auto bg-opacity-60 sm:px-6 text-2xl font-normal align-bottom font-mono">
        <div class="space-x-4 sm:space-x-7 flex">
          <Solid.For each={HEADER_ITEMS}>
            {({ name, path }) => (
              <Link
                class={`rounded-lg font-bold text-gray-600 transition-all hover:bg-gray-200 dark:text-gray-200 py-1 dark:hover:text-gray-50 px-2 sm:px-3 sm:w-auto align-bottom hover:cursor-pointer dark:hover:bg-gray-800 border border-transparent dark:hover:border dark:hover:border-gray-700 w-full`}
                href={path}
              >
                {name}
              </Link>
            )}
          </Solid.For>
        </div>
        <div class="text-right pr-7 w-full h-full align-middle sm:pb-2">
          <Toggle />
        </div>
      </nav>
    </header>
  );
}
