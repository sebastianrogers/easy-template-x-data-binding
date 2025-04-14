import { CustomXmlFiles } from "src/office/customXmlFiles";
import { Zip, xml } from "easy-template-x";
import {
    readFixture,
    writeOutFile,
    removeOutFolder,
    readOutFile
} from "test/utilities";
import { Constructor } from "easy-template-x/dist/types/types";

const buffer = readFixture("data binding.docx");
let customXmlFiles: CustomXmlFiles;
let zip: Zip;

beforeAll(async () => {
    removeOutFolder(nameof(CustomXmlFiles));

    zip = await Zip.load(buffer);
    customXmlFiles = new CustomXmlFiles(zip);
});

describe(nameof(CustomXmlFiles), () => {
    it("loads custom xml files", async () => {
        const documents = await customXmlFiles.load();
        expect(documents.size).toBe(1);
    });

    it("saves custom xml files", async () => {
        const documents = await customXmlFiles.load();
        const ticks = new Date().getTime();
        documents.forEach(document => {
            document.childNodes
                .filter(node => node.nodeName === "NUMBER")
                .forEach(node => {
                    xml.query.lastTextChild(node).textContent = `${ticks}`;
                });
        });

        await customXmlFiles.save();
        const updatedBuffer = await zip.export(
            buffer.constructor as Constructor<Buffer>
        );

        writeOutFile(nameof(CustomXmlFiles), `saves.docx`, updatedBuffer);

        const savedBuffer = readOutFile(nameof(CustomXmlFiles), `saves.docx`);
        const savedZip = await Zip.load(savedBuffer);
        const savedCustomXmlFiles = new CustomXmlFiles(savedZip);
        (await savedCustomXmlFiles.load()).forEach(document => {
            document.childNodes
                .filter(node => node.nodeName === "NUMBER")
                .forEach(node => {
                    expect(xml.query.lastTextChild(node).textContent).toBe(
                        `${ticks}`
                    );
                });
        });
    });
});
