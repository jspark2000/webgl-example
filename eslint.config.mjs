import globals from 'globals'
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import reactRefresh from 'eslint-plugin-react-refresh'
import hooksPlugin from 'eslint-plugin-react-hooks'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  {
    files: ['apps/frontend/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      parser: parser,
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser
    },
    settings: {
      ...js.configs.recommended.settings,
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      'prettier/prettier': 'error',
      ...reactPlugin.configs['jsx-runtime'].rules,
      'react-refresh/only-export-components': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      'react-refresh': reactRefresh
    }
  }
]
