const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('.choice-button');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');
const drawsDisplay = document.getElementById('draws');
const resetButton = document.getElementById('reset');
const playAgainButton = document.getElementById('play-again');
const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const drawSound = document.getElementById('draw-sound');

let userChoice;
let computerChoice;
let result;
let wins = 0;
let losses = 0;
let draws = 0;

// Emoji representations
const emojis = {
  rock: '🗻',
  paper: '📄',
  scissors: '✂️',
  win: '🎉',
  lose: '😢',
  draw: '🤝'
};

// Add event listeners to buttons
possibleChoices.forEach(possibleChoice =>
  possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = emojis[userChoice];
    playSound('click');
    countdown(() => {
      generateComputerChoice();
      displayChoices();
      getResult();
      updateScoreboard();
      showPlayAgainButton();
    });
  })
);

// Countdown timer
function countdown(callback) {
  let countdownNumber = 3;
  resultDisplay.innerHTML = `Starting in ${countdownNumber}...`;
  const interval = setInterval(() => {
    countdownNumber--;
    resultDisplay.innerHTML = `Starting in ${countdownNumber}...`;
    if (countdownNumber <= 0) {
      clearInterval(interval);
      callback();
    }
  }, 1000); // Countdown interval
}

// Generate a random choice for the computer
function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;

  if (randomNumber === 1) {
    computerChoice = 'rock';
  } else if (randomNumber === 2) {
    computerChoice = 'scissors';
  } else if (randomNumber === 3) {
    computerChoice = 'paper';
  }
  computerChoiceDisplay.innerHTML = emojis[computerChoice];
}

// Display choices with animation
function displayChoices() {
  userChoiceDisplay.innerHTML = emojis[userChoice];
  computerChoiceDisplay.innerHTML = emojis[computerChoice];
  userChoiceDisplay.classList.add('show-choice');
  computerChoiceDisplay.classList.add('show-choice');
  setTimeout(() => {
    userChoiceDisplay.classList.remove('show-choice');
    computerChoiceDisplay.classList.remove('show-choice');
  }, 500); // Duration should match animation
}

// Determine the result
function getResult() {
  if (computerChoice === userChoice) {
    result = `It's a draw! ${emojis.draw}`;
    draws++;
    playSound('draw');
  } else if (
    (computerChoice === 'rock' && userChoice === 'paper') ||
    (computerChoice === 'paper' && userChoice === 'scissors') ||
    (computerChoice === 'scissors' && userChoice === 'rock')
  ) {
    result = `You win! ${emojis.win}`;
    wins++;
    playSound('win');
  } else {
    result = `You lose! ${emojis.lose}`;
    losses++;
    playSound('lose');
  }
  resultDisplay.innerHTML = result;
}

// Update the scoreboard
function updateScoreboard() {
  winsDisplay.innerText = `Wins: ${wins}`;
  lossesDisplay.innerText = `Losses: ${losses}`;
  drawsDisplay.innerText = `Draws: ${draws}`;
}

// Show the play-again button
function showPlayAgainButton() {
  playAgainButton.style.display = 'block';
}

// Hide the play-again button
function hidePlayAgainButton() {
  playAgainButton.style.display = 'none';
}

// Play a sound based on the action
function playSound(sound) {
  if (sound === 'click') {
    clickSound.play();
  } else if (sound === 'win') {
    winSound.play();
  } else if (sound === 'lose') {
    loseSound.play();
  } else if (sound === 'draw') {
    drawSound.play();
  }
}

// Reset the game
resetButton.addEventListener('click', () => {
  wins = 0;
  losses = 0;
  draws = 0;
  // updateScoreboard();
  hidePlayAgainButton();
  userChoiceDisplay.innerHTML = '';
  computerChoiceDisplay.innerHTML = '';
  resultDisplay.innerHTML = '';
});

// Play again
playAgainButton.addEventListener('click', () => {
  hidePlayAgainButton();
  userChoiceDisplay.innerHTML = '';
  computerChoiceDisplay.innerHTML = '';
  resultDisplay.innerHTML = '';
});
