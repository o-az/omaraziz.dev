import * as Solid from 'solid-js'

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

export function Snippet({
  code,
  language,
  indent,
  copy = true,
  lineNumbers = true,
}: {
  code: string
  language: Language
  indent?: number
  copy?: boolean
  lineNumbers?: boolean
}) {
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
