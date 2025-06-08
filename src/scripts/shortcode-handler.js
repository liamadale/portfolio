// Handle shortcode placeholders and replace them with actual content
document.addEventListener('DOMContentLoaded', function() {
  const shortcodeImages = document.querySelectorAll('.shortcode-image');
  
  shortcodeImages.forEach(async (element) => {
    const src = element.dataset.src;
    const alt = element.dataset.alt;
    const width = element.dataset.width;
    const height = element.dataset.height;
    
    if (src) {
      try {
        // Try to resolve the image path
        let imagePath = src;
        
        // Handle different path formats
        if (src.startsWith('images/') || src.startsWith('/images/')) {
          // For assets/images paths, use the public directory
          const imageName = src.replace(/^\/?(images\/)?/, '');
          
          // Create an img element
          const img = document.createElement('img');
          img.src = `/${imageName}`;
          img.alt = alt || '';
          img.width = parseInt(width) || 400;
          img.height = parseInt(height) || 300;
          img.style.maxWidth = '100%';
          img.style.height = 'auto';
          
          // Replace the placeholder with the image
          element.replaceWith(img);
        } else {
          // For other paths, use as-is
          const img = document.createElement('img');
          img.src = src;
          img.alt = alt || '';
          img.width = parseInt(width) || 400;
          img.height = parseInt(height) || 300;
          img.style.maxWidth = '100%';
          img.style.height = 'auto';
          
          element.replaceWith(img);
        }
      } catch (error) {
        console.error('Error loading shortcode image:', error);
        element.innerHTML = `<div class="bg-yellow-500 text-black p-2">⚠️ Image not found: ${src}</div>`;
      }
    }
  });
});
