import * as fs from "fs";
import { sync } from "del";
import { XmlNode, xml, Zip } from "easy-template-x";
import { CustomXmlFiles } from "src/office";

export async function getCustomXmlFiles(id: string, name: string) {
    const savedBuffer = readOutFile(id, name);
    const savedZip = await Zip.load(savedBuffer);
    return new CustomXmlFiles(savedZip);
}

export function parseXml(xmlString: string, removeWhiteSpace = true): XmlNode {
    if (removeWhiteSpace) xmlString = xmlString.replace(/\s/g, "");
    if (removeWhiteSpace) xmlString = xmlString.replace(/\s/g, "");
    return xml.parser.parse(xmlString);
}

export function readFixture(filename: string): Buffer {
    return fs.readFileSync("./test/fixtures/files/" + filename);
}

export function removeOutFolder(id: string) {
    const folderPath = `./out/${id}`;
    sync([folderPath]);
}

export function readOutFile(id: string, filename: string): Buffer {
    return fs.readFileSync(`./out/${id}/${filename}`);
}

export function writeOutFile(
    id: string,
    filename: string,
    file: Buffer
): string {
    fs.existsSync(`./out`) || fs.mkdirSync(`./out`);
    const folderPath = `./out/${id}`;
    fs.existsSync(folderPath) || fs.mkdirSync(folderPath);
    const filePath = `${folderPath}/${filename}`;
    fs.writeFileSync(filePath, file);
    return filePath;
}
