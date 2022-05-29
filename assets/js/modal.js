// // Get the modal
// var tutorialModal = document.getElementById("tutorial_modal");
// var creditsModal = document.getElementById("credits_modal");

// // Get the button that opens the modal
// var tutorialBtn = document.getElementById("tutorial_button");
// var creditsBtn = document.getElementById("credits_modal");

// function showTutorial() {
//     $(".modal").css("display", "block");
// }

// function showCredits() {
//     $(".modal").css("display", "block");
// }

// function hideTutorial(){
//     $(".modal").css("display", "none");
// }

// function hideCredits(){
//     $(".modal").css("display", "none");
// }

// // // When the user clicks anywhere outside of the modal, close it
// // window.onclick = function(event) {
// //   if (event.target == modal) {
// //     modal.style.display = "none";
// //   }
// // }

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}