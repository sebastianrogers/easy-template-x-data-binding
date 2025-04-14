import { TemplateHandler, TemplateHandlerOptions } from 'easy-template-x';
import { DataBindingExtension, createDefaultDataBindingPlugins } from 'easy-template-x-data-binding';
import * as fs from 'fs';

async function main() {
    const templateFile = fs.readFileSync('../data binding.docx');
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

    const handler = new TemplateHandler(new TemplateHandlerOptions({
        extensions: {
            afterCompilation: [
                new DataBindingExtension(createDefaultDataBindingPlugins())
            ]
        }
    }));
    await handler.process(templateFile, data);

    console.log('es verification completed successfully!');
}
main();