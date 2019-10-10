// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 0,//加分号，和不加分号都可以。
		'indent':0,
    'space-before-function-paren': 0,
    'space-infix-ops':0,
    'keyword-spacing':0,
    'key-spacing':0,
    'no-trailing-spaces':0,
    'semi-spacing':0,
    'space-before-blocks':0,
    'comma-spacing':0,
    'padded-blocks':0,
    'eqeqeq':0
  }
}
