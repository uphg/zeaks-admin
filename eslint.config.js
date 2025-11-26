import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  unocss: true,
  formatters: {
    css: true,
    html: true,
  },
  rules: {
    'vue/operator-linebreak': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'style/semi': ['error', 'never'],
    'antfu/if-newline': 'off',
    'curly': ['error', 'all'],
  },
})