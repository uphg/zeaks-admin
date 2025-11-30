import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
  rules: {
    'style/brace-style': 'off', // 代码大括号风格
    'style/jsx-curly-newline': 'off', // JSX 中大括号内强制换行
    'style/jsx-one-expression-per-line': 'off', // JSX 中每行只能有一个表达式（会导致字符串拼接bug）
    'import/no-mutable-exports': 'off',
    'antfu/if-newline': 'off', // if 语句结束后强制换行
    'no-unused-vars': 'off',
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-use-before-define': 'off',
    'no-undef': 'off',
    'regexp/no-unused-capturing-group': 'off',
    'no-restricted-globals': 'off',
    'unused-imports/no-unused-vars': 'off',
    'no-sparse-arrays': 'off',
    // 'nonblock-statement-body-position': 'error', // 关闭 if 语句结束后强制换行
    // 'ts/no-unused-expressions': ['error', { allowShortCircuit: true }],
    'ts/no-unused-expressions': 'off',
    'ts/no-use-before-define': 'off',
    'ts/no-unnecessary-type-constraint': 'off',
    // vue 文件各模块顺序
    'vue/block-order': ['error', {
      order: ['template', 'script', 'style'],
    }],
    'eslint-comments/no-unlimited-disable': 'off',
  },
  ignores: [
    '*.zip.tsx',
  ],
}, {
  files: ['*.tsx', '*.jsx'],
  rules: {
    'no-unused-vars': 'off',
  },
})
