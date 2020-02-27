import { DataBindingTemplatePlugin } from "./dataBindingTemplatePlugin";

export class DataBindingTextPlugin extends DataBindingTemplatePlugin {
    public readonly contentType = "text";

    public convertToDataBindingValue(value: any): string {
        if (value === null || value === undefined) {
            return "";
        }

        return value.toString();
    }
}
