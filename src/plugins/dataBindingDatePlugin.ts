import { DataBindingTemplatePlugin } from "./dataBindingTemplatePlugin";
import { first } from "easy-template-x";

export class DataBindingDatePlugin extends DataBindingTemplatePlugin {
    public readonly contentType = "date";

    public convertToDataBindingValue(value: any): string {
        if (value === null) {
            return "";
        }

        const date = new Date(value);
        if (isNaN(date.valueOf())) {
            return "";
        }

        return first(date.toISOString().split("T"));
    }
}
