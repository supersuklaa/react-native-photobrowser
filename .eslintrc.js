module.exports = {
  'extends': 'airbnb-base',
  'plugins': [
    'import',
    'react',
  ],
  'globals': {
    'fetch': true,
  },
  'rules': {
    'react/jsx-uses-vars': 2,
    'react/jsx-indent': [2, 2],
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'jsx-quotes': ['error', 'prefer-single'],
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
  },
};
