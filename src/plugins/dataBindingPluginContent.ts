export interface DataBindingPluginContent {
    _type: string;
    value: any;
}

export const DataBindingPluginContent = {
    isPluginContent(content: any): content is DataBindingPluginContent {
        return !!content && typeof content._type === "string";
    }
};
