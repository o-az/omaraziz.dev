/** @type {import('@types/babel-core').TransformOptions} */
module.exports = {
  presets: ['solid', ['@babel/preset-env'], '@babel/preset-typescript'],
  plugins: [
    // [
    //   'prismjs',
    //   {
    //     languages: ['javascript', 'css', 'markup', 'typescript', 'html', 'json'],
    //     plugins: ['line-numbers', 'normalize-whitespace'],
    //     theme: 'okaidia',
    //     css: true,
    //   },
    // ],
  ],
  ignore: ['node_modules'],
}
