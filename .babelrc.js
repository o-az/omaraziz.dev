/** @type {import('@types/babel-core').TransformOptions} */
module.exports = {
  presets: ['solid', ['@babel/preset-env'], '@babel/preset-typescript'],
  plugins: [],
  ignore: ['node_modules'],
}
