// Define sample data for the tutor dashboard
const tutorData = {
  courses: [ // List of courses created by tutor
    "Book of Romans Explained",
    "Old Testament Prophets",
    "New Testament Church Foundations"
  ],
  learners: 34, // Total number of enrolled students
  quizzes: 7 // Total number of quizzes created
};

// Function to populate tutor dashboard
function populateDashboard() {
  // Display number of courses
  document.getElementById('totalCourses').textContent = tutorData.courses.length;

  // Display number of learners
  document.getElementById('totalLearners').textContent = tutorData.learners;

  // Display number of quizzes created
  document.getElementById('totalQuizzes').textContent = tutorData.quizzes;

  // Reference to course list container
  const courseList = document.getElementById('courseList');

  // Clear any previous list items
  courseList.innerHTML = '';

  // Loop through each course title
  tutorData.courses.forEach(course => {
    // Create a list item element
    const li = document.createElement('li');

    // Set course title as list item text
    li.textContent = course;

    // Append the list item to the course list
    courseList.appendChild(li);
  });
}

// Wait for DOM to load before executing
document.addEventListener('DOMContentLoaded', populateDashboard);
