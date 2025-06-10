import { visit } from 'unist-util-visit';

function remarkImageShortcode() {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      // Check if this is a paragraph containing only our shortcode
      if (node.type === 'paragraph' && node.children && node.children.length === 1 && node.children[0].type === 'text') {
        const textNode = node.children[0];
        const regex = /^\{\{<\s*Image\s+([^>]+)\s*>\}\}$/;
        const match = textNode.value.match(regex);
        
        if (match) {
          // Parse attributes
          const attrs = Object.fromEntries(
            [...match[1].matchAll(/(\w+)="([^"]+)"/g)].map(([, key, val]) => [key, val])
          );

          // Replace the paragraph with an HTML node
          const htmlNode = {
            type: 'html',
            value: `<img src="${attrs.src}" alt="${attrs.alt}" width="${attrs.width}" height="${attrs.height}" />`,
          };

          parent.children[index] = htmlNode;
          return;
        }
      }

      // Also handle inline shortcodes within text nodes
      if (node.type === 'text') {
        const regex = /\{\{<\s*Image\s+([^>]+)\s*>\}\}/g;
        const matches = [...node.value.matchAll(regex)];

        if (!matches.length) return;

        const newNodes = [];
        let lastIndex = 0;

        matches.forEach((match) => {
          // Add text before the match
          if (match.index > lastIndex) {
            const beforeText = node.value.slice(lastIndex, match.index);
            if (beforeText.trim()) {
              newNodes.push({
                type: 'text',
                value: beforeText
              });
            }
          }

          // Parse attributes
          const attrs = Object.fromEntries(
            [...match[1].matchAll(/(\w+)="([^"]+)"/g)].map(([, key, val]) => [key, val])
          );

          // Add the HTML node
          newNodes.push({
            type: 'html',
            value: `<img src="${attrs.src}" alt="${attrs.alt}" width="${attrs.width}" height="${attrs.height}" />`,
          });

          lastIndex = match.index + match[0].length;
        });

        // Add remaining text after the last match
        if (lastIndex < node.value.length) {
          const afterText = node.value.slice(lastIndex);
          if (afterText.trim()) {
            newNodes.push({
              type: 'text',
              value: afterText
            });
          }
        }

        // Replace the original node with the new nodes
        if (newNodes.length > 0) {
          parent.children.splice(index, 1, ...newNodes);
        }
      }
    });
  };
}

export default remarkImageShortcode;
