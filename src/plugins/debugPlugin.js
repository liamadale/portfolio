export default function debugPlugin() {
  return (tree, file) => {
    console.log('[DEBUG] Plugin is running on file:', file.path || 'unknown');
    console.log('[DEBUG] Tree type:', tree.type);
    console.log('[DEBUG] Tree children count:', tree.children?.length || 0);
    
    // Add a simple transformation to prove the plugin is working
    if (tree.children && tree.children.length > 0) {
      tree.children.unshift({
        type: 'html',
        value: '<!-- DEBUG: Plugin processed this file -->'
      });
    }
  };
}
