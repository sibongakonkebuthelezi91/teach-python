const choices = document.querySelectorAll('.choices');
const quizCards = document.querySelectorAll('.quiz-card');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const starCount = document.getElementById('starCount');

let answeredCount = 0;
let starsEarned = 0;

function updateProgress() {
  const total = quizCards.length;
  const percent = Math.round((answeredCount / total) * 100);
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `${answeredCount} / ${total} challenges completed`;
  starCount.textContent = `⭐ ${starsEarned}`;
}

choices.forEach((group) => {
  group.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button || group.dataset.answered === 'true') return;

    const feedback = group.nextElementSibling;
    const correctAnswer = group.dataset.correct;
    const buttons = group.querySelectorAll('button');

    group.dataset.answered = 'true';
    buttons.forEach((btn) => {
      btn.disabled = true;
      btn.classList.remove('is-selected');
    });

    button.classList.add('is-selected');
    button.disabled = false;

    if (button.textContent.trim() === correctAnswer) {
      feedback.textContent = 'Correct! You earned a star ⭐';
      feedback.style.color = '#34d399';
      starsEarned += 1;
    } else {
      feedback.textContent = 'Almost! Try the game analogy again.';
      feedback.style.color = '#fda4af';
    }

    answeredCount += 1;
    updateProgress();
  });
});

updateProgress();
