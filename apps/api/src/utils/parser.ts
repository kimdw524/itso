import serialize from 'dom-serializer';
import { Element, Node } from 'domhandler';
import { DomHandler, ElementType, Parser } from 'htmlparser2';

export const sanitizeText = (text: string): string => {
  return text.replace(/[-._ ]/g, '').toLowerCase();
};

export const stripHTML = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const removeHTMLAttributes = (html: string): string => {
  const handler = new DomHandler();
  const parser = new Parser(handler, { decodeEntities: false });

  parser.write(html);
  parser.end();

  const dom = handler.root;

  const removeAttributes = (nodes: Node[]): void => {
    for (const node of nodes) {
      if (node.type === ElementType.Tag) {
        const element = node as Element;

        element.attribs = {};
      }

      if (
        'children' in node &&
        node.children &&
        (node.children as Node[]).length > 0
      ) {
        removeAttributes(node.children as Node[]);
      }
    }
  };

  removeAttributes(dom.children);

  return serialize(dom.children, {
    decodeEntities: false,
  });
};
