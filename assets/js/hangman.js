// Set variables for elements from HTML page to manipulate later
const wordEl = document.getElementById("word");
const hintEl = document.getElementById("hint");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-btn");

// Variable to determine if game has ended or not, to be used to control keydown events
let gameFinish = true;

// Variables for keeping score (Checkin if its zero or not, if it's not, the value will set to the state management's values)
let win = parseInt(sessionStorage.getItem("win"))>0 ? parseInt(sessionStorage.getItem("win")) : 0 ;
let lose = parseInt(sessionStorage.getItem("lose"))>0 ? parseInt(sessionStorage.getItem("lose")) : 0;

// Variable for Selected word and hint
let selectedHint;
let selectedWord;

// Declare empty arrays to store correct and wrong letters
var correctLetters = [];
var wrongLetters = [];

// Get all elements with a class of figure-part and store to array
var figureParts = document.querySelectorAll(".figure-part");

// Loading Variable
let loading = $("#loadingDiv").hide();


// To get the win/lose stats when the page loads (if any)
function getStats() {
  $(".win").html(win);
  $(".lose").html(lose);
}

/* Function to start the game.
    Picks a random number from the words array and use index to assign selectedWord and selectedHint */
function startGame() {
  // To show while app is retrieving the word data
  loading.show();

  $(".win").html(win);
  $(".lose").html(lose);

  // enable the input
  $("#submit-btn").removeAttr("disabled");

  //New worker
  const worker = new Worker("assets/js/worker.js");
  worker.onmessage = (e) => {
    res = e.data;
    word = res.word;
    hint = res.hint;

    console.log("res:", e.data);

    selectedWord = word.toUpperCase();
    selectedHint = hint.toUpperCase();

    // Hide hangman figure on game start
    $(".figure-part").css("display", "none");
    $(".face-part").css("display", "none");

    // Hide start button on game start
    $("#start-btn").css("display", "none");

    // Display user input on game start
    $("#userInput").css("display", "block");
    $("#key-btns").css("display", "block");

    // Change alphabet buttons back to white and clickable
    $(".key-btn").css("background", "#EFEFEF");
    $(".key-btn").prop("disabled", false);

    displayWord();
  };
}

