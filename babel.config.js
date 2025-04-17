const isJest = process.env.NODE_ENV === "test";

export default {
    assumptions: {
        setSpreadProperties: true
    },
    presets: ["@babel/typescript"],
    plugins: [
        "babel-plugin-ts-nameof",
        "@babel/plugin-transform-class-properties",
        ["@babel/plugin-transform-object-rest-spread", { "useBuiltIns": true }],
        "@babel/plugin-transform-optional-catch-binding",
        isJest && "@babel/transform-modules-commonjs"
    ].filter(Boolean)
};
