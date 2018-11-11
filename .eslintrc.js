module.exports = {
  'extends': 'airbnb',
  'rules': {
    'semi': ['warn', 'never'],
    'quotes': ['error', 'single'],
    'max-len': ['error', {
      'code': 120,
      'ignoreTrailingComments': true,
    }],
    'react/jsx-one-expression-per-line': 'off',
  },
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
  },
};