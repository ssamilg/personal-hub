module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-body-style': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
  },
};
