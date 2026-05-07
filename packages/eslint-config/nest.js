// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import sortClassMembers from 'eslint-plugin-sort-class-members';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * A custom ESLint configuration for Nest.js applications.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const nestJsConfig = tseslint.config(
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
        tsconfigRootDir: process.cwd(),
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
      'lines-between-class-members': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'function', next: 'function' },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'PropertyDefinition[value.type="ArrowFunctionExpression"]',
          message:
            'Class methods must use method shorthand syntax (`methodName() {}`) instead of arrow function class properties.',
        },
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
