
 * Features:
 * - Bible version, book, and chapter selection
 * - Chapter display with verse formatting
 * - Bookmarking functionality
 * - Light/dark theme toggle
 * - Responsive navigation
 * - Scroll to top button
 * - Reading progress tracking
 */

// Bible data structure
const bibleData = {
  kjv: {
    name: "King James Version",
    books: {
      genesis: {
        name: "Genesis",
        chapters: 50,
        verses: {
          1: "1:1 In the beginning God created the heaven and the earth...",
          // Would continue with all chapters/verses
        }
      },
      // Would include all 66 books
    }
  },
  niv: {
    name: "New International Version",
    books: {
      genesis: {
        name: "Genesis",
        chapters: 50,
        verses: {
          1: "1:1 In the beginning God created the heavens and the earth...",
          // Would continue with all chapters/verses
        }
      },
      // Would include all 66 books
    }
  }
  // Additional translations would be added here
};

// DOM Elements
const versionSelect = document.getElementById('version-select');
const bookSelect = document.getElementById('book-select');
const chapterSelect = document.getElementById('chapter-select');
const loadBtn = document.getElementById('load-btn');
const randomBtn = document.getElementById('random-btn');
const chapterDisplay = document.getElementById('chapter-display');
const bookmarksList = document.getElementById('bookmarks-list');
const noBookmarks = document.getElementById('no-bookmarks');
const bookmarkBtn = document.getElementById('bookmark-btn');
const toggleBookmarks = document.getElementById('toggle-bookmarks');
const bookmarksContent = document.getElementById('bookmarks-content');
const prevChapterBtn = document.getElementById('prev-chapter');
const nextChapterBtn = document.getElementById('next-chapter');
const readingProgress = document.getElementById('reading-progress-bar');
const progressPercentage = document.getElementById('progress-percentage');
const currentBook = document.getElementById('current-book');
const currentChapter = document.getElementById('current-chapter');
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navbarLinks = document.getElementById('navbar-links');
const scrollTopBtn = document.getElementById('scroll-top');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');

// State variables
let currentVersion = 'kjv';
let currentBookId = 'genesis';
let currentChapterNum = 1;
let bookmarks = JSON.parse(localStorage.getItem('bibleBookmarks')) || [];
let readingHistory = JSON.parse(localStorage.getItem('readingHistory')) || {};

/**
 * Initialize the application
 */
function init() {
  // Populate version select
  Object.keys(bibleData).forEach(version => {
    const option = document.createElement('option');
    option.value = version;
    option.textContent = bibleData[version].name;
    versionSelect.appendChild(option);
  });

  // Populate book select
  populateBooks();

  // Set up event listeners
  setupEventListeners();

  // Load initial chapter
  loadChapter(currentBookId, currentChapterNum);

  // Load bookmarks
  renderBookmarks();

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Set up scroll listener for scroll-to-top button
  window.addEventListener('scroll', toggleScrollTopButton);
}

/**
 * Populate the book select dropdown
 */
function populateBooks() {
  bookSelect.innerHTML = '';
  const books = bibleData[currentVersion].books;
  
  Object.keys(books).forEach(bookId => {
    const option = document.createElement('option');
    option.value = bookId;
    option.textContent = books[bookId].name;
    bookSelect.appendChild(option);
  });

  // Update chapter select based on first book
  populateChapters(bookSelect.value);
}

/**
 * Populate the chapter select dropdown
 * @param {string} bookId - The ID of the book to get chapters for
 */
