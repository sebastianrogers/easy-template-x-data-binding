import { DataBindingPluginContent } from ".";

export interface DataBindingDateContent extends DataBindingPluginContent {
    _type: "date";
    value: Date;
}
