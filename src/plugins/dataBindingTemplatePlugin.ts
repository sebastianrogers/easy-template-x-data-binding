import {
    TemplateCompiler,
    DocxParser,
    XmlParser,
    XmlNode,
    TemplatePlugin
} from "easy-template-x";
import { DataBindingPluginContent } from "./dataBindingPluginContent";

export interface DataBindingPluginUtilities {
    compiler: TemplateCompiler;
    docxParser: DocxParser;
    xmlParser: XmlParser;
}

/* eslint-disable @typescript-eslint/member-ordering */

export abstract class DataBindingTemplatePlugin extends TemplatePlugin {
    /**
     * The content type this plugin handles.
     */
    public abstract get contentType(): string;

    public abstract setNodeContents(
        node: XmlNode,
        content: DataBindingPluginContent
    ): void | Promise<void>;

    /**
     * Called by the TemplateHandler at runtime.
     */
    public setUtilities(utilities: DataBindingPluginUtilities) {
        this.utilities = utilities;
    }

    protected utilities: DataBindingPluginUtilities;
}
