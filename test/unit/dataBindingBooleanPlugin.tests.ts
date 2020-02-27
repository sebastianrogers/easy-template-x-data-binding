import { DataBindingBooleanPlugin } from "src";

const dataBindingBooleanPlugin = new DataBindingBooleanPlugin();

describe.each([
    [null, ""],
    [undefined, ""],
    ["", ""],
    [true, "true"],
    [false, "false"]
])("updates %s", (value, expected) => {
    it("converts", async () => {
        expect(dataBindingBooleanPlugin.convertToDataBindingValue(value)).toBe(
            expected
        );
    });
});
