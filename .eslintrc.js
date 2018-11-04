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
  'env': {
    'browser': true,
  },
};