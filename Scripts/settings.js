import { Pomodoro } from "./pomodoro";

var modal = document.getElementById("myModal");
var openBtn = document.getElementById("settingsButton");
var closeBtn = document.querySelector(".closeButton");

openBtn.onclick = () => {
    modal.style.display = "block";
}

closeBtn.onclick = () => {
    modal.style.display = "none";
}

window.onclick = () => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}