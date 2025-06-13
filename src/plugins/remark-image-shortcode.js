import { visit } from 'unist-util-visit';

/**
 * Remark plugin to transform custom Image shortcode into an HTML <img> element.
 * Matches patterns like `{{< Image src="/path" alt="Alt" width="600" height="400" >}}`.
 */
export default function remarkImageShortcode() {
  return function transformer(tree) {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || typeof node.value !== 'string') return;

      const regex = /{{<\s*Image([^>]+)>}}/g;
      const value = node.value;
      let match;
      let lastIndex = 0;
      const newNodes = [];

      while ((match = regex.exec(value))) {
        if (match.index > lastIndex) {
          newNodes.push({ type: 'text', value: value.slice(lastIndex, match.index) });
        }

        const attrsString = match[1];
        const attrRegex = /(\w+)="([^"]*)"/g;
        let attrMatch;
        const attrs = {};
        while ((attrMatch = attrRegex.exec(attrsString))) {
          attrs[attrMatch[1]] = attrMatch[2];
        }

        const imageNode = {
          type: 'image',
          url: attrs.src || '',
          title: null,
          alt: attrs.alt || '',
          data: {
            hProperties: {
              width: attrs.width,
              height: attrs.height,
            },
          },
        };
        newNodes.push(imageNode);

        lastIndex = match.index + match[0].length;
      }

      if (newNodes.length) {
        if (lastIndex < value.length) {
          newNodes.push({ type: 'text', value: value.slice(lastIndex) });
        }
        parent.children.splice(index, 1, ...newNodes);
        return index + newNodes.length;
      }
    });
  };
}
