import { writeFile } from 'fs/promises'
import globby from 'globby'
import prettier from 'prettier'

async function generateSiteMap() {
  console.log('Generating sitemap...')
  try {
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.cjs')
    const pages = await globby(['**/src/routes/**/*.tsx', '!**/node_modules/**'])
    const siteMap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(page => {
        const path = page
          .replace(/^src\//, '')
          .replace(/\.tsx$/, '')
          .replace('.mdx', '')
          .replace('.html', '')
          .replace('routes', '')
          .replace('/index', '')
        const route = path === '/index' ? '' : path
        return `
        <url>
          <loc>
          https://omaraziz.dev${route}
          </loc>
        </url>
      `
      })
      .join('')}
  </urlset>
  `
    const formatted = prettier.format(siteMap, { ...prettierConfig, parser: 'html' })
    await writeFile('public/sitemap.xml', formatted)
    return true
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Encoutered an error: ${error}`
    console.trace(errorMessage)
    return false
  }
}

generateSiteMap().then(_ => console.log(JSON.stringify(_, null, 2)))
