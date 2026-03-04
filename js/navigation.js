/**
 * Navigation Component
 * Handles navigation interactions, smooth scrolling, and active state management
 */

const Navigation = {
  navLinks: null,
  sections: null,
  
  /**
   * Initialize navigation component
   */
  init: function() {
    // Cache DOM elements
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('.content-section');
    
    // Add click event listeners to all nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href').substring(1);
        this.scrollToSection(sectionId);
      });
    });
    
    // Add keyboard navigation support for arrow keys
    this.navLinks.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        let targetIndex = -1;
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          targetIndex = (index + 1) % this.navLinks.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          targetIndex = (index - 1 + this.navLinks.length) % this.navLinks.length;
        }
        
        if (targetIndex !== -1) {
          this.navLinks[targetIndex].focus();
        }
      });
    });
    
    // Listen for scroll events to update active state
    window.addEventListener('scroll', () => this.handleScroll());
    
    // Set initial active state based on URL hash or default to first section
    const initialSection = window.location.hash ? window.location.hash.substring(1) : 'technology';
    this.updateActiveState(initialSection);
    
    // Initialize read-more functionality for art items
    this.initReadMore();
  },

  /**
   * Scroll to a specific section
   * @param {string} sectionId - The ID of the section to scroll to
   */
  scrollToSection: function(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // Smooth scroll to section
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    // Update URL hash without jumping
    history.pushState(null, null, `#${sectionId}`);
    
    // Update active state
    this.updateActiveState(sectionId);
  },

  /**
   * Update the active state of navigation links
   * @param {string} sectionId - The ID of the currently active section
   */
  updateActiveState: function(sectionId) {
    // Remove active class and aria-current from all links
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    });
    
    // Add active class and aria-current to current section link
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
      activeLink.setAttribute('aria-current', 'page');
    }
  },
  
  /**
   * Handle scroll events to detect which section is in viewport
   */
  handleScroll: function() {
    // Find which section is currently most visible in viewport
    let currentSection = null;
    let maxVisibility = 0;
    
    this.sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the section is visible
      const visibleTop = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
      const visibilityRatio = visibleTop / viewportHeight;
      
      // Section is considered "current" if it's the most visible
      if (visibilityRatio > maxVisibility) {
        maxVisibility = visibilityRatio;
        currentSection = section.id;
      }
    });
    
    // Update active state if we found a current section
    if (currentSection) {
      this.updateActiveState(currentSection);
    }
  },
  
  /**
   * Initialize read-more functionality for art portfolio items
   */
  initReadMore: function() {
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
      // Handle click events
      button.addEventListener('click', function() {
        Navigation.toggleReadMore(this);
      });
      
      // Handle keyboard events (Enter and Space)
      button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          Navigation.toggleReadMore(this);
        }
      });
    });
  },
  
  /**
   * Toggle read-more content visibility
   * @param {HTMLElement} button - The read-more button element
   */
  toggleReadMore: function(button) {
    // Find the full content div (next sibling of the button)
    const fullContent = button.nextElementSibling;
    
    if (!fullContent || !fullContent.classList.contains('art-full-content')) {
      return;
    }
    
    // Toggle the hidden attribute
    const isHidden = fullContent.hasAttribute('hidden');
    
    if (isHidden) {
      // Show content
      fullContent.removeAttribute('hidden');
      button.setAttribute('aria-expanded', 'true');
      button.textContent = 'Read Less';
    } else {
      // Hide content
      fullContent.setAttribute('hidden', '');
      button.setAttribute('aria-expanded', 'false');
      button.textContent = 'Read More';
    }
  }
};

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Navigation.init());
} else {
  Navigation.init();
}
