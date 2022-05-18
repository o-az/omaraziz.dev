import * as React from 'react'

type Theme = 'light' | 'dark'
const htmlTag = document.querySelector<HTMLLinkElement>('html') as HTMLLinkElement

const current: Theme = window && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export function Toggle() {
  const [theme, setTheme] = React.useState<Theme>(current)
  const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'

  React.useEffect(() => {
    htmlTag.setAttribute('class', nextTheme)
    console.log(htmlTag.getAttribute('class'))
  }, [nextTheme])

  const toggleTheme = () => setTheme(nextTheme)

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 ring-gray-300 transition-all hover:ring-2 dark:bg-gray-600"
      onClick={toggleTheme}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-5 w-5 text-gray-800 dark:text-gray-200"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        ></path>
      </svg>
    </button>
  )
}
