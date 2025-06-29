// Get progress elements
const progressFill = document.getElementById("progressFill");
const lessonLinks = document.querySelectorAll(".lesson-links a");

// Store clicked lessons in local storage (for simplicity)
const completedLessonsKey = "completedLessons";

// Initialize progress bar on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeProgress();
});

// Calculate and display progress
function initializeProgress() {
  let completed = JSON.parse(localStorage.getItem(completedLessonsKey)) || [];

  lessonLinks.forEach(link => {
    if (completed.includes(link.href)) {
      link.classList.add("completed");
    }

    link.addEventListener("click", () => {
      const url = link.href;
      if (!completed.includes(url)) {
        completed.push(url);
        localStorage.setItem(completedLessonsKey, JSON.stringify(completed));
      }
    });
  });

  const progressPercent = Math.round((completed.length / lessonLinks.length) * 100);
  progressFill.style.width = `${progressPercent}%`;
}

// Navigation button handlers
function goToPreviousLesson() {
  // Replace with actual navigation logic
  alert("Going to the previous lesson...");
  // location.href = "previous-lesson.html";
}

function goToNextLesson() {
  // Replace with actual navigation logic
  alert("Going to the next lesson...");
  // location.href = "next-lesson.html";
}

function goToQuizPage() {
  // Replace with actual quiz page link
  location.href = "quiz-page.html";
}

// Optionally: Add responsive navbar toggle logic here later if needed
