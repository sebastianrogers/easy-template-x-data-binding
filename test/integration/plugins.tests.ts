import { writeOutFile, readFixture } from "test/utilities";
import { DataBindingExtension, createDefaultDataBindingPlugins } from "src";
import { TemplateHandler, TemplateHandlerOptions } from "easy-template-x";

describe(nameof(DataBindingExtension), () => {
  it("updates data bindings in a form", async () => {
    const data = {
      "/data/CHECKBOX": {
        _type: "boolean",
        value: true
      },
      "/data/DATE": {
        _type: "date",
        value: new Date("2019-04-01T12:00:00Z")
      },
      "/data/NUMBER": {
        _type: "text",
        value: "999"
      },
      "/data/RICH_TEXT": {
        _type: "text",
        value: `Example Rich Text`
      },
      "/data/TEXT": {
        _type: "text",
        value: `Example Text`
      }
    };

    const template = readFixture("data binding.docx");

    const handler = createHandler();
    const buffer: Buffer = await handler.process(template, data);

    writeOutFile("data binding.docx", buffer);
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
