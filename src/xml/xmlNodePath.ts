import { XmlNode } from "easy-template-x";

/**
 * Returns the 'path' from the document root to the node i.e. \ancestors\parent\node.
 * **/
export const XmlNodePath = {
    getPath: function getPath(node: XmlNode): string {
        return `${node.parentNode ? getPath(node.parentNode) : ""}/${
            node.nodeName
        }`;
    }
};
