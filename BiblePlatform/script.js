// Wait until the full page DOM is loaded before running any script
document.addEventListener('DOMContentLoaded', () => {

  // ===============================
  // 1. Mobile Navigation Toggle
  // ===============================

  // Select the hamburger menu button using its ID
  const menuToggle = document.getElementById('menu-toggle');

  // Select the navigation links container
  const navLinks = document.querySelector('.nav-links');

  // Add click event to toggle mobile nav visibility
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show'); // Show/hide nav menu
  });


  // ===============================
  // 2. Hero Section Button Actions
  // ===============================

  // 'Get Started' button
  const getStartedBtn = document.getElementById('get-started');

  // 'Explore Courses' button
  const exploreCoursesBtn = document.getElementById('explore-courses');

  // Redirect to signup page when Get Started button is clicked
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      window.location.href = 'signup.html'; // Navigate to signup
    });
  }

  // Redirect to courses page when Explore Courses button is clicked
  if (exploreCoursesBtn) {
    exploreCoursesBtn.addEventListener('click', () => {
      window.location.href = 'courses.html'; // Navigate to courses
    });
  }


  // =====================================
  // 3. Smooth Scroll for Internal Links
  // =====================================

  // Select all anchor links that start with '#'
  const smoothLinks = document.querySelectorAll('a[href^="#"]');

  // Add smooth scroll to each internal anchor link
  smoothLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default jump to anchor

      const targetId = link.getAttribute('href').substring(1); // Remove '#' from href
      const targetSection = document.getElementById(targetId); // Get target section

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth', // Smooth scrolling
          block: 'start' // Align to top
        });
      }
    });
  });


  // =========================================
  // 4. Newsletter Form Validation and Alert
  // =========================================

  // Select the newsletter form (if present)
  const newsletterForm = document.getElementById('newsletter-form');

  // If the newsletter form exists, handle submit
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent form from reloading page

      // Select email input field
      const emailInput = document.getElementById('email-input');

      // Get the entered email value
      const email = emailInput.value.trim();

      // Basic validation for email format
      if (email.length > 5 && email.includes('@') && email.includes('.')) {
        alert("Thank you for subscribing to our newsletter!"); // Show success message
        newsletterForm.reset(); // Clear input field
      } else {
        alert("Please enter a valid email address."); // Show error message
      }
    });
  }


  // =============================
  // 5. Back to Top Button Logic
  // =============================

  // Select the back to top button if it exists
  const backToTop = document.getElementById('back-to-top');

  // If the button exists, monitor scroll to toggle its visibility
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible'); // Show button after scrolling down
      } else {
        backToTop.classList.remove('visible'); // Hide button if near top
      }
    });

    // Scroll to top when the button is clicked
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0, // Scroll to the top of the page
        behavior: 'smooth' // Animate the scroll
      });
    });
  }


  // =================================
  // 6. Simple Modal Popup Controller
  // =================================

  // Select the modal container
  const modal = document.getElementById('modal');

  // Select the modal open button (e.g., from hero or footer)
  const openModalBtn = document.getElementById('open-modal');

  // Select the modal close button (X)
  const closeModalBtn = document.getElementById('close-modal');

  // If modal and open button exist, open modal on click
  if (modal && openModalBtn) {
    openModalBtn.addEventListener('click', () => {
      modal.style.display = 'block'; // Show modal
    });
  }

  // Close modal when X button is clicked
  if (modal && closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none'; // Hide modal
    });
  }

  // Also close modal when user clicks outside the modal content
  if (modal) {
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none'; // Hide modal if clicked outside
      }
    });
  }

});
