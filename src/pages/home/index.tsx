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
    path: 'mailto:hello@omaraziz.dev',
  },
] as const

export default function Home() {
  return (
    <main class="mt-42 relative grid h-full h-full grid-flow-col items-center text-center text-white">
      <section class="grid items-center">
        <p
          class="mb-1 font-bold tracking-tight text-black selection:bg-red-400 dark:text-white"
          style={{
            'font-size': 'clamp(4.2rem, -6.0179rem + 28.8571vw, 12.625rem)',
          }}
        >
          Omar Aziz
        </p>
        <ul class="flex justify-center space-x-8 text-xl md:text-4xl">
          {LINKS.map(({ name, path }) => (
            <li class="rounded-lg p-1 text-[26px] font-normal text-gray-600 transition-all hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800 sm:px-3 sm:py-2 md:inline-block">
              <a href={path} target="_blank" rel="noreferrer">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
