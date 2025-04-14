import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("plugin:@typescript-eslint/recommended"),

    plugins: {
        "@typescript-eslint": typescriptEslint,
        "@stylistic/ts": stylisticTs,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.commonjs,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 2018,
        sourceType: "commonjs",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
                modules: true,
            },
        },
    },

    rules: {
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/class-name-casing": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@stylistic/ts/indent": ["error", 4, {
            flatTernaryExpressions: true,
            SwitchCase: 1,
        }],

        "@typescript-eslint/interface-name-prefix": "off",

        "@typescript-eslint/member-ordering": ["error", {
            default: [
                "public-static-field",
                "protected-static-field",
                "private-static-field",
                "public-static-method",
                "protected-static-method",
                "private-static-method",
                "public-instance-field",
                "protected-instance-field",
                "private-instance-field",
                "constructor",
                "public-instance-method",
                "protected-instance-method",
                "private-instance-method",
            ],
        }],

        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-object-literal-type-assertion": "off",
        "@typescript-eslint/no-parameter-properties": "off",

        "@typescript-eslint/no-unused-vars": ["error", {
            args: "none",
        }],

        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "off",
        "linebreak-style": "off",

        "no-multiple-empty-lines": ["error", {
            max: 1,
        }],

        "no-unreachable": "warn",
        "no-var": "error",
        "prefer-const": "error",
        semi: ["error", "always"],
    },
}]);