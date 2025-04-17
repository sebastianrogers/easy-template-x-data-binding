# easy-template-x-data-binding

Extends the [easy-template-x](https://github.com/alonrbar/easy-template-x) to implement data binding controls via custom XML.

[![CircleCI](https://circleci.com/gh/sebastianrogers/easy-template-x-data-binding.svg?style=shield)](https://circleci.com/gh/sebastianrogers/easy-template-x-data-binding)
[![npm version](https://img.shields.io/npm/v/easy-template-x-data-binding.svg)](https://www.npmjs.com/package/easy-template-x-data-binding)
[![npm license](https://img.shields.io/npm/l/easy-template-x-data-binding.svg)](https://www.npmjs.com/package/easy-template-x-data-binding)
[![dependencies Status](https://david-dm.org/sebastianrogers/easy-template-x-data-binding/status.svg)](https://david-dm.org/sebastianrogers/easy-template-x-data-binding)

## Easy Template X Extensions

[Easy Template X](https://github.com/alonrbar/easy-template-x) is an excellent library for creating word documents from templates.

It handles the processing of the documents contents but does not allow editing of the document's metadata, held in [Custom XML files](https://docs.microsoft.com/en-gb/archive/blogs/modonovan/word-2007-content-controls-and-xml-part-1-the-basics) inside the document.

Easy Template X supports [extensions](https://github.com/alonrbar/easy-template-x#extensions) which can be run on the documents either before or after it modifies the contents.

## Node Example

```typescript
import * as fs from "fs";
import { TemplateHandler, TemplateHandlerOptions } from "easy-template-x";
import {
  DataBindingExtension,
  createDefaultDataBindingPlugins
} from "easy-template-x-data-binding";

// 1. read template file
const templateFile = fs.readFileSync("test/fixtures/files/data binding.docx");

// 2. process the template
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
        value: `Example Rich Text
        
        Empty line above`
    },
    "/data/TEXT": {
        _type: "text",
        value: `Example Text`
    }
};

const handler = new TemplateHandler(
    new TemplateHandlerOptions({
        extensions: {
            afterCompilation: [
                new DataBindingExtension(createDefaultDataBindingPlugins())
            ]
        }
    })
);

const doc = await handler.process(templateFile, data);

// 3. save output
fs.writeFileSync("out/data binding - output.docx", doc);
```

Input:

![input template](./docs/assets/template-in.png?raw=true)

Output:

![output document](./docs/assets/template-out.png?raw=true)

## Browser Example

The following example produces the same output while running in the browser.
Notice that the actual template processing (step 2) is exactly the same as in the previous Node example.

```typescript
import { TemplateHandler, TemplateHandlerOptions } from "easy-template-x";
import {
  DataBindingExtension,
  createDefaultDataBindingPlugins
} from "easy-template-x-data-binding";

// 1. read template file

// (in this example we're loading the template by performing
//  an AJAX call using the fetch API, another common way to
//  get your hand on a Blob is to use an HTML File Input)
const response = await fetch("http://somewhere.com/myTemplate.docx");
const templateFile = await response.blob();

// 2. process the template
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
        value: `Example Rich Text
        
        Empty line above`
    },
    "/data/TEXT": {
        _type: "text",
        value: `Example Text`
    }
};

const handler = new TemplateHandler(
    new TemplateHandlerOptions({
        extensions: {
            afterCompilation: [
                new DataBindingExtension(createDefaultDataBindingPlugins())
            ]
        }
    })
);

const doc = await handler.process(templateFile, data);

// 3. save output
saveFile("myTemplate - output.docx", doc);

function saveFile(filename, blob) {
    // see: https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link

    // get downloadable url from the blob
    const blobUrl = URL.createObjectURL(blob);

    // create temp link element
    let link = document.createElement("a");
    link.download = filename;
    link.href = blobUrl;

    // use the link to invoke a download
    document.body.appendChild(link);
    link.click();

    // remove the link
    setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
        link = null;
    }, 0);
}
```

## Live Demo

Checkout this [live demo](https://codesandbox.io/s/easy-template-x-data-binding-demo-s7t07?fontsize=14&module=%2Findex.ts) on CodeSandbox 😎

## OOXML Data structure

The data is stored in the /CustomXml/itemX.xml in the OOXML document.

Each piece of bound data can be uniquely identified by the XML path from its root.

Use the XML path to the XML tag used to store the data as its identifier.

Currently namespaces and duplicate tag names are not supported.

```js
{
  "rootnode/firstnode": {
    _type: type
    value: value
  },
  "rootnode/nextnode": {
    _type: type
    value: value
  },
  "rootnode/lastnode": {
    _type: type
    value: value
  }
}
```

For an example of how to format the data see [test\integration\templateHandler.tests.ts]

The \_type dictates which plugin will be used.

The plugin dictates what type the value will have.

## Standard plugins

Although internally in the custom XML files all values are stored as text, and the text plugin can be used for all data types, to assist in validating data different plugins are available.

-   [Text plugin.](#text-plugin)
-   [Boolean plugin](#boolean-plugin)
-   [Date plugin](#date-plugin)

Please feel free to implement plugins for other data types.

### Text plugin

Can be used with all content controls. Updates the text of the node with its contents. Expects value to be a string.

### Boolean plugin

Mainly used with check box controls. Updates the text of the node with 'true' or 'false'. Expects value to be a boolean.

### Date plugin

Mainly used with date box controls. Updates the text of the node with the date in 'yyyy-mm-dd' format. Expects value to be a Date.

## Build

```sh
yarn install
npm login
npm publish --access=public
```