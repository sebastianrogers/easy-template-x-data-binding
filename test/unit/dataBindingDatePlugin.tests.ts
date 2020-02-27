import { DataBindingDatePlugin } from "src";

const dataBindingDatePlugin = new DataBindingDatePlugin();

describe.each([
    [null, ""],
    [undefined, ""],
    ["", ""],
    ["2020-02-28T12:00:00Z", "2020-02-28"],
    [new Date("2020-02-28T12:00:00Z"), "2020-02-28"]
])("updates %s", (value, expected) => {
    it("converts", async () => {
        expect(dataBindingDatePlugin.convertToDataBindingValue(value)).toBe(
            expected
        );
    });
});
