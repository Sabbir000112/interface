document.addEventListener('DOMContentLoaded', function() {
  const gameDiv = document.getElementById('game');
  let incorrectGuesses = 0;
  let lim1, lim2;

  // Initialize the game by asking for game type
  gameDiv.innerHTML += `
      <div id="gameTypeDiv">
          <img src="guessing.jpg" class="icon" alt="Game Icon">
          <label for="gameType">Choose Game Type (A for Alphabet, N for Number):</label>
          <input type="text" id="gameType">
          <button id="submitGameType">Submit</button>
      </div>
  `;

  document.getElementById('submitGameType').addEventListener('click', startGame);

  function startGame() {
      const gameType = document.getElementById('gameType').value.toUpperCase();

      if (gameType === 'N') {
          gameDiv.innerHTML = ''; // Clear previous inputs
          showNumberLimitInput();
      } else if (gameType === 'A') {
          gameDiv.innerHTML = ''; // Clear previous inputs
          setupAlphabetGuessingGame();
      } else {
          gameDiv.innerHTML += '<p>Invalid input. Please enter A or N.</p>';
      }
  }

  function showNumberLimitInput() {
      gameDiv.innerHTML += `
          <div>
              <p>Enter number limit from:</p>
              <input type="number" id="lim1">
          </div>
          <div>
              <p>Enter number limit to:</p>
              <input type="number" id="lim2">
              <button id="submitLimits">Submit Limits</button>
          </div>
          <div id="numberGuessSection"></div>
          <div id="limitFeedback"></div> <!-- Added feedback for limit validation -->
      `;

      document.getElementById('submitLimits').addEventListener('click', function() {
          lim1 = parseInt(document.getElementById('lim1').value);
          lim2 = parseInt(document.getElementById('lim2').value);

          // Validate the limits
          if (isNaN(lim1) || isNaN(lim2) || lim1 >= lim2) {
              document.getElementById('limitFeedback').innerHTML = '<p>Invalid limits. Please enter valid numbers with lim1 less than lim2.</p>';
              return;
          }

          gameDiv.innerHTML = ''; // Clear the limit inputs
          numberGuessingGame();
      });
  }

  function numberGuessingGame() {
      const numberGuessSection = document.getElementById('game');
      numberGuessSection.innerHTML = `
  <div>
      <img src="guessing.jpg" class="icon" alt="Guess Icon">
      <p id="inputGuessMessage">Enter your guess:</p>
      <input type="number" id="numGuess">
      <button id="submitNumGuess">Submit Guess</button>
      <div id="numberFeedback"></div>
  </div>
`;

      document.getElementById('submitNumGuess').addEventListener('click', function() {
          const num = parseInt(document.getElementById('numGuess').value);
          submitNumberGuess(num);
          document.getElementById('numGuess').value = ''; // Clear the guess input after submission
      });
  }

  function submitNumberGuess(num) {
      const randomNumber = Math.floor(Math.random() * (lim2 - lim1 + 1)) + lim1;
      const feedbackDiv = document.getElementById('numberFeedback');

      if (num < lim1 || num > lim2 || isNaN(num)) {
          feedbackDiv.innerHTML = '<p>Invalid input. Please enter a number within your entered limit.</p>';
          return;
      }

      incorrectGuesses++;

      if (num === randomNumber) {
          feedbackDiv.innerHTML = `<p>You tried ${incorrectGuesses} times and finally won. Lots of hard work. Well done!</p>`;
          disableInputFields(); // Disable input fields after game ends
      } else {
          feedbackDiv.innerHTML = '<p>Incorrect guess, try again.</p>';
          feedbackDiv.classList.remove('blink');
          void feedbackDiv.offsetWidth; // Trigger reflow to restart the animation
          feedbackDiv.classList.add('blink');
      }
  }

  function setupAlphabetGuessingGame() {
      gameDiv.innerHTML += `
          <div id="alphabetGuessSection">
              <img src="guessing.jpg" class="icon" alt="Alphabet Icon">
              <p id="inputGuessMessage">Enter your guess (A-Z):</p>
              <input type="text" id="letterGuess" maxlength="1">
              <button id="submitLetterGuess">Submit Guess</button>
              <div id="alphabetFeedback"></div>
          </div>
      `;

      document.getElementById('submitLetterGuess').addEventListener('click', function() {
          const guess = document.getElementById('letterGuess').value.toUpperCase();
          alphabetGuessingGame(guess);
          document.getElementById('letterGuess').value = ''; // Clear the guess input after submission
      });
  }

  function alphabetGuessingGame(guess) {
     const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); 
      const feedbackDiv = document.getElementById('alphabetFeedback');

      if (guess < 'A' || guess > 'Z' || guess.length === 0) {
          feedbackDiv.innerHTML = '<p>Invalid input. Please enter a letter between A and Z.</p>';
          return;
      }

      incorrectGuesses++;

      if (guess === randomLetter) {
          feedbackDiv.innerHTML = `<p>You tried ${incorrectGuesses} times and finally won. Lots of hard work. Well done!</p>`;
          disableInputFields(); // Disable input fields after game ends
      } else {
          feedbackDiv.innerHTML = '<p>Incorrect guess, try again.</p>';
          feedbackDiv.classList.remove('blink');
          void feedbackDiv.offsetWidth; // Trigger reflow to restart the animation
          feedbackDiv.classList.add('blink');
      }
  }

  function disableInputFields() {
      const inputs = document.querySelectorAll('input');
      const buttons = document.querySelectorAll('button');
      const guessMessage = document.getElementById('inputGuessMessage'); // Select the "Input your guess" message
  
      inputs.forEach(input => {
          input.disabled = true;  // Disable all input fields
          input.style.display = 'none';  // Hide all input fields
      });
  
      buttons.forEach(button => {
          button.disabled = true;  // Disable all buttons
          button.style.display = 'none';  // Hide all buttons
      });
  
      if (guessMessage) {
          guessMessage.style.display = 'none';  // Hide only the "Input your guess" message
      }
  }
  
  
});
