import { parseXml } from "./utilities";
import { XmlNodePath } from "src/xml/xmlNodePath";

describe("getPath", () => {
  it("gets paths", () => {
    const xml = parseXml(
      `
                <root>
                    <child>
                        <grandchild></grandchild>
                    </child>
                </root>
            `,
      true
    );

    expect(XmlNodePath.getPath(xml)).toBe("/root");
    expect(XmlNodePath.getPath(xml.childNodes[0])).toBe("/root/child");
    expect(XmlNodePath.getPath(xml.childNodes[0].childNodes[0])).toBe(
      "/root/child/grandchild"
    );
  });
});
