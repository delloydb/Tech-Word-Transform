// ==== Course Data ====
const courses = [
  {
    
    title: "Faith Foundations",
    description: "Build your walk on a solid biblical foundation of faith.",
    category: "beginner",
    image: "/images/faith.png", // replace with real image
    rating: 4.5,
    enrolled: 1200,
    slug: "faith-content",
  },
  {
    title: "Prophets & Promises",
    description: "Explore prophetic messages and God's faithfulness.",
    category: "intermediate",
    image: "/images/prophets.jpg",
    rating: 4.6,
    enrolled: 860,
    slug: "prophets-content",
  },
  {
    title: "Living Like Jesus",
    description: "Learn how to reflect Christ in your daily life.",
    category: "beginner",
    image: "/images/walking.jpg",
    rating: 4.8,
    enrolled: 1340,
        slug: "living-content",

  },
  {
    title: "Daniel's Visions",
    description: "Understand the apocalyptic visions of Daniel.",
    category: "advanced",
    image: "/images/vision.jpg",
    rating: 4.3,
    enrolled: 620,
        slug: "daniel-content",

  },
  {
    title: "The Gospels in Harmony",
    description: "Study the life of Jesus across all four Gospels.",
    category: "intermediate",
    image: "/images/harmony.jpg",
    rating: 4.7,
    enrolled: 950,
        slug: "gospel-content",

  },
  {
    title: "Biblical Leadership",
    description: "Lead like Jesus and biblical figures.",
    category: "advanced",
    image: "/images/leadership.jpg",
    rating: 4.5,
    enrolled: 790,
        slug: "biblical-content",

  },
  {
    title: "Christian Living",
    description: "Live out biblical principles in a modern world.",
    category: "beginner",
    image: "/images/christian.jpg",
    rating: 4.6,
    enrolled: 1120,
        slug: "christian-content",

  },
  {
    title: "Reformation History",
    description: "Trace the events that changed Church history.",
    category: "advanced",
    image: "/images/history.jpg",
    rating: 4.4,
    enrolled: 580,
        slug: "reform-content",

  },
  {
    title: "Prayer & Fasting",
    description: "Master spiritual disciplines for a deeper connection with God.",
    category: "intermediate",
    image: "/images/prayer.jpg",
    rating: 4.9,
    enrolled: 1420,
        slug: "prayer-content",

  },
  {
    title: "Spiritual Gifts",
    description: "Discover and activate your spiritual gifts.",
    category: "intermediate",
    image: "/images/gifts.jpg",
    rating: 4.7,
    enrolled: 980,
        slug: "spiritual-content",

  },
  {
    title: "Church & Community",
    description: "Grow through fellowship and community service.",
    category: "beginner",
    image: "/images/church.jpg",
    rating: 4.4,
    enrolled: 880,
        slug: "church-content",

  },
  {
    title: "Gospel of Revelation",
    description: "Unveil God’s final plan through John’s visions.",
    category: "advanced",
    image: "/images/revelation.jpg",
    rating: 4.8,
    enrolled: 1030,
        slug: "revelation-content",

  },
  {
    title: "Introduction to Genesis",
    description: "Explore the beginnings of creation and faith in Genesis.",
    category: "beginner",
    image: "/images/genesis.jpg",
    rating: 4.6,
    enrolled: 890,
        slug: "intro-content",

  },
  {
    title: "Old Testament Prophets",
    description: "Learn from the lives and messages of OT prophets.",
    category: "intermediate",
    image: "/images/oldtesta.jpg",
    rating: 4.5,
    enrolled: 720,
        slug: "old-content",

  },
  {
    title: "Understanding Revelation",
    description: "Decode the symbols and meanings in Revelation.",
    category: "advanced",
    image: "/images/understanding.jpg",
    rating: 4.7,
    enrolled: 1090,
        slug: "under-content",

  }
];

// ==== Select DOM Elements ====
const courseList = document.getElementById("courseList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// ==== Simulate Login Status ====
let isLoggedIn = false; // change this manually to true to simulate logged-in state

// ==== Render Courses ====
function displayCourses() {
  const searchQuery = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  courseList.innerHTML = ""; // Clear old content

  courses.forEach(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;

    if (matchesSearch && matchesCategory) {
      const card = document.createElement("div");
      card.classList.add("course-card");

      // Add course image
      const img = document.createElement("img");
      img.src = course.image;
      img.alt = course.title;
      img.classList.add("course-image");

      // Course content wrapper
      const content = document.createElement("div");
      content.classList.add("course-content");

      // Title
      const title = document.createElement("h3");
      title.classList.add("course-title");
      title.textContent = course.title;

      // Description
      const desc = document.createElement("p");
      desc.classList.add("course-desc");
      desc.textContent = course.description;

      // Meta info
      const meta = document.createElement("p");
      meta.classList.add("course-meta");
      meta.textContent = `⭐⭐⭐⭐⭐ ${course.rating} | 👥 ${course.enrolled} learners`;
      //button
      const btn = document.createElement("a");
      btn.classList.add("course-button");
      btn.href = `${course.slug}.html`; // Each course goes to its own file
      btn.textContent = "Study Now";

      // Append all
      content.appendChild(title);
      content.appendChild(desc);
      content.appendChild(meta);
      content.appendChild(btn);

      card.appendChild(img);
      card.appendChild(content);
      courseList.appendChild(card);
    }
  });
}

// ==== Event Listeners ====
searchInput.addEventListener("input", displayCourses);
categoryFilter.addEventListener("change", displayCourses);

// ==== On Page Load ====
document.addEventListener("DOMContentLoaded", displayCourses);

// Testimonial Carousel Logic
let currentIndex = 0;
const track = document.querySelector('.carousel-track');
const testimonials = document.querySelectorAll('.testimonial-card');

function showNextTestimonial() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  const offset = -currentIndex * 100;
  track.style.transform = `translateX(${offset}%)`;
}

// Change slide every 6 seconds
setInterval(showNextTestimonial, 6000);

// Mock form handling for testimonials
const testimonialForm = document.getElementById('testimonialForm');
const submissionMessage = document.getElementById('submissionMessage');

testimonialForm.addEventListener('submit', function(e) {
  e.preventDefault();
  submissionMessage.classList.remove('hidden');
  testimonialForm.reset();
  setTimeout(() => submissionMessage.classList.add('hidden'), 5000);
});
