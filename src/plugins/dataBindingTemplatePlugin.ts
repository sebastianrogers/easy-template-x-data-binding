import {
    TemplateCompiler,
    xml,
    XmlNode,
    TemplatePlugin
} from "easy-template-x";
import { DataBindingPluginContent } from "./dataBindingPluginContent";

export interface DataBindingPluginUtilities {
    compiler: TemplateCompiler;
}

/* eslint-disable @typescript-eslint/member-ordering */

export abstract class DataBindingTemplatePlugin extends TemplatePlugin {
    /**
     * The content type this plugin handles.
     */
    public abstract get contentType(): string;

    /**
     * Convert the value into an appropriate string to store in the customXML
     * @param value The raw value
     */
    public abstract convertToDataBindingValue(value: any): string;

    public setNodeContents(
        node: XmlNode,
        content: DataBindingPluginContent
    ): void | Promise<void> {
        const contentNode: XmlNode = xml.create.textNode(
            this.convertToDataBindingValue(content.value)
        );

        xml.modify.remove(xml.query.lastTextChild(node));
        xml.modify.appendChild(node, contentNode);
    }

    /**
     * Called by the TemplateHandler at runtime.
     */
    public setUtilities(utilities: DataBindingPluginUtilities) {
        this.utilities = utilities;
    }

    protected utilities: DataBindingPluginUtilities;
}
