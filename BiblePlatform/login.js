/**
 * BibleStudy Login Page - Interactive Features
 * 
 * This script handles:
 * 1. Theme switching between light/dark modes
 * 2. Mobile menu toggle
 * 3. Form validation
 * 4. Scroll-to-top button
 */

document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle Functionality
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  htmlElement.setAttribute('data-theme', savedTheme);
  
  // Theme toggle click handler
  themeToggle.addEventListener('click', function() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
  
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navbarLinks = document.getElementById('navbar-links');
  
  menuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    navbarLinks.classList.toggle('active');
  });
  
  // Form Validation
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset previous errors
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(el => el.textContent = '');
      
      // Validate email
      const email = document.getElementById('email');
      const emailError = document.getElementById('email-error');
      if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        email.focus();
        return;
      }
      
      // Validate password
      const password = document.getElementById('password');
      const passwordError = document.getElementById('password-error');
      if (!password.value || password.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        password.focus();
        return;
      }
      
      // Validate role
      const role = document.getElementById('role');
      const roleError = document.getElementById('role-error');
      if (!role.value) {
        roleError.textContent = 'Please select your role';
        role.focus();
        return;
      }
      
      // If all validations pass, submit the form
      alert('Login successful! Redirecting...');
      // In a real application, you would submit the form to the server here
      // loginForm.submit();
    });
  }
  
  // Scroll-to-top Button
  const scrollTopButton = document.getElementById('scroll-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopButton.classList.add('visible');
    } else {
      scrollTopButton.classList.remove('visible');
    }
  });
  
  scrollTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Handle Google Sign-In (placeholder)
  function handleGoogleSignIn(response) {
    console.log('Google sign-in response:', response);
    // In a real application, you would handle the Google sign-in response here
  }
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.navbar-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navbarLinks.classList.contains('active')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navbarLinks.classList.remove('active');
      }
    });
  });
});
