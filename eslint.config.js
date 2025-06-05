// @ts-check
import eslint from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import tseslint from "typescript-eslint";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";
import reactRefresh from "eslint-plugin-react-refresh";
import { globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommendedTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	reactHooks.configs["recommended-latest"],
	...pluginQuery.configs["flat/recommended"],
	...pluginRouter.configs["flat/recommended"],
	{
		files: ["src/**/*.ts", "src/**/*.tsx"],
		extends: [
			eslintReact.configs["recommended-typescript"],
			reactRefresh.configs.recommended,
		],

		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},

		rules: {
			"@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
			"@typescript-eslint/prefer-promise-reject-errors": "off",
			"@typescript-eslint/only-throw-error": "off",
		},
	},
	globalIgnores([
		"dist/**/*",
		"node_modules/**/*",
		"src/components/ui/**/*",
		"src/components/magicui/**/*",
	]),
);
