module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["react-app", "airbnb", "airbnb-typescript", "prettier"],
  plugins: ["prettier", "@typescript-eslint"],
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "prettier/prettier": [
      "warn",
      {
        singleQuote: true,
        semi: true,
      },
    ],
    "import/prefer-default-export": "off",
    "no-await-in-loop": "off",
    "import/no-named-as-default": "off",
    "no-console": "warn",
    "no-plusplus": "off",
  },
};
