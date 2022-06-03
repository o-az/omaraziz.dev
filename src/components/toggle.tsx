import * as Solid from 'solid-js'

type Theme = 'light' | 'dark'

const htmlTag = document.querySelector<HTMLLinkElement>('html') as HTMLElement
const current: Theme = window && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
const [theme, setTheme] = Solid.createSignal<Theme>(current)

const toggleTheme = () => {
  const nextTheme = theme() === 'light' ? 'dark' : 'light'
  setTheme(() => {
    htmlTag.setAttribute('class', nextTheme)
    // Update code syntax highlighting theme
    document.querySelectorAll('[data-theme]').forEach(element => {
      const currentDataTheme = element.getAttribute('data-theme')
      ;(element as HTMLElement).style.display = currentDataTheme !== nextTheme ? 'none' : 'block'
    })
    return nextTheme
  })
}

export function Toggle() {
  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      class="relative flex h-9 w-9 items-center justify-center rounded-lg bg-transparent ring-gray-500 transition-all hover:ring-1 dark:bg-transparent rounded-full  mt-2"
      onClick={toggleTheme}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-6 w-6 text-gray-800 dark:text-gray-200"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    </button>
  )
}
