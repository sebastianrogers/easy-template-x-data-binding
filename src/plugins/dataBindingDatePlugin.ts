import { DataBindingTemplatePlugin } from "./dataBindingTemplatePlugin";
import { DataBindingDateContent } from "./dataBindingDateContent";
import { XmlNode, first } from "easy-template-x";

export class DataBindingDatePlugin extends DataBindingTemplatePlugin {
    public readonly contentType = "date";

    public setNodeContents(
        textNode: XmlNode,
        content: DataBindingDateContent
    ): void | Promise<void> {
        const contentNode: XmlNode = XmlNode.createTextNode(
            this.getOOXMLDate(content.value)
        );

        XmlNode.remove(XmlNode.lastTextChild(textNode));
        XmlNode.appendChild(textNode, contentNode);
    }

    public getOOXMLDate(value: any): string {
        if (value === null) {
            return null;
        }

        const date = new Date(value);
        if (isNaN(date.valueOf())) {
            return null;
        }

        return first(date.toISOString().split("T"));
    }
}
