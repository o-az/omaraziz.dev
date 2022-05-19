import { readdir, writeFile } from 'fs/promises'
import path from 'path'
import prettier from 'prettier'

interface JsonPost {
  id: number
  title: string
  description: string
  date: string
  filename: string
  tags: string[]
}

const postsDirectory = path.resolve(__dirname, '../posts')

export async function newBlog() {
  try {
    const { default: postsJSON }: { default: JsonPost[] } = await import(`${postsDirectory}/posts.json`)
    const filenames = postsJSON.map(({ filename }) => filename)
    const files = await readdir(`${postsDirectory}/files`)
    const newFiles = files.filter(file => !filenames.includes(file))
    const newFilesDetected = newFiles.length > 0
    if (!newFilesDetected) return
    const newFilesJSON = newFiles.map((file, index) => {
      const id = postsJSON.length + index + 1
      const title = file
      // TODO: think about how to generate description
      const description = `TODO: Add description for ${title}`
      const [date] = new Date().toISOString().split('T')
      // TODO: think about how to add tags
      const tags = [] as const
      return { id, title, description, date, filename: file, tags }
    })
    const newPostsJSON = [...postsJSON, ...newFilesJSON]
    const newPostsJSONString = JSON.stringify(newPostsJSON, null, 2)
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.cjs')
    const formatted = prettier.format(newPostsJSONString, { ...prettierConfig, parser: 'json' })
    await writeFile(`${postsDirectory}/posts.json`, formatted)
    return true
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Encoutered an error: ` + error
    console.trace(errorMessage)
    return false
  }
}

newBlog().then(_ => console.log(JSON.stringify(_, null, 2)))
