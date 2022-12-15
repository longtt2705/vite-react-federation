module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  include: ['src'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      extends: ['eslint:recommended', 'prettier', 'plugin:react/jsx-runtime'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 11,
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
        sourceType: 'module',
        extraFileExtensions: ['.tsx', '.ts']
      }
    }
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-unused-vars': ['off']
  },
  globals: {
    React: true,
    google: true,
    mount: true,
    mountWithRouter: true,
    shallow: true,
    shallowWithRouter: true,
    context: true,
    expect: true,
    jsdom: true,
    JSX: true
  }
};
