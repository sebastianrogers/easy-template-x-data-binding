import { XmlNode, XmlParser } from "easy-template-x";

const xmlParser = new XmlParser();

export function parseXml(xml: string, removeWhiteSpace = true): XmlNode {
  if (removeWhiteSpace) xml = xml.replace(/\s/g, "");
  if (removeWhiteSpace) xml = xml.replace(/\s/g, "");
  return xmlParser.parse(xml);
}
