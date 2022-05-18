import { SearchIcon } from '@/components/icons'

export default function Blog() {
  return (
    <main class="m-6 mt-20 grid h-screen grid-cols-3 grid-rows-6 gap-y-4 text-white">
      <section class="justify-stretch col-span-full row-span-2 flex grid h-full w-full grid-rows-3 flex-col items-center items-center justify-center space-y-14">
        <h1 class="col-span-2 mb-1 w-64 w-full text-left text-lg font-extrabold tracking-tight text-black dark:text-white md:text-8xl">
          Blog
        </h1>
        <div class="relative mb-4 w-full w-full md:w-[30rem]">
          <input
            type="text"
            aria-label="Search articles"
            placeholder="Search articles"
            class="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
          />
          <SearchIcon />
        </div>
      </section>
      <section class="row-span-1"></section>
    </main>
  )
}
