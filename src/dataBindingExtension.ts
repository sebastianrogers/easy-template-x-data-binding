import {
  TemplateExtension,
  ScopeData,
  TemplateContext,
  XmlNode,
  XmlDepthTracker,
  XmlNodeType,
  first,
  UnknownContentTypeError,
  toDictionary,
  XmlGeneralNode
} from "easy-template-x";
import { CustomXmlFiles } from "./office/customXmlFiles";
import { XmlNodePath } from "./xml/xmlNodePath";
import { DataBindingPluginContent, DataBindingTemplatePlugin } from ".";
import { IMap } from "easy-template-x/dist/types/types";

export class DataBindingExtension extends TemplateExtension {
  /**
   * Version number of the `easy-template-x` library.
   */
  public readonly version =
    typeof EASYDATA_BINDING_VERSION !== "undefined"
      ? EASYDATA_BINDING_VERSION
      : "null";

  private maxXmlDepth = 20;

  protected readonly pluginsLookup: IMap<DataBindingTemplatePlugin>;

  constructor(plugins: DataBindingTemplatePlugin[]) {
    super();
    this.pluginsLookup = toDictionary(plugins, p => p.contentType);
  }

  public async execute(
    data: ScopeData,
    context: TemplateContext
  ): Promise<void> {
    const customXmlFiles = new CustomXmlFiles(
      context.docx.rawZipFile,
      this.utilities.xmlParser
    );

    (await customXmlFiles.load()).forEach(customXmlFile => {
      this.findNodes(customXmlFile).forEach(node => {
        this.updateNode(node, data);
      });
    });

    await customXmlFiles.save();
  }

  private findNodes(node: XmlNode): XmlNode[] {
    const nodes: XmlNode[] = [];
    const depth = new XmlDepthTracker(this.maxXmlDepth);

    while (node) {
      if (this.isMatch(node)) {
        nodes.push(node);
      }

      node = this.findNextNode(node, depth) as XmlGeneralNode;
    }

    return nodes;
  }

  private findNextNode(node: XmlNode, depth: XmlDepthTracker): XmlNode {
    // children
    if (node.childNodes && node.childNodes.length) {
      depth.increment();
      return first(node.childNodes);
    }

    // siblings
    if (node.nextSibling) return node.nextSibling;

    // parent sibling
    while (node.parentNode) {
      if (node.parentNode.nextSibling) {
        depth.decrement();
        return node.parentNode.nextSibling;
      }

      // go up
      depth.decrement();
      node = node.parentNode;
    }

    return null;
  }

  private isMatch(node: XmlNode): boolean {
    if (node.nodeType === XmlNodeType.Text) {
      return false;
    }

    if (!node.childNodes) {
      return true;
    }

    if (node.childNodes.length === 0) {
      return true;
    }

    if (first(node.childNodes).nodeType === XmlNodeType.Text) {
      return true;
    }

    return false;
  }

  private updateNode(node: XmlNode, data: ScopeData): void {
    const value: string = XmlNodePath.getPath(node);

    const content = data.allData[value] as DataBindingPluginContent;
    if (!content) {
      return;
    }

    const contentType = content._type;

    const plugin = this.pluginsLookup[contentType];
    if (!plugin) {
      throw new UnknownContentTypeError(
        contentType,
        value,
        data.path.join(".")
      );
    }

    plugin.setNodeContents(node, content);
  }
}
