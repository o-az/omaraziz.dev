import * as Solid from 'solid-js'
import { template } from 'solid-js/web'
import { newLinkTag, fetchHeaders, fetchContentType } from '@/utilities'
// import '@/styles/markdown.css'
// import Prism from 'prismjs'
// import type { Grammar } from 'prismjs'

// import 'prismjs/components/prism-haml'
// import 'prismjs/components/prism-markdown'
// import 'prismjs/components/prism-typescript'

// import 'prismjs/plugins/line-highlight/prism-line-highlight'
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
// import 'prismjs/plugins/match-braces/prism-match-braces'
// import 'prismjs/plugins/autoloader/prism-autoloader'
// import 'prismjs/plugins/filter-highlight-all/prism-filter-highlight-all'
// import 'prismjs/plugins/treeview/prism-treeview'
// import 'prismjs/themes/prism-okaidia.css'

type Language =
  | 'css'
  | 'jsx'
  | 'json'
  | 'markup'
  | 'markdown'
  | 'html'
  | 'xml'
  | 'md'
  | 'javascript'
  | 'js'
  | 'typescript'
  | 'ts'

const fetchStyle = async (url: string) => {
  const _url = 'https://gitcdn.link/cdn/PrismJS/prism-themes/master/themes/prism-synthwave84.css'
  const response = await fetch(url, {})
  const data = await response.text()
  // console.log(data)s
  return data
}

export async function replaceStyleSheet() {
  const stylesheet = new CSSStyleSheet({
    baseURL:
      'https://gist.githubusercontent.com/o-az/eb41ae192797f424f8053ffad98cc10b/raw/306a5b678779e79b842b09e54f166a7e349bb9a6/stylesheet.css',
  })
  console.log(stylesheet)
}

const gistCSSLink = `https://gist.githubusercontent.com/o-az/eb41ae192797f424f8053ffad98cc10b/raw/306a5b678779e79b842b09e54f166a7e349bb9a6/stylesheet.css`

// const linkTag = newLinkTag({
//   rel: 'stylesheet',
// href: gistCSSLink,
//   type: 'text/css',
//   title: 'prism-synthwave84',
// })

// console.log(`line 56: ${linkTag}`)

export async function fetchGistContent(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }
  return await response.text()
}

export async function importGistCSS(url: string) {
  const content = await fetchGistContent(url)
  const style = document.createElement('style')
  style.textContent = content
  document.head.appendChild(style)
}

export function Snippet(props: {
  code: string
  language: Language
  indent?: number
  copy?: boolean
  lineNumbers?: boolean
}) {
  const [{ code, language, indent = 2, copy = true, lineNumbers = true }] = Solid.splitProps(props, [
    'code',
    'language',
    'indent',
    'copy',
    'lineNumbers',
  ])
  const [style, setStyle] = Solid.createSignal('')
  const [styleResourse] = Solid.createResource(() => code, fetchStyle)

  // const lang = Prism.languages[language] as unknown as Grammar
  // const highlighted = Prism.highlight(code, lang, language)

  // addCss('https://gitcdn.link/cdn/PrismJS/prism-themes/master/themes/prism-synthwave84.css')

  Solid.createEffect(() => {
    // importGistCSS(
    //   'https://gist.githubusercontent.com/o-az/eb41ae192797f424f8053ffad98cc10b/raw/6070da8ac2821ffc94de51f1a3bc1b30d862643c/stylesheet.css'
    // ).then(console.log)
    // fetchContentType(
    //   'https://gist.githubusercontent.com/o-az/eb41ae192797f424f8053ffad98cc10b/raw/306a5b678779e79b842b09e54f166a7e349bb9a6/stylesheet.css'
    // ).then(t => console.log(JSON.stringify(t, null, 2)))
    // newLinkTag({
    //   rel: 'stylesheet',
    //   href: 'https://cdn.jsdelivr.net/gh/PrismJS/prism-themes/themes/prism-synthwave84.css',
    //   type: 'text/css',
    //   title: 'prism-synthwave84',
    // })
    // ;[...document.styleSheets].forEach(x => console.log([...x.cssRules].forEach(x => console.log(x.cssText))))
    // console.log(document.querySelector('link[title=prism-theme]'))
    // replaceStyleSheet().then(console.log)
    // setStyle(() => styleResourse())
    // const range = document.createRange()
    // const fragment = range.createContextualFragment(`<style>${style()}</style>`)
    // document.querySelector('head').appendChild(fragment)
    // Prism.highlightAll()
    // console.log(document.styleSheets[0]?.insertRule)
    // insertHeadTag({
    //   url: 'https://gitcdn.link/cdn/PrismJS/prism-themes/master/themes/prism-synthwave84.css',
    //   fileExtension: 'css',
    // })
    // const innerHTML = document.head.innerHTML
    // document.head.innerHTML =
    //   innerHTML +
    //   '<link rel="stylesheet" href="https://gitcdn.link/cdn/PrismJS/prism-themes/master/themes/prism-synthwave84.css" />'
  })

  const numberLines = lineNumbers ? 'line-numbers' : ''
  return (
    <div class={`${numberLines} language-${language}`} id="prism">
      {/* <pre class={`${numberLines} language-${language}`}>{template(`<code>${highlighted}</code>`, 0, false)}</pre> */}
    </div>
  )
}
