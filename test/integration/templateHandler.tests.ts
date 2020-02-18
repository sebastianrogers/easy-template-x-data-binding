import {
  writeOutFile,
  readFixture,
  removeOutFolder,
  getCustomXmlFiles
} from "test/utilities";
import { DataBindingExtension, createDefaultDataBindingPlugins } from "src";
import {
  TemplateHandler,
  TemplateHandlerOptions,
  XmlNode
} from "easy-template-x";
import { XmlNodePath } from "src/xml/xmlNodePath";

beforeAll(() => {
  removeOutFolder(nameof(TemplateHandler));
});

describe(nameof(TemplateHandler), () => {
  it("updates data bindings in a form", async () => {
    const data = {
      "/data/CHECKBOX": {
        _type: "boolean",
        value: true,
        expected: "true"
      },
      "/data/DATE": {
        _type: "date",
        value: new Date("2019-04-01T12:00:00Z"),
        expected: "2019-04-01"
      },
      "/data/NUMBER": {
        _type: "text",
        value: "999",
        expected: "999"
      },
      "/data/RICH_TEXT": {
        _type: "text",
        value: `Example Rich Text
        
        Empty line above`,
        expected: `Example Rich Text
        
        Empty line above`
      },
      "/data/TEXT": {
        _type: "text",
        value: `Example Text`,
        expected: `Example Text`
      }
    };

    const template = readFixture("data binding.docx");

    const handler = createHandler();
    const buffer: Buffer = await handler.process(template, data);

    const filename = "data binding.docx";
    writeOutFile(nameof(TemplateHandler), filename, buffer);

    const customXmlFiles = await getCustomXmlFiles(
      nameof(TemplateHandler),
      filename
    );

    (await customXmlFiles.load()).forEach(document => {
      document.childNodes
        .filter(node => {
          return Object.keys(data).includes(XmlNodePath.getPath(node));
        })
        .forEach(node => {
          const key = XmlNodePath.getPath(node);
          const property = (data as any)[key];
          const textNode = XmlNode.lastTextChild(node);
          expect(textNode.textContent).toBe(property.expected);
        });
    });
  });
});

function createHandler() {
  return new TemplateHandler(
    new TemplateHandlerOptions({
      extensions: {
        afterCompilation: [
          new DataBindingExtension(createDefaultDataBindingPlugins())
        ]
      }
    })
  );
}
