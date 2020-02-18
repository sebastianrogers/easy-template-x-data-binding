# easy-template-x-data-binding

Extends the [easy-template-x](https://github.com/alonrbar/easy-template-x) to implement data binding controls via custom XML.

## Node Example

```typescript
import * as fs from "fs";
import { TemplateHandler, TemplateHandlerOptions } from "easy-template-x";

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
import { TemplateHandler } from "easy-template-x";

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
