import { useParams } from 'solid-app-router'
import * as Solid from 'solid-js'
import * as SolidWeb from 'solid-js/html'
import { MDXProvider } from 'solid-mdx'
import { compile } from '@mdx-js/mdx'
import rehypeHighlight from 'rehype-highlight'

// import MdxPost from '@/utilities/blank.mdx'
SolidWeb.default
import HelloWorldMdx from '../../../posts/files/hello-world.mdx'

export default function BlogPost() {
  return (
    <main class="m-6 p-4 w-full grid justify-center dark:text-white">
      <HelloWorldMdx />
      {/* <MDXProvider components={{ MdxPost: HelloWorldMdx }}>
        <MdxPost />
      </MDXProvider> */}
    </main>
  )
}

// import { useParams } from 'solid-app-router'
// import * as Solid from 'solid-js'
// import html from 'solid-js/html'
// import { MDXProvider } from 'solid-mdx'
// import { compile } from '@mdx-js/mdx'
// import rehypeHighlight from 'rehype-highlight'
// import MdxPost from '@/utilities/blank.mdx'

// type Params = { id: string }

// const postsDirectory = `../../../posts/files`

// const postFetcher = async (id: string) => {
//   const file = await fetch(`${postsDirectory}/${id}.mdx`)
//   const text = await file.text()
//   const compiled = await compile(text, { rehypePlugins: [rehypeHighlight] })
//   console.log({ compiled })
//   return String(compiled)
// }

// export default function BlogPost() {
//   const { id: postId } = useParams<Params>()
//   const [data] = Solid.createResource(postId, postFetcher)

//   return (
//     <main class="m-6 p-4 w-full grid justify-center dark:text-white">
//       <MDXProvider components={{ MdxPost: () => data }}>
//         <MdxPost />
//       </MDXProvider>
//     </main>
//   )
// }
