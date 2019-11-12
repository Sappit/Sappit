module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true
  },
  plugins: [
    'svelte3'
  ],
  extends: [
    "eslint:recommended",
  ],
  overrides: [
    {
      files: ['src/**/*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  rules: {
    "no-unused-vars": [0],
    "no-prototype-builtins": [0],
    "require-atomic-updates": [0],
  },
  settings: {
    // ...
  },
  globals: {
    "process": true,
    "require": true,
  },
  root: true,
};
