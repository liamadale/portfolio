import { visit } from 'unist-util-visit';

/**
 * Remark plugin to transform custom Image shortcode into an `img` element.
 * Matches patterns like:
 *   {{< Image src="/path" alt="Alt" width="600" height="400" >}}
 */
export default function remarkImageShortcode() {
  return function transformer(tree) {
    visit(tree, 'paragraph', (node, index, parent) => {
      const newChildren = [];

      node.children.forEach((child) => {
        if (child.type === 'text' && typeof child.value === 'string') {
          const regex = /{{<\s*Image([^>]+)>}}/g;
          let lastIndex = 0;
          let match;

          while ((match = regex.exec(child.value))) {

            if (match.index > lastIndex) {
              newChildren.push({
                type: 'text',
                value: child.value.slice(lastIndex, match.index),
              });
            }

            const attrsString = match[1];
            const attrRegex = /(\w+)="([^"]*)"/g;
            let attrMatch;
            const attrs = {};

            while ((attrMatch = attrRegex.exec(attrsString))) {
              attrs[attrMatch[1]] = attrMatch[2];
            }

            newChildren.push({
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
            });

            lastIndex = match.index + match[0].length;
          }

          if (lastIndex < child.value.length) {
            newChildren.push({
              type: 'text',
              value: child.value.slice(lastIndex),
            });
          }
        } else {
          newChildren.push(child);
        }
      });

      node.children = newChildren;
    });
  };
}