function populateChapters(bookId) {
  chapterSelect.innerHTML = '';
  const chapters = bibleData[currentVersion].books[bookId].chapters;
  
  for (let i = 1; i <= chapters; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    chapterSelect.appendChild(option);
  }
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
  // Version change
  versionSelect.addEventListener('change', (e) => {
    currentVersion = e.target.value;
    populateBooks();
    loadChapter(bookSelect.value, 1);
  });

  // Book change
  bookSelect.addEventListener('change', (e) => {
    currentBookId = e.target.value;
    populateChapters(currentBookId);
    loadChapter(currentBookId, 1);
  });

  // Chapter change
  chapterSelect.addEventListener('change', (e) => {
    currentChapterNum = parseInt(e.target.value);
    loadChapter(currentBookId, currentChapterNum);
  });

  // Load button
  loadBtn.addEventListener('click', () => {
    loadChapter(bookSelect.value, parseInt(chapterSelect.value));
  });

  // Random chapter button
  randomBtn.addEventListener('click', loadRandomChapter);

  // Bookmark button
  bookmarkBtn.addEventListener('click', toggleBookmark);

  // Toggle bookmarks section
  toggleBookmarks.addEventListener('click', () => {
    const isExpanded = toggleBookmarks.getAttribute('aria-expanded') === 'true';
    toggleBookmarks.setAttribute('aria-expanded', !isExpanded);
    bookmarksContent.style.display = isExpanded ? 'none' : 'block';
    toggleBookmarks.querySelector('.btn-text-label').textContent = isExpanded ? 'Expand' : 'Collapse';
  });

  // Chapter navigation
  prevChapterBtn.addEventListener('click', goToPreviousChapter);
  nextChapterBtn.addEventListener('click', goToNextChapter);

  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navbarLinks.setAttribute('aria-expanded', !isExpanded);
  });

  // Scroll to top button
  scrollTopBtn.addEventListener('click', scrollToTop);

  // Newsletter form
  newsletterForm.addEventListener('submit', handleNewsletterSubmit);
}

/**
 * Load a Bible chapter
 * @param {string} bookId - The ID of the book to load
 * @param {number} chapterNum - The chapter number to load
 */
function loadChapter(bookId, chapterNum) {
  const book = bibleData[currentVersion].books[bookId];
  if (!book || chapterNum < 1 || chapterNum > book.chapters) return;

  // Update current book/chapter
  currentBookId = bookId;
  currentChapterNum = chapterNum;

  // Update UI
  currentBook.textContent = book.name;
  currentChapter.textContent = chapterNum;
  bookSelect.value = bookId;
  chapterSelect.value = chapterNum;

  // Update chapter display
  const chapterText = book.verses[chapterNum];
  if (chapterText) {
    // Format verses (this would be more robust in a real implementation)
    const formattedText = chapterText.replace(/(\d+:\d+)/g, '<sup class="verse-number">$1</sup>');
    chapterDisplay.innerHTML = `<p>${formattedText}</p>`;
  } else {
    chapterDisplay.innerHTML = '<p class="instruction-text">Chapter text not available.</p>';
  }

  // Update chapter navigation buttons
  prevChapterBtn.disabled = chapterNum === 1;
  nextChapterBtn.disabled = chapterNum === book.chapters;

  // Update reading progress
  updateReadingProgress(bookId, chapterNum);

  // Save to reading history
  saveToReadingHistory(bookId, chapterNum);

  // Scroll to top of chapter
  chapterDisplay.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Load a random Bible chapter
 */
function loadRandomChapter() {
  const books = Object.keys(bibleData[currentVersion].books);
  const randomBookId = books[Math.floor(Math.random() * books.length)];
  const randomChapterNum = Math.floor(Math.random() * bibleData[currentVersion].books[randomBookId].chapters) + 1;
  loadChapter(randomBookId, randomChapterNum);
}

/**
 * Toggle bookmark for current chapter
 */
function toggleBookmark() {
  const bookmark = {
    version: currentVersion,
    bookId: currentBookId,
    bookName: bibleData[currentVersion].books[currentBookId].name,
    chapter: currentChapterNum,
    timestamp: new Date().toISOString()
  };

  const existingIndex = bookmarks.findIndex(b => 
    b.version === bookmark.version && 
    b.bookId === bookmark.bookId && 
    b.chapter === bookmark.chapter
  );

  if (existingIndex >= 0) {
    bookmarks.splice(existingIndex, 1);
    bookmarkBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>`;
  } else {
    bookmarks.unshift(bookmark);
    bookmarkBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>`;
  }

  localStorage.setItem('bibleBookmarks', JSON.stringify(bookmarks));
  renderBookmarks();
}

/**
 * Render bookmarks list
 */
function renderBookmarks() {
  bookmarksList.innerHTML = '';
  
  if (bookmarks.length === 0) {
    noBookmarks.style.display = 'block';
    return;
  }

  noBookmarks.style.display = 'none';
  
  bookmarks.forEach(bookmark => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${bookmark.bookName} ${bookmark.chapter}</strong>
        <small>${bibleData[bookmark.version].name}</small>
      </div>
      <div class="bookmark-actions">
        <button class="btn-load-bookmark" aria-label="Load ${bookmark.bookName} ${bookmark.chapter}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M8 16H3v5"/>
          </svg>
        </button>
        <button class="btn-delete-bookmark" aria-label="Delete bookmark for ${bookmark.bookName} ${bookmark.chapter}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>
    `;
    
    const loadBtn = li.querySelector('.btn-load-bookmark');
    const deleteBtn = li.querySelector('.btn-delete-bookmark');
    
    loadBtn.addEventListener('click', () => {
      currentVersion = bookmark.version;
      versionSelect.value = currentVersion;
      populateBooks();
      loadChapter(bookmark.bookId, bookmark.chapter);
    });
    
    deleteBtn.addEventListener('click', () => {
      bookmarks = bookmarks.filter(b => 
        !(b.version === bookmark.version && 
          b.bookId === bookmark.bookId && 
          b.chapter === bookmark.chapter)
      );
      localStorage.setItem('bibleBookmarks', JSON.stringify(bookmarks));
      renderBookmarks();
      
      // Update bookmark button if current chapter is unbookmarked
      if (bookmark.bookId === currentBookId && bookmark.chapter === currentChapterNum) {
        bookmarkBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>`;
      }
    });
    
    bookmarksList.appendChild(li);
  });
}

