// eslint.config.js

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      semi: ['error', 'always'],
      quotes: 'off',
      indent: ['error', 2],
      eqeqeq: ['error', 'always'],
      'no-unused-vars': ['warn'],
      'no-console': 'off',
      'comma-dangle': ['error', 'only-multiline'],
    },
  },
];
