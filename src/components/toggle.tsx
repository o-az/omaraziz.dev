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
      class="relative flex h-9 w-9 items-center justify-center rounded-lg bg-transparent ring-gray-500 transition-all hover:ring-1 dark:bg-transparent rounded-full"
      onClick={toggleTheme}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        class="h-6 w-6 text-gray-800 dark:text-gray-200"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        ></path>
      </svg>
    </button>
  )
}
