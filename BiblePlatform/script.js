/**
 * BibleStudy Platform - Main JavaScript File
 * Contains all interactive functionality for the website
 */

// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initThemeToggle();
  initMobileMenu();
  initScrollToTop();
  initFAQAccordion();
  initNewsletterForm();
  initCountUpAnimation();
});

/**
 * Theme Toggle Functionality
 * Switches between light and dark theme and saves preference
 */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // Apply saved theme
  htmlElement.setAttribute('data-theme', savedTheme);
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/**
 * Mobile Menu Toggle Functionality
 * Handles the responsive navigation menu
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navbarLinks = document.getElementById('navbar-links');
  
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navbarLinks.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  });
  
  // Close menu when clicking on a link
  navbarLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      navbarLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Scroll to Top Button Functionality
 * Shows/hides button based on scroll position and handles smooth scrolling
 */
function initScrollToTop() {
  const scrollButton = document.getElementById('scroll-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  });
  
  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * FAQ Accordion Functionality
 * Handles the expand/collapse behavior of FAQ items
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      
      // Toggle the clicked item
      question.setAttribute('aria-expanded', !isExpanded);
      item.setAttribute('aria-expanded', !isExpanded);
      
      // Close other open items
      if (!isExpanded) {
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.setAttribute('aria-expanded', 'false');
            otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  });
}

/**
 * Newsletter Form Handling
 * Handles form submission and validation
 */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const messageElement = document.getElementById('newsletter-message');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple email validation
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      showFormMessage(messageElement, 'Please enter a valid email address', 'error');
      return;
    }
    
    // Simulate form submission
    showFormMessage(messageElement, 'Thank you for subscribing!', 'success');
    emailInput.value = '';
    
    // In a real implementation, you would send the data to your server here
    // Example: fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
  });
  
  function showFormMessage(element, message, type) {
    element.textContent = message;
    element.style.color = type === 'error' ? 'var(--primary)' : 'var(--secondary)';
    
    // Clear message after 5 seconds
    setTimeout(() => {
      element.textContent = '';
    }, 5000);
  }
}

/**
 * Count Up Animation for Stats
 * Animates numbers counting up when section comes into view
 */
function initCountUpAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (!statNumbers.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count'));
        const duration = 2000; // Animation duration in ms
        const startTime = performance.now();
        
        function animateCount(currentTime) {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const currentCount = Math.floor(progress * countTo);
          
          target.textContent = currentCount.toLocaleString();
          
          if (progress < 1) {
            requestAnimationFrame(animateCount);
          }
        }
        
        requestAnimationFrame(animateCount);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(number => {
    observer.observe(number);
  });
}
