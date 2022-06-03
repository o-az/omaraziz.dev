interface LinkItem {
  name: string
  path: string
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
] as const

export default function Home() {
  return (
    <main class="mt-28 relative grid grid-flow-col items-center text-center text-white">
      <section class="grid items-center">
        <p
          class="mb-1 font-bold text-black dark:text-[#f7f7f7] tracking-normal inter-bold font-extrabold text-center"
          style={{
            // clamp(A, B, C)
            // element is B% of parent, size: A < element size < C
            'font-size': 'clamp(8em, 80%, 200px)',
          }}
        >
          Omar Aziz
        </p>
        <ul class="flex justify-center space-x-8 text-xl md:text-4xl">
          {LINKS.map(({ name, path }) => (
            <a href={path} target="_blank" rel="noreferrer" class="hover:text-light-100">
              <li class="rounded-lg p-1 text-[26px] font-normal text-gray-600 transition-all hover:bg-gray-200 dark:text-gray-400 dark:hover:text-light-100 dark:hover:bg-gray-800 sm:px-3 sm:py-2 md:inline-block">
                {name}
              </li>
            </a>
          ))}
        </ul>
        <p class="text-2xl p-20 leading-10"></p>
      </section>
    </main>
  )
}
