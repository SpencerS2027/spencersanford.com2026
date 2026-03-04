/**
 * Responsive Layout System
 * Handles viewport detection and layout adaptation based on breakpoints
 */

const ResponsiveLayout = {
  breakpoints: {
    mobile: 768,
    tablet: 1024
  },

  currentBreakpoint: null,

  /**
   * Initialize responsive layout system
   */
  init: function() {
    this.checkBreakpoint();
    window.addEventListener('resize', this.debounce(this.checkBreakpoint.bind(this), 250));
  },

  /**
   * Check current breakpoint and apply appropriate styles
   */
  checkBreakpoint: function() {
    const width = window.innerWidth;
    let newBreakpoint;
    
    if (width < this.breakpoints.mobile) {
      newBreakpoint = 'mobile';
    } else if (width < this.breakpoints.tablet) {
      newBreakpoint = 'tablet';
    } else {
      newBreakpoint = 'desktop';
    }
    
    if (newBreakpoint !== this.currentBreakpoint) {
      this.currentBreakpoint = newBreakpoint;
      document.body.setAttribute('data-breakpoint', newBreakpoint);
      this.applyBreakpointStyles();
    }
  },

  /**
   * Apply breakpoint-specific styles and behaviors
   */
  applyBreakpointStyles: function() {
    // Adjust layout-specific JavaScript behaviors based on current breakpoint
    // This method can be extended to handle breakpoint-specific interactions
    // For now, the data-breakpoint attribute on body allows CSS to handle visual changes
  },

  /**
   * Debounce utility function to limit resize event frequency
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  debounce: function(func, wait) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), wait);
    };
  }
};

// Initialize responsive layout when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ResponsiveLayout.init());
} else {
  ResponsiveLayout.init();
}
