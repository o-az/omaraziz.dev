import clsx from 'clsx'
import * as Solid from 'solid-js'

import { SearchIcon } from '@/components/icons'

const text = `Hit / to search`

export function SearchBar(props: { placeholder: string; onInputChange: (event: InputEvent | Event) => void }) {
  const [{ placeholder, onInputChange }] = Solid.splitProps(props, ['placeholder', 'onInputChange'])

  Solid.createEffect(() => {
    const inputElement = document.getElementById('search') as HTMLInputElement
    document.onkeydown = async (event: KeyboardEvent) => {
      if (event.key !== '/') return
      event.preventDefault()
      inputElement.focus()
    }
  })

  return (
    <div class="relative mb-6 w-full w-full">
      <input
        id="search"
        onInput={onInputChange}
        aria-label={placeholder}
        placeholder={text}
        class={clsx(
          'dark:bg-gray-800 dark:bg-opacity-40 dark:text-gray-100 dark:placeholder-zinc-400 dark:border-rose-50 dark:border-opacity-20',
          'ring-0 outline-0 focus:outline-none block w-full rounded-md border border-solid border-pink-200 bg-white px-4 py-2 text-gray-800 ring-transparent focus:ring-transparent focus:ring-offset-transparent outline-transparent ring-1 ring-opacity-30 focus:ring-zink-500'
        )}
      />
      <SearchIcon />
    </div>
  )
}
