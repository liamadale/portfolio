import { visit } from 'unist-util-visit';

function parseAttributes(attrString) {
  const attrs = [];
  const regex = /([A-Za-z0-9_-]+)="([^"]*)"/g;
  let m;
  while ((m = regex.exec(attrString))) {
    attrs.push({
      type: 'mdxJsxAttribute',
      name: m[1],
      value: {
        type: 'mdxJsxAttributeValueLiteral',
        value: m[2],
      },
    });
  }
  return attrs;
}

export default function remarkShortcodes() {
  return function (tree) {
    visit(tree, 'text', (node, index, parent) => {
      const value = node.value;
      const regex = /\{\{<\s*([A-Za-z0-9_]+)([^>]*)>\}\}/g;

      let match;
      if (!regex.test(value)) return;
      regex.lastIndex = 0;

      const nodes = [];
      let lastIndex = 0;

      while ((match = regex.exec(value))) {
        if (match.index > lastIndex) {
          nodes.push({
            type: 'text',
            value: value.slice(lastIndex, match.index),
          });
        }

        const name = match[1];
        const attrs = parseAttributes(match[2]);

        nodes.push({
          type: 'mdxJsxFlowElement',
          name,
          attributes: attrs,
          children: [],
        });

        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < value.length) {
        nodes.push({
          type: 'text',
          value: value.slice(lastIndex),
        });
      }

      parent.children.splice(index, 1, ...nodes);
    });
  };
}
