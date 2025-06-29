// Wait for the entire DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get reference to form element
  const donationForm = document.getElementById('donationForm');

  // Get all preset amount buttons
  const presetButtons = document.querySelectorAll('.preset-btn');

  // Get the donation amount input field
  const amountInput = document.getElementById('amount');

  // Loop through each preset button
  presetButtons.forEach(button => {
    // Add click listener to each preset button
    button.addEventListener('click', () => {
      // Set clicked preset amount to the input field
      const selectedAmount = button.getAttribute('data-amount');
      amountInput.value = selectedAmount;
    });
  });

  // Handle form submission
  donationForm.addEventListener('submit', (event) => {
    // Prevent page reload on submit
    event.preventDefault();

    // Optional: you can collect form data here for backend use

    // Redirect user to thank you page
    window.location.href = 'thankyou.html';
  });
});
