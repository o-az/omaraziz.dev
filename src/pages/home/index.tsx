import * as Solid from 'solid-js';
import '@/lib';
const Page = Solid.lazy(() => import('@/components/page'));

interface LinkItem {
  name: string;
  path: string;
}

export const LINKS: ReadonlyArray<LinkItem> = [
  {
    name: 'GitHub',
    path: 'https://github.com/o-az',
  },
  {
    name: 'Twitter',
    path: 'https://twitter.com/undeterrable',
  },
  {
    name: 'Email',
    path: 'mailto:me@omaraziz.dev',
  },
] as const;

export default function Home() {
  return (
    <Page title="✨">
      <main class="mt-30 sm:mt-50 relative grid grid-flow-col items-center text-center text-white h-full mx-auto w-full">
        <section class="grid items-center mx-1 space-y-6 lg:flex items-center text-center overflow-hidden text-center mx-auto w-full justify-center">
          <p class="text-black dark:text-[#f7f7f7] tracking-tighter font-extrabold text-center aspect-w-1 text-9xl px-6 font-sans">
            Omar Aziz
          </p>
          <div class="flex justify-center text-xl md:text-3xl">
            <Solid.For each={LINKS} fallback={<></>}>
              {({ name, path }, index) => {
                return (
                  <a
                    id={`${index()}-social-link`}
                    href={path}
                    target="_blank"
                    rel="noreferrer"
                    class="social mx-3 p-1 font-semibold text-gray-600 dark:text-gray-400 hover:dark:text-light-100 text-gray-600 hover:text-black sm:px-3 sm:py-1 md:inline-block subpixel-antialiased tracking-wide"
                  >
                    {name}
                  </a>
                );
              }}
            </Solid.For>
          </div>
        </section>
      </main>
    </Page>
  );
}
