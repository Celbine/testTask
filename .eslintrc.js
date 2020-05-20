module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": ["airbnb"],
  "settings": {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      '@typescript-eslint/parser': [".ts", ".tsx"]
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "rules": {
    "template-curly-spacing": "off",
    "global-require": "off",
    "import/named": "off",
    "camelcase": "off",
    "no-multi-assign": "off",
    "no-mixed-operators": "off",
    "no-return-assign": "off",
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    "array-callback-return": "off",
    "prefer-destructuring": "off",
    "max-len": "off",
    "emitDecoratorMetadata": "off",
    "experimentalDecorators": "off",
    "no-restricted-syntax": "off",
    "operator-assignment": "off",
    "max-classes-per-file": "off",
    "no-new": "off",
    "no-multi-spaces": "off",
    "guard-for-in": "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": "off",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "import/no-cycle": "off",
    "no-console": "off",
    "no-plusplus": "off",
    "consistent-return": "off",
    "class-methods-use-this": "off",
  }
};
