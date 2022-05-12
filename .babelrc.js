/** @type {import('@types/babel-core').TransformOptions} */
module.exports = {
  presets: [['@babel/preset-env', { modules: false, targets: { node: true } }], '@babel/preset-typescript'],
  ignore: ['node_modules/**'],
}
