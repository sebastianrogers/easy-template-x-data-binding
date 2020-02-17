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

  private getOOXMLDate(date: Date): string {
    return first(date.toJSON().split("T"));
  }
}
