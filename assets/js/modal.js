// Get the modal
var tutorialModal = document.getElementById("tutorial_modal");
// var creditsModal = document.getElementById("credits_modal");

// Get the button that opens the modal
var tutorialBtn = document.getElementById("tutorial_button");
var tutorialCloseBtn = document.getElementById("tutorial-close-button")

// var creditsBtn = document.getElementById("credits_button");

// // When the user clicks the button, open the modal 
tutorialBtn.onclick = function() {
  modal.style.display = "block";
}

tutorialCloseBtn.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}