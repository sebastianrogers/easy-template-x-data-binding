import autoExternal from "rollup-plugin-auto-external";
import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import replace from "@rollup/plugin-replace";

import pkg from "./package.json" with { type: "json" };

const extensions = [".ts"];

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/cjs/easy-template-x-data-binding.cjs",
      format: "cjs"
    },
    {
      file: "dist/es/easy-template-x-data-binding.mjs",
      format: "es"
    }
  ],
  plugins: [
    autoExternal(),
    nodeResolve({
      extensions
    }),
    replace({
      preventAssignment: true,
      EASY_DATA_BINDING_VERSION: JSON.stringify(pkg.version)
    }),
    babel({
      extensions
    })
  ]
};
