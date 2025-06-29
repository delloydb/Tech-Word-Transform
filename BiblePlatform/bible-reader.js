// Run when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Reference to dropdowns and button
  const versionSelect = document.getElementById('version-select');
  const bookSelect = document.getElementById('book-select');
  const chapterSelect = document.getElementById('chapter-select');
  const loadBtn = document.getElementById('load-btn');
  const display = document.getElementById('chapter-display');
  const bookmarksList = document.getElementById('bookmarks-list');

  // Simulated Bible data structure
  const bibleData = {
    kjv: {
      Genesis: {
        1: {
          1: "In the beginning God created the heaven and the earth.",
          2: "And the earth was without form, and void...",
          3: "And God said, Let there be light: and there was light."
        }
      }
    },
    niv: {
      Genesis: {
        1: {
          1: "In the beginning God created the heavens and the earth.",
          2: "Now the earth was formless and empty...",
          3: "And God said, 'Let there be light,' and there was light."
        }
      }
    }
  };

  // Initialize book dropdown
  function loadBooks() {
    const version = versionSelect.value;
    bookSelect.innerHTML = ''; // Clear existing options
    Object.keys(bibleData[version]).forEach(book => {
      const option = document.createElement('option'); // Create option
      option.value = book; // Set value
      option.textContent = book; // Set display text
      bookSelect.appendChild(option); // Add to dropdown
    });
    loadChapters(); // Load chapters for first book
  }

  // Load chapters based on selected book
  function loadChapters() {
    const version = versionSelect.value;
    const book = bookSelect.value;
    chapterSelect.innerHTML = ''; // Clear options
    const chapters = Object.keys(bibleData[version][book]);
    chapters.forEach(chapter => {
      const option = document.createElement('option');
      option.value = chapter;
      option.textContent = `Chapter ${chapter}`;
      chapterSelect.appendChild(option);
    });
  }

  // Load selected chapter into display
  function displayChapter() {
    const version = versionSelect.value;
    const book = bookSelect.value;
    const chapter = chapterSelect.value;
    const verses = bibleData[version][book][chapter];
    display.innerHTML = ''; // Clear display

    // Loop through all verses
    for (let verseNum in verses) {
      const verseText = verses[verseNum];
      const verseDiv = document.createElement('div');
      verseDiv.className = 'verse';
      verseDiv.dataset.ref = `${book} ${chapter}:${verseNum}`;

      // Display verse number and text
      verseDiv.innerHTML = `
        <strong>${verseNum}</strong> ${verseText}
        <div class="verse-buttons">
          <button class="highlight-btn">Highlight</button>
          <button class="bookmark-btn">Bookmark</button>
        </div>
      `;

      // Highlight toggle
      verseDiv.querySelector('.highlight-btn').addEventListener('click', () => {
        verseDiv.classList.toggle('highlighted');
      });

      // Bookmark save
      verseDiv.querySelector('.bookmark-btn').addEventListener('click', () => {
        addBookmark(verseDiv.dataset.ref, verseText);
      });

      display.appendChild(verseDiv); // Add to DOM
    }
  }

  // Add bookmark to localStorage
  function addBookmark(reference, text) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    if (!bookmarks.find(b => b.ref === reference)) {
      bookmarks.push({ ref: reference, text });
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      renderBookmarks();
    }
  }

  // Load and display bookmarks
  function renderBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarksList.innerHTML = '';
    bookmarks.forEach(bookmark => {
      const li = document.createElement('li');
      li.textContent = `${bookmark.ref}: ${bookmark.text}`;
      bookmarksList.appendChild(li);
    });
  }

  // Events
  versionSelect.addEventListener('change', loadBooks);
  bookSelect.addEventListener('change', loadChapters);
  loadBtn.addEventListener('click', displayChapter);

  // Initial load
  loadBooks();
  renderBookmarks();
});
