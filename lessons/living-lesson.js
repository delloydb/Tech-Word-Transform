/* script.js */
(function() {
  'use strict';

  // Data structure: courses array, each with a title and lessons array
  const courses = [
    {
      title: 'Faith Foundations',
      lessons: [
        {
          title: 'Understanding Faith',
          subtopics: [
            'Definition of Faith',
            'Faith in the Old vs. New Testament',
            'Faith and Works',
            'Faith as Trust and Assurance'
          ],
          insights: [
            'Faith is relational trust in God’s character and promises.',
            'Hebrews 11:1 describes faith as assurance and conviction of the unseen.',
            'True faith expresses itself through actions (James 2:17).',
            'Faith grows through hearing God’s Word and seeing answered prayers.'
          ],
          funFacts: [
            'The Hebrew word for faith, ‘emunah’, conveys firmness and stability.',
            'Abraham is called the father of all who believe (Romans 4:11).'
          ],
          discoveries: [
            'Archaeological inscriptions in Sinai reference covenantal faithfulness.',
            'Psychological studies link strong faith with increased resilience.'
          ]
        },
        // add other 2 lessons here...
      ]
    },
    // add other course objects here...
  ];

  let currentCourse = 0;
  let currentLesson = 0;

  // DOM elements
  const courseSelect = document.getElementById('course-select');
  const titleEl = document.getElementById('lesson-title');
  const subEl   = document.getElementById('lesson-subtopics');
  const insEl   = document.getElementById('lesson-insights');
  const factEl  = document.getElementById('lesson-funfacts');
  const discEl  = document.getElementById('lesson-discoveries');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  /**
   * Populate the course selector dropdown
   */
  function initCourseSelector() {
    courses.forEach((course, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = course.title;
      courseSelect.appendChild(option);
    });
    courseSelect.addEventListener('change', onCourseChange);
  }

  /**
   * Handle course change: reset lesson index and render
   */
  function onCourseChange() {
    currentCourse = parseInt(courseSelect.value, 10);
    currentLesson = 0;
    renderLesson();
  }

  /**
   * Render the current lesson of the selected course
   */
  function renderLesson() {
    const lesson = courses[currentCourse].lessons[currentLesson];
    titleEl.textContent = lesson.title;
    subEl.innerHTML = lesson.subtopics.map(item => `<li>${item}</li>`).join('');
    insEl.innerHTML = lesson.insights.map(item => `<li>${item}</li>`).join('');
    factEl.innerHTML = lesson.funFacts.map(item => `<li>${item}</li>`).join('');
    discEl.innerHTML = lesson.discoveries.map(item => `<li>${item}</li>`).join('');

    // Button states
    prevBtn.disabled = currentLesson === 0;
    nextBtn.disabled = currentLesson === courses[currentCourse].lessons.length - 1;
  }

  // Navigation handlers
  prevBtn.addEventListener('click', () => {
    if (currentLesson > 0) currentLesson--;
    renderLesson();
  });
  nextBtn.addEventListener('click', () => {
    if (currentLesson < courses[currentCourse].lessons.length - 1) currentLesson++;
    renderLesson();
  });

  // Initialize on DOM loaded
  document.addEventListener('DOMContentLoaded', () => {
    initCourseSelector();
    renderLesson();
  });
})();
