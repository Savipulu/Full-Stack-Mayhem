module.exports = {
  env: {
    es6: true,
    node: true
  },
  plugins: ["promise"],
  extends: "eslint:recommended",
  rules: {
    "promise/catch-or-return": "error",
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": 0
  }
};
