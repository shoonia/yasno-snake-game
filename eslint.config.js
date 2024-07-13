import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    ignores: [
      'webpack.config.cjs',
      'scripts',
      'dist',
    ],
    rules: {
      'no-else-return': 'error',
      'no-trailing-spaces': 'error',
      indent: [
        'error',
        2,
        {
          'SwitchCase': 1,
        },
      ],
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
          'anonymous': 'always',
          'named': 'never',
          'asyncArrow': 'always',
        },
      ],
      'comma-dangle': [
        'error',
        'always-multiline',
      ],
    },
  },
);