// Function to display the word
function displayWord() {
  loading.hide();
  //set game finish to false to allow input for new game
  gameFinish = false;

  // Display hint
  $("#hint").html(`<p>Hint: ${selectedHint}</p>`);

  // Display word
  $("#word").html(`
        ${selectedWord
      .split("")
      .map(
        (letter) => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ""}
                </span>
            `
      )
      .join("")}
        `);

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  /* If the inner word matches the selected word, insert text to final-message saying "Congratulations! You Won!!!" 
    Popup will then display with final-message and a button so user can start again. */

  if (innerWord === selectedWord) {
    //set game finish to true to stop input guesses
    gameFinish = true;

    // Alphabet buttons will be unclickable once game is finished
    $(".key-btn").prop("disabled", true);

    // Display final win status
    $("#final-message").html("Good Job!! You Won!!!");
    $("#final-message").css("color", "#62c962");
    $("#final-msg-container").css("display", "block");

    win += 1;
    sessionStorage.setItem("win", win);
    $(".win").html(win);
  }
}

// Clear the win/lose counters, clear sessionstorage and start a new game
function restartGame() {
  // Clearing states
  $(".win").html(0);
  $(".lose").html(0);
  sessionStorage.removeItem("win");
  sessionStorage.removeItem("lose");

  window.location.reload();
}

// Clear stuff for the next round to start (hints, body parts) (not in use for now)
function newRound() {
  console.log(`testing`);
  // Clear wrong letters
  wrongLetters = [];
  wrongLettersEl.innerHTML = ``;

  // Clear body parts (start a fresh criminal to hang)
  figureParts = [];

  window.location.reload();
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters into html
  wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? "<h3>Wrong Letter Input</h3>" : ""}
        ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;
  /* Loops through figureParts array for each element with an id of figure-part and displays one 'body part'
    each time an inccorect letter is guessed */
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
      // Display face only when head has been displayed
      if (index >= 4) {
        $(".start-face").css("display", "block");
      }
    } else {
      part.style.display = "none";
    }
  });

  /* Checks if wrongLetters array is equal to figureParts array. 
    If it is equal, it displays 'Sorry you lose!' into the h2 element with an id of final-message */
  if (wrongLetters.length === figureParts.length) {
    //set game finish to true to stop keydown events
    gameFinish = true;

    // Alphabet buttons will be unclickable once game is finished
    $(".key-btn").prop("disabled", true);

    //Switch to lose face by hiding start face and displaying lose face
    $(".start-face").css("display", "none");
    $(".lose-face").css("display", "block");

    // Display final win status
    $("#final-message").html("Game Over! Nice Try!");
    $("#final-message").css("color", "#ff3333");
    $("#final-msg-container").css("display", "block");

    //After they lose, display the selectedWord
    wordEl.innerHTML = `
        ${selectedWord
        .split("")
        .map(
          (selectedWord) => `
                <span class="letter">
                    ${selectedWord}
                </span>
            `
        )
        .join("")}
        `;
    // Insert losing score to HTML and SessionStorage
    lose += 1;
    sessionStorage.setItem("lose", lose);
    $('.lose').html(lose);
  }
}

/* Change display settings on letter-error to display block, then changes it back to none after 2000ms to temporarily display notifcation 
to user. This alerts the user that they have already used this letter. */
function showNotification() {
  $("#letter-error").css("display", "block");
  setTimeout(() => {
    $("#letter-error").css("display", "none");
  }, 2000);
}

/* Function to get form input and call validateLetter() if value is not undefined */
function validateForm() {
  if (gameFinish == true) {
    $("#submit-btn").attr("disabled", "disabled");
  }
  const input = document.forms.userInput.guess.value;
  if (input != undefined) {
    validateLetter(input);
  }

  // Reset text in form
  document.getElementById("userInput").reset();
}

// Validate Letter if game is active
function validateLetter(input) {
  if (gameFinish === false) {
    const letter = input.toUpperCase();
    // Regex to verify variable is a letter
    if (/[a-zA-Z]/.test(letter)) {
      /* If letter is in selected word and correctLetters array doesnt already contain letter, 
            push it to array and display the letter else show notification letter has already been used.*/
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          `-`;

          displayWord();
        } else {
          showNotification();
        }
        /* If Letter guess is wrong and has not already been used, add to wrongLetters array and call updateWrongLettersEl to display letter. 
                    If it has already been used, showNotification() - Display to user that letter has already been used */
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);

          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }
  }
}

// Alphabet button to turn grey after being click once during gameplay 
$(".key-btn").click(function () {
  $(this).css("background", "grey");
  $(this).attr("disabled", "disabled");
});


/* Obsolete i think??? Like why add an event listener when we already got a function that will be called on click?? Confusing me,
Cuz I thought why got listener and a function that will be called when the button is clicked. Then like, a bit hard for others to
understand as well cuz then we need to read through the whole codebase to see what is being called, instead of just the function call 
OR
the event listener

Should instead stick to either just the function, or event listener to be triggered by the button.

Also also, there isn't a need, regardless of the best practices or whatever thing, for you to call "startGame()" function in this listener
and the actual function itself. Then it's being called twice.
*/
// Event listener on Play Again button to empty arrays and clear game board before starting a new game 
// playAgainBtn.addEventListener("click", () => {
//   //Empty the arrays
//   correctLetters.splice(0);
//   wrongLetters.splice(0);

//   // Start a new game
//   startGame();

//   // Hide wrong letters and figures
//   updateWrongLettersEl();

//   // Hide final message
//   $("#final-msg-container").css("display", "none");

//   //Hide faces when starting new game
//   $(".start-face").css("display", "none");
//   $(".lose-face").css("display", "none");
// });

// Scroll to top button
// Set a variable for scroll to top button
const scrollToTop = document.querySelector("#scrollButton");

// Set up a function if the window scroll down to height 500px then show button
window.addEventListener("scroll", () => {
  // Get the current scroll height value
  const windowHeight = window.scrollY;

  // If the scroll height value is greater than the window height, add style inline-css in button
  if (windowHeight > 1000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header_ribbon").style.padding = "1px 0.5px";

    document.getElementById("Title").style.fontSize = "24px";
  } else {
    document.getElementById("header_ribbon").style.padding = "2px 1px";

    document.getElementById("Title").style.fontSize = "35px";
  }
}
