// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import sortClassMembers from 'eslint-plugin-sort-class-members';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      'sort-class-members': sortClassMembers,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      'sort-class-members/sort-class-members': [
        'error',
        {
          order: [
            { type: 'property', static: true, accessibility: 'public' },
            { type: 'property', static: true, accessibility: 'protected' },
            { type: 'property', static: true, accessibility: 'private' },
            { type: 'method', static: true, accessibility: 'public' },
            { type: 'method', static: true, accessibility: 'protected' },
            { type: 'method', static: true, accessibility: 'private' },
            { type: 'property', accessibility: 'public' },
            { type: 'property', accessibility: 'protected' },
            { type: 'property', accessibility: 'private' },
            'constructor',
            { type: 'method', accessibility: 'public' },
            { type: 'method', accessibility: 'protected' },
            { type: 'method', accessibility: 'private' },
          ],
          accessorPairPositioning: 'getThenSet',
        },
      ],
    },
  },
);
