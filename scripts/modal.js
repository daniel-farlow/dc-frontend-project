'use strict';

const modal = document.getElementById("card-modal");
const btn = document.querySelector(".modal-btn");

//When the user clicks on the button, open the modal. Pretty much taking a css element and converting it into a javascript object.
btn.onclick = function() {
    modal.style.display = "block"; /* block is the default display style */
}
// When the user clicks anywhere outside the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}