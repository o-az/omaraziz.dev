export default function BlogPost(id: any) {
  console.log(`[id]`)
  console.log(JSON.stringify(id, null, 2))
  return (
    <main>
      <section>
        <h1>post</h1>
        <h2>{id}</h2>
      </section>
    </main>
  )
}
