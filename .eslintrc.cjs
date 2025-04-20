module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['prettier'],
  extends: ['airbnb', 'airbnb-typescript', 'plugin:prettier/recommended'],
  globals: {
    NEXT_PUBLIC_BACKEND_URL: true,
    REACT_APP_BACKEND_URL: true,
    COPYRIGHT_YEAR: true
  },
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  ignorePatterns: ['vite.config.js'],
  parserOptions: {
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/label-has-for': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 'off'
  }
};
