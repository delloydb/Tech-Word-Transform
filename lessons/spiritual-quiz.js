document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quizForm');
  const resultDiv = document.getElementById('result');
  const homeButton = document.getElementById('homeButton');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const questions = document.querySelectorAll('.question-block');
  const totalQuestions = questions.length;

  let currentQuestion = 0;

  // Correct answers
  const answers = {
    q1: 'a',
    q2: 'b',
    q3: 'a',
    q4: 'c',
    q5: 'b',
    q6: 'c',
    q7: 'a',
    q8: 'b',
    q9: 'c',
    q10: 'a'
  };

  // Show only one question at a time
  function showQuestion(index) {
    questions.forEach((q, i) => {
      q.style.display = i === index ? 'block' : 'none';
    });

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === totalQuestions - 1;
  }

  // Initial display
  showQuestion(currentQuestion);

  // Navigation buttons
  nextBtn.addEventListener('click', () => {
    if (currentQuestion < totalQuestions - 1) {
      currentQuestion++;
      showQuestion(currentQuestion);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
    }
  });

  // Submit form and calculate results
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let score = 0;
    const missed = [];

    for (let key in answers) {
      const selected = form[key]?.value;
      if (selected === answers[key]) {
        score++;
      } else {
        missed.push({
          question: key,
          correct: answers[key],
          selected: selected || 'none'
        });
      }
    }

    let feedback = `<p>You scored <strong>${score} / ${totalQuestions}</strong></p>`;

    if (missed.length > 0) {
      feedback += `<p>You missed the following questions:</p><ul>`;
      missed.forEach((item) => {
        const qNum = item.question.replace('q', '');
        feedback += `<li>Question ${qNum}: Correct answer is <strong>${item.correct.toUpperCase()}</strong>, you chose <strong>${item.selected.toUpperCase()}</strong></li>`;
      });
      feedback += `</ul>`;
    } else {
      feedback += `<p>Excellent! You got everything correct! 🎉</p>`;
    }

    resultDiv.innerHTML = feedback;
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });

  // Return to home button
  homeButton.addEventListener('click', () => {
    window.location.href = '/BiblePlatform/spiritual-content.html'; // Change this if your home page has a different filename
  });
});
