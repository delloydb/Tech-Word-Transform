// Track clicks on lesson links
const lessonLinks = document.querySelectorAll('.lesson-links a');
const progressFill = document.getElementById('progressFill');

let clickedCount = 0;
const totalLessons = lessonLinks.length;

lessonLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (!link.classList.contains('clicked')) {
      link.classList.add('clicked');
      clickedCount++;
      updateProgress();
    }
  });
});

function updateProgress() {
  const percent = (clickedCount / totalLessons) * 100;
  progressFill.style.width = percent + '%';
}

// Navigation handlers
function goToHome() {
  window.location.href = 'index.html'; // You can change this as needed
}

function goToNextLesson() {
  window.location.href = 'next-lesson.html'; // Change to the actual next lesson URL
}

function goToQuizPage() {
  window.location.href = 'quiz-faith.html'; // Change to the quiz URL
}
