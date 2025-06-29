// Define sample admin data
const adminStats = {
  users: 120, // Total number of users on the platform
  courses: 45, // Total number of published courses
  donations: 87000, // Total donation amount in KSH
  newUsers: [ // List of newly registered users
    "peter.kimani@example.com",
    "grace.nduta@example.com",
    "moses.okoth@example.com"
  ]
};

// Function to populate the admin dashboard with data
function loadAdminDashboard() {
  // Set total users count in dashboard
  document.getElementById('totalUsers').textContent = adminStats.users;

  // Set total courses count in dashboard
  document.getElementById('activeCourses').textContent = adminStats.courses;

  // Set total donation value in dashboard
  document.getElementById('totalDonations').textContent = adminStats.donations.toLocaleString(); // Format as currency

  // Reference to the new user list container
  const userList = document.getElementById('userList');

  // Clear previous list items (if any)
  userList.innerHTML = '';

  // Loop through each new user
  adminStats.newUsers.forEach(userEmail => {
    // Create a list item element
    const li = document.createElement('li');

    // Set the email as text content
    li.textContent = userEmail;

    // Append the list item to the user list
    userList.appendChild(li);
  });
}

// Run the function after DOM is loaded
document.addEventListener('DOMContentLoaded', loadAdminDashboard);
