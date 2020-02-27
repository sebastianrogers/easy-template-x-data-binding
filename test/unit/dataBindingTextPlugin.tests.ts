import { DataBindingTextPlugin } from "src";

const dataBindingTextPlugin = new DataBindingTextPlugin();

describe.each([
    [null, ""],
    [undefined, ""],
    ["", ""],
    ["String", "String"],
    [100, "100"],
    [
        new Date("2020-02-28T12:00:00Z"),
        new Date("2020-02-28T12:00:00Z").toString()
    ]
])("converts %s", (value: any, expected: string) => {
    it("converts", async () => {
        expect(dataBindingTextPlugin.convertToDataBindingValue(value)).toBe(
            expected
        );
    });
});
