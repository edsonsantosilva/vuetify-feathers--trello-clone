module.exports = {
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-case-declarations': 0,
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': ['production', 'staging'].includes(process.env.NODE_ENV) ? 'error' : 'warn',
    'no-debugger': ['production', 'staging'].includes(process.env.NODE_ENV) ? 'error' : 'warn',
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'only-multiline'],
    'no-plusplus': 0,
    'max-len': [
      'error',
      {
        code: 255
      },
    ],
    'object-curly-newline': ['error', { consistent: true }],
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
      },
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    curly: ['error', 'all'],
    'dot-location': ['error', 'property'],
    'no-lone-blocks': ['error'],
    'no-multi-spaces': ['error'],
    'no-return-await': ['error'],
    'no-self-compare': ['error'],
    'no-sequences': ['error'],
    'no-useless-return': ['error'],
    'no-var': ['error'],
    'array-bracket-newline': ['error', 'consistent'],
    'array-bracket-spacing': ['error', 'never'],
    camelcase: [
      'error',
      {
        properties: 'never',
      },
    ],
    'function-paren-newline': ['error', 'consistent'],
  },
};
