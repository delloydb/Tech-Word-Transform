/**
 * Login Page JavaScript
 * Handles form validation, submission, and Google Sign-In functionality
 */

// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {
  // Reference to the login form
  const loginForm = document.getElementById('loginForm');
  
  // Reference to form fields
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const roleSelect = document.getElementById('role');
  
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  /**
   * Validate the login form
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    let isValid = true;
    
    // Validate email
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Email is required');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    } else {
      showSuccess(emailInput);
    }
    
    // Validate password
    if (!passwordInput.value.trim()) {
      showError(passwordInput, 'Password is required');
      isValid = false;
    } else if (passwordInput.value.trim().length < 6) {
      showError(passwordInput, 'Password must be at least 6 characters');
      isValid = false;
    } else {
      showSuccess(passwordInput);
    }
    
    // Validate role selection
    if (!roleSelect.value) {
      showError(roleSelect, 'Please select your interest');
      isValid = false;
    } else {
      showSuccess(roleSelect);
    }
    
    return isValid;
  };
  
  /**
   * Display error message for an input field
   * @param {HTMLElement} input - The input element
   * @param {string} message - The error message to display
   */
  const showError = (input, message) => {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    
    // Check if error message already exists
    let errorMessage = formGroup.querySelector('.error-message');
    if (!errorMessage) {
      errorMessage = document.createElement('p');
      errorMessage.className = 'error-message';
      formGroup.appendChild(errorMessage);
    }
    
    errorMessage.textContent = message;
    errorMessage.style.color = '#dc3545';
    errorMessage.style.fontSize = '0.8rem';
    errorMessage.style.marginTop = '0.25rem';
  };
  
  /**
   * Remove error styling and message from an input field
   * @param {HTMLElement} input - The input element
   */
  const showSuccess = (input) => {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  };
  
  /**
   * Handle form submission
   * @param {Event} e - The submit event
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid - proceed with login
      const role = roleSelect.value;
      const roleDisplay = role.charAt(0).toUpperCase() + role.slice(1);
      
      // In a real application, you would send this data to your server
      console.log('Login attempt with:', {
        email: emailInput.value.trim(),
        password: '••••••', // Never log actual passwords
        role: role
      });
      
      // Show loading state
      const submitButton = loginForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Logging in...';
      submitButton.disabled = true;
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Redirect based on role (simulated success)
        switch (role) {
          case 'learner':
            window.location.href = 'dashboard-learner.html';
            break;
          case 'tutor':
            window.location.href = 'dashboard-tutor.html';
            break;
          case 'community':
            window.location.href = 'dashboard-community.html';
            break;
          default:
            window.location.href = 'dashboard.html';
        }
      }, 1500);
    }
  };
  
  /**
   * Handle Google Sign-In response
   * @param {Object} response - The Google Sign-In response object
   */
  window.handleGoogleSignIn = (response) => {
    console.log('Google Sign-In response:', response);
    
    // Extract the credential (JWT)
    const credential = response.credential;
    
    // In a real application, you would send this credential to your server
    // for verification and user authentication
    
    // For demo purposes, we'll just show an alert and redirect
    alert('Google Sign-In successful! Redirecting to dashboard...');
    window.location.href = 'dashboard.html';
  };
  
  // Add event listeners
  loginForm.addEventListener('submit', handleFormSubmit);
  
  // Add input event listeners for real-time validation
  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address');
    } else {
      showSuccess(emailInput);
    }
  });
  
  passwordInput.addEventListener('input', () => {
    if (passwordInput.value.trim() && passwordInput.value.trim().length < 6) {
      showError(passwordInput, 'Password must be at least 6 characters');
    } else {
      showSuccess(passwordInput);
    }
  });
  
  roleSelect.addEventListener('change', () => {
    if (roleSelect.value) {
      showSuccess(roleSelect);
    }
  });
});

/**
 * Notes for production implementation:
 * 1. Replace YOUR_GOOGLE_CLIENT_ID with your actual Google OAuth client ID
 * 2. Implement proper server-side validation for both email/password and Google Sign-In
 * 3. Store sensitive data securely and use HTTPS
 * 4. Add proper error handling for failed login attempts
 * 5. Consider adding rate limiting to prevent brute force attacks
 */