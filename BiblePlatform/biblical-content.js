/**
 * Bible Study Platform - Course Content Page
 * Modular JavaScript for enhanced interactivity
 */

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navbarLinks = document.getElementById('navbar-links');
const scrollTopBtn = document.getElementById('scrollTop');
const accordions = document.querySelectorAll('.accordion');
const newsletterForm = document.getElementById('newsletter-form');

/**
 * Theme Toggle Functionality
 * Toggles between light and dark theme and saves preference to localStorage
 */
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/**
 * Mobile Menu Toggle
 * Handles showing/hiding the mobile navigation menu
 */
function initMobileMenu() {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navbarLinks.classList.toggle('active');
  });
}

/**
 * Scroll to Top Button
 * Shows/hides button based on scroll position and handles smooth scroll to top
 */
function initScrollTop() {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Accordion Functionality
 * Makes sections collapsible for better content organization
 */
function initAccordions() {
  accordions.forEach(accordion => {
    accordion.addEventListener('click', () => {
      accordion.classList.toggle('active');
      const content = accordion.nextElementSibling;
      
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/**
 * Form Validation
 * Handles form submission with validation and feedback
 */
function initForms() {
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      const messageEl = document.getElementById('newsletter-message');
      
      // Simple email validation
      if (!emailInput.value || !emailInput.value.includes('@')) {
        messageEl.textContent = 'Please enter a valid email address';
        messageEl.style.color = 'var(--primary)';
        emailInput.focus();
        return;
      }
      
      // Simulate successful submission
      messageEl.textContent = 'Thank you for subscribing!';
      messageEl.style.color = 'var(--secondary)';
      emailInput.value = '';
      
      // Reset message after 5 seconds
      setTimeout(() => {
        messageEl.textContent = '';
      }, 5000);
    });
  }
}

/**
 * Initialize Lesson Progress
 * Simulates progress tracking (would be connected to backend in production)
 */
function initProgress() {
  // In a real app, this would come from user data
  const progressFill = document.getElementById('progressFill');
  let progress = 25;
  
  // Simulate progress increase when marking as complete
  const markCompleteBtn = document.querySelector('.mark-complete');
  if (markCompleteBtn) {
    markCompleteBtn.addEventListener('click', () => {
      if (progress < 100) {
        progress += 25;
        progressFill.style.width = `${progress}%`;
        progressFill.setAttribute('aria-valuenow', progress);
        document.querySelector('.progress-text').textContent = `${progress}% complete`;
        
        // Update button text
        markCompleteBtn.textContent = progress === 100 ? 'Course Completed!' : 'Mark as Complete';
      }
    });
  }
}

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initScrollTop();
  initAccordions();
  initForms();
  initProgress();
  
  // Placeholder functions for navigation (would be implemented in a SPA)
  window.goToHome = () => {
    console.log('Navigating to home');
    // window.location.href = '/';
  };
  
  window.goToNextLesson = () => {
    console.log('Navigating to next lesson');
    // window.location.href = '/lessons/biblical-lesson2.html';
  };
});
