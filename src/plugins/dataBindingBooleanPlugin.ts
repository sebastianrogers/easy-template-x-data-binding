import { DataBindingTemplatePlugin } from "./dataBindingTemplatePlugin";

export class DataBindingBooleanPlugin extends DataBindingTemplatePlugin {
    public readonly contentType = "boolean";

    public convertToDataBindingValue(value: any): string {
        if (value === null || value === undefined) {
            return "";
        }

        return value.toString();
    }
}
