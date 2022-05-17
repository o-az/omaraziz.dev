/** @type {import('@types/prettier').Config} */
const { resolve } = require('path')

module.exports = {
  semi: false,
  tabWidth: 2,
  useTabs: false,
  printWidth: 120,
  endOfLine: 'auto',
  singleQuote: true,
  arrowParens: 'avoid',
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  quoteProps: 'as-needed',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
    {
      files: ['*.xml'],
      options: {
        parser: 'html',
        xmlSelfClosingSpace: true,
        htmlWhitespaceSensitivity: 'ignore',
        plugins: [`${resolve(__dirname + '/node_modules')}/@prettier/plugin-xml`],
      },
    },
  ],
}
