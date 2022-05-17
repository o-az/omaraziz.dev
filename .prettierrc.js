/** @type {import('@types/prettier').Config} */
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
  // plugins: ['prettier-plugin-tailwindcss'],
  // tailwindConfig: './tailwind.config.js',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
  ],
}
