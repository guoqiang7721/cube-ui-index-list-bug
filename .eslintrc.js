module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  // 'extends': [
  //   'plugin:vue/strongly-recommended',
  //   '@vue/prettier'
  // ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: 0, //要求是不使用分号
    // 'no-multi-spaces': 'off'
    'space-before-function-paren': ['error', 'never']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
