// Toggle dark mode
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load from local storage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
/* Scroll-trigger animation */
window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.mv-item');
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const threshold = window.innerHeight - 100;
    if (top < threshold) {
      el.classList.add('show');
    }
  });
});
// Animate virtue buttons on scroll
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".virtue-btn");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, { threshold: 0.4 });

  buttons.forEach(btn => observer.observe(btn));
});
