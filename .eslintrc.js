module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		"plugin:react/recommended",
		"standard-with-typescript",
		"plugin:react-hooks/recommended",
		"react-app",
		"prettier"
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: "./tsconfig.json"
	},
	plugins: ["react"],
	rules: {
		"@typescript-eslint/explicit-function-return-type": "off",
		"react/react-in-jsx-scope": "off",
		"@typescript-eslint/no-unused-vars": "warn",
		"@typescript-eslint/no-floating-promises": "off",
		"@typescript-eslint/strict-boolean-expressions": "off",
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/promise-function-async": "off",
		"@typescript-eslint/no-misused-promises": "off",
		"@typescript-eslint/no-non-null-assertion": "off"
	}
}