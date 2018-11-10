module.exports = {
  'extends': 'airbnb',
  'rules': {
    'semi': ['warn', 'never'],
    'quotes': ['error', 'single'],
    'max-len': ['error', {
      'code': 120,
      'ignoreTrailingComments': true,
    }]
  },
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
  },
};