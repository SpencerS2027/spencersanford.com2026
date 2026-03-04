/**
 * Asset Loading System
 * Handles image format detection (WebP support) and lazy loading optimization
 */

const AssetLoader = {
  supportsWebP: false,

  /**
   * Initialize asset loading system
   */
  init: function() {
    this.detectWebPSupport();
    this.setupLazyLoading();
    this.calculatePerformanceMetrics();
  },

  /**
   * Detect WebP format support in the browser
   */
  detectWebPSupport: function() {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      // Test if browser supports WebP by checking canvas toDataURL output
      this.supportsWebP = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    // Add class to document element for CSS targeting
    document.documentElement.classList.add(this.supportsWebP ? 'webp' : 'no-webp');
  },

  /**
   * Set up lazy loading for images using Intersection Observer
   */
  setupLazyLoading: function() {
    // Check for IntersectionObserver support
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            imageObserver.unobserve(img);
          }
        });
      });
      
      // Observe all images with loading="lazy" attribute
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  },

  /**
   * Load an image by setting its src attribute
   * @param {HTMLImageElement} img - The image element to load
   */
  loadImage: function(img) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
  },

  /**
   * Calculate and display performance metrics
   */
  calculatePerformanceMetrics: function() {
    // Wait for page to fully load before calculating metrics
    window.addEventListener('load', () => {
      // Use Navigation Timing Level 2 API (modern approach)
      if (window.performance && window.performance.getEntriesByType) {
        const navigation = window.performance.getEntriesByType('navigation')[0];
        
        // Calculate page load time
        let loadTime = 0;
        if (navigation) {
          loadTime = Math.round(navigation.loadEventEnd - navigation.fetchStart);
        } else if (window.performance.timing) {
          // Fallback to deprecated API for older browsers
          const timing = window.performance.timing;
          loadTime = timing.loadEventEnd - timing.navigationStart;
        }
        
        // Calculate total page size from resource timing
        let totalSize = 0;
        const resources = window.performance.getEntriesByType('resource');
        resources.forEach(resource => {
          if (resource.transferSize) {
            totalSize += resource.transferSize;
          }
        });
        
        // Add document size
        if (navigation && navigation.transferSize) {
          totalSize += navigation.transferSize;
        }
        
        // Convert bytes to KB
        const totalSizeKB = Math.round(totalSize / 1024);
        
        // Update Technology section with metrics
        const loadTimeElement = document.getElementById('load-time');
        const totalSizeElement = document.getElementById('total-size');
        
        if (loadTimeElement) {
          loadTimeElement.textContent = loadTime;
        }
        
        if (totalSizeElement) {
          totalSizeElement.textContent = totalSizeKB;
        }
      }
    });
  }
};

// Initialize asset loader when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AssetLoader.init());
} else {
  AssetLoader.init();
}
