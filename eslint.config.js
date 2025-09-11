import { defineConfig } from '@eslint/config-helpers';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import jsx from 'jsx-dom-runtime/eslint-plugin';

export default defineConfig(
  {
    ignores: [
      'dist',
    ],
  },
  js.configs.recommended,
  ts.configs.recommended,
  ts.configs.stylistic,
  jsx,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        process: 'readonly',
      },
    },
    rules: {
      'no-else-return': 'error',
      'no-trailing-spaces': 'error',
      quotes: [
        'error',
        'single',
      ],
      semi: [
        'error',
        'always',
      ],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'comma-dangle': [
        'error',
        'always-multiline',
      ],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 0,
        },
      ],
    },
  },
);