/**
 * Navigate to previous chapter
 */
function goToPreviousChapter() {
  if (currentChapterNum > 1) {
    loadChapter(currentBookId, currentChapterNum - 1);
  }
}

/**
 * Navigate to next chapter
 */
function goToNextChapter() {
  const maxChapter = bibleData[currentVersion].books[currentBookId].chapters;
  if (currentChapterNum < maxChapter) {
    loadChapter(currentBookId, currentChapterNum + 1);
  }
}

/**
 * Update reading progress
 * @param {string} bookId - The current book ID
 * @param {number} chapterNum - The current chapter number
 */
function updateReadingProgress(bookId, chapterNum) {
  const book = bibleData[currentVersion].books[bookId];
  const progress = (chapterNum / book.chapters) * 100;
  readingProgress.value = progress;
  progressPercentage.textContent = `${Math.round(progress)}%`;
}

/**
 * Save to reading history
 * @param {string} bookId - The book ID
 * @param {number} chapterNum - The chapter number
 */
function saveToReadingHistory(bookId, chapterNum) {
  if (!readingHistory[currentVersion]) {
    readingHistory[currentVersion] = {};
  }
  
  if (!readingHistory[currentVersion][bookId]) {
    readingHistory[currentVersion][bookId] = [];
  }
  
  if (!readingHistory[currentVersion][bookId].includes(chapterNum)) {
    readingHistory[currentVersion][bookId].push(chapterNum);
    localStorage.setItem('readingHistory', JSON.stringify(readingHistory));
  }
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

/**
 * Toggle scroll-to-top button visibility
 */
function toggleScrollTopButton() {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

/**
 * Scroll to top of page
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * Handle newsletter form submission
 * @param {Event} e - The form submission event
 */
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value;
  
  // Simple validation
  if (!email || !email.includes('@')) {
    newsletterMessage.textContent = 'Please enter a valid email address.';
    newsletterMessage.className = 'form-message error';
    return;
  }
  
  // In a real app, you would send this to a server
  newsletterMessage.textContent = 'Thank you for subscribing!';
  newsletterMessage.className = 'form-message success';
  newsletterForm.reset();
  
  // Clear message after 5 seconds
  setTimeout(() => {
    newsletterMessage.textContent = '';
    newsletterMessage.className = 'form-message';
  }, 5000);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
