const eslintPluginVue = require('eslint-plugin-vue');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const vueEslintParser = require('vue-eslint-parser');

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**']
  },
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vueEslintParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      vue: eslintPluginVue,
      '@typescript-eslint': typescriptPlugin,
      prettier: eslintPluginPrettier
    },
    rules: {
      'prettier/prettier': 'error',
      ...prettierConfig.rules,

      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'warn',

      '@typescript-eslint/no-unused-vars': ['error']
    }
  }
];
