import * as Solid from 'solid-js'
import { parseStringHTML } from '@/utilities'

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
  const [text, setText] = Solid.createSignal(code)
  //
  //
  const numberLines = lineNumbers ? 'line-numbers' : ''
  return (
    <div data-rehype-pretty-code-fragment={code}>
      <pre data-language={language} data-theme="default">
        <code data-language={language} data-theme="default">
          <pre class={numberLines}></pre>
          <span class="line">{code}</span>
        </code>
      </pre>
    </div>
  )
}
