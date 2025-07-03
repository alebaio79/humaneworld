module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["eslint-plugin-html"],
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    semi: [1, "always"],
    quotes: "off",
    "space-before-function-paren": ["error", "never"],
  },
  globals: {
    VERSION: "readonly",
    COMMITHASH: "readonly",
    BRANCH: "readonly",
    LASTCOMMITDATETIME: "readonly",
  },
};
