import { DataBindingTemplatePlugin } from "./dataBindingTemplatePlugin";
import { DataBindingBooleanContent } from "./dataBindingBooleanContent";
import { XmlNode } from "easy-template-x";

export class DataBindingBooleanPlugin extends DataBindingTemplatePlugin {
    public readonly contentType = "boolean";

    public setNodeContents(
        textNode: XmlNode,
        content: DataBindingBooleanContent
    ): void | Promise<void> {
        const contentNode: XmlNode = XmlNode.createTextNode(
            content.value.toString()
        );

        XmlNode.remove(XmlNode.lastTextChild(textNode));
        XmlNode.appendChild(textNode, contentNode);
    }
}
