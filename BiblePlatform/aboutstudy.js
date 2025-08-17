// Theme Toggle Functionality
(function() {
  // Get theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Theme toggle click handler
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
})();

// Mobile Menu Toggle
(function() {
  const menuToggle = document.getElementById('menu-toggle');
  const navbarLinks = document.getElementById('navbar-links');
  
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navbarLinks.classList.toggle('active');
    
    // Toggle hamburger animation
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    if (!isExpanded) {
      hamburgerLines[0].style.transform = 'translateY(8px) rotate(45deg)';
      hamburgerLines[1].style.opacity = '0';
      hamburgerLines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
      hamburgerLines.forEach(line => {
        line.style.transform = '';
        line.style.opacity = '';
      });
    }
  });
})();

// Scroll to Top Button
(function() {
  const scrollTopBtn = document.getElementById('scroll-top');
  
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
})();

// Newsletter Form Validation
(function() {
  const newsletterForm = document.getElementById('newsletter-form');
  if (!newsletterForm) return;
  
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const messageEl = document.getElementById('newsletter-message');
    
    // Simple email validation
    if (!emailInput.value || !emailInput.value.includes('@')) {
      messageEl.textContent = 'Please enter a valid email address';
      messageEl.style.color = 'var(--primary)';
      return;
    }
    
    // Simulate form submission
    messageEl.textContent = 'Thank you for subscribing!';
    messageEl.style.color = 'green';
    emailInput.value = '';
    
    // Reset message after 5 seconds
    setTimeout(() => {
      messageEl.textContent = '';
    }, 5000);
  });
})();

// Smooth scrolling for anchor links
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });
})();
