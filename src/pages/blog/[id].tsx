import { useParams } from 'solid-app-router'

export default function BlogPost() {
  const params = useParams()
  return (
    <main>
      <section>
        <h1 class="text-white">post</h1>
        <h2>{JSON.stringify(params, null, 2)}</h2>
      </section>
    </main>
  )
}
