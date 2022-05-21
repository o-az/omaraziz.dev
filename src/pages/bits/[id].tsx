import * as Solid from 'solid-js'
import { useParams } from 'solid-app-router'
import { Snippet } from '@/components'

type Params = { id: string }

export default function Bit() {
  const { id: filename } = useParams<Params>()

  return (
    <main class="m-6 p-4 dark:text-white flex max-w-full justify-center">
      <section>
        <Snippet
          code={`
        function Add(a: number, b: number) {
          return a + b
        }
        `}
          indent={2}
          language="typescript"
        />
      </section>
    </main>
  )
}
