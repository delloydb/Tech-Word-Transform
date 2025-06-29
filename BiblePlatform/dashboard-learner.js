// Define sample data for learner dashboard
const learnerData = {
  courses: [ // Array of enrolled course titles
    "Introduction to Genesis",
    "Gospel of John Deep Dive",
    "Parables of Jesus"
  ],
  quizzesCompleted: 5, // Number of completed quizzes
  messages: 2 // Number of unread messages
};

// Function to populate dashboard metrics
function populateDashboard() {
  // Set the number of enrolled courses
  document.getElementById('courseCount').textContent = learnerData.courses.length;

  // Set the number of quizzes completed
  document.getElementById('quizCount').textContent = learnerData.quizzesCompleted;

  // Set the number of unread messages
  document.getElementById('messageCount').textContent = learnerData.messages;

  // Select the course list container
  const courseList = document.getElementById('courseList');

  // Clear any existing course items
  courseList.innerHTML = '';

  // Loop through each course and create a list item
  learnerData.courses.forEach(courseTitle => {
    // Create new list item element
    const li = document.createElement('li');
    li.textContent = courseTitle; // Set course title text
    courseList.appendChild(li); // Append to course list
  });
}

// Run the function once page is fully loaded
document.addEventListener('DOMContentLoaded', populateDashboard);
