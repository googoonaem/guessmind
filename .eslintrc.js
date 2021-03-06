module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    rules: {
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
            },
        ],
        "no-console": "off"
    }
}