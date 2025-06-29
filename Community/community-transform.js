// Wait for the entire DOM content to load before running any scripts
document.addEventListener('DOMContentLoaded', function () {

  // Select all checkboxes inside habit items
  const habitCheckboxes = document.querySelectorAll('.habit-item input[type="checkbox"]');

  // Loop through each checkbox to attach an event listener
  habitCheckboxes.forEach((checkbox) => {

    // When the checkbox is clicked
    checkbox.addEventListener('change', function () {
      // Get the parent habit item element
      const habitItem = this.closest('.habit-item');

      // Find the circle element inside the habit item
      const circle = habitItem.querySelector('.circle');

      // Parse the current streak number from the circle's text content
      let currentStreak = parseInt(circle.textContent);

      // If the checkbox is checked, increment the streak by 1
      if (this.checked) {
        currentStreak += 1; // Increase streak
      } else {
        currentStreak = Math.max(0, currentStreak - 1); // Decrease streak (never below 0)
      }

      // Update the circle with the new streak number
      circle.textContent = currentStreak;
    });
  });

  // Select the Update Progress button for active challenge
  const updateProgressBtn = document.querySelector('.track-btn');

  // Attach click event listener to the button
  updateProgressBtn.addEventListener('click', function () {
    // Display a temporary alert (placeholder for future backend integration)
    alert('Progress update feature coming soon!');
  });

  // Select the Join Discussion button in group summary section
  const joinDiscussionBtn = document.querySelector('.join-btn');

  // Attach click event listener to the button
  joinDiscussionBtn.addEventListener('click', function () {
    // Show a message or simulate redirection to the chat/discussion page
    alert('Redirecting to the group discussion room...');
    // In real implementation: window.location.href = '/group-chat.html';
  });

  // Select all action buttons in the quick actions grid
  const actionCards = document.querySelectorAll('.action-card');

  // Loop through each action card
  actionCards.forEach((card) => {
    // Add a click event listener
    card.addEventListener('click', function () {
      // Get the label of the card (text inside)
      const label = this.textContent.trim();

      // Use switch-case to determine which section to go to
      switch (label) {
        case 'Lessons':
          alert('Navigating to Lessons module...');
          // window.location.href = '/lessons.html';
          break;

        case 'Reflection Journal':
          alert('Opening Reflection Journal...');
          // window.location.href = '/journal.html';
          break;

        case 'Mentorship':
          alert('Going to Mentorship Center...');
          // window.location.href = '/mentorship.html';
          break;

        case 'Service Log':
          alert('Opening your Service Log...');
          // window.location.href = '/service-log.html';
          break;

        default:
          alert('Feature not recognized.');
      }
    });
  });

}); // End of DOMContentLoaded event listener
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });