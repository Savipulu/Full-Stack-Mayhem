module.exports = {
  env: {
    es6: true,
    node: true
  },
  parser: 'babel-eslint',
  plugins: ['promise'],
  extends: 'eslint:recommended',
  rules: {
    'promise/catch-or-return': 'error',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-console': 0
  }
}
