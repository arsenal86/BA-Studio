const globals = require("globals");
const tseslint = require("typescript-eslint");
const pluginReact = require("eslint-plugin-react");
const prettier = require("eslint-config-prettier");

module.exports = tseslint.config(
  {
    languageOptions: { globals: globals.browser },
  },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
);
