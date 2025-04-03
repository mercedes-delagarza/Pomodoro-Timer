var modal = document.getElementById("myModal");
var openBtn = document.getElementById("settingsButton");
var closeBtn = document.querySelector(".closeButton");
const pomInput = document.getElementById("pomodoro");
const shortInput = document.getElementById("shortBreak");
const longInput = document.getElementById("longBreak");

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

pomInput.addEventListener("keydown", function (event) {
    if (!/[0-9]/.test(event.key)) {
        if (!["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            event.preventDefault();
        }
    }
});

shortInput.addEventListener("keydown", function (event) {
    if (!/[0-9]/.test(event.key)) {
        if (!["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            event.preventDefault();
        }
    }
});

longInput.addEventListener("keydown", function (event) {
    if (!/[0-9]/.test(event.key)) {
        if (!["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            event.preventDefault();
        }
    }
});

pomInput.addEventListener("paste", function (event) {
    const pastedText = (event.clipboardData || window.clipboardData).getData("text");
    if (!/^\d+$/.test(pastedText)) {
        event.preventDefault();
    }
});

shortInput.addEventListener("paste", function (event) {
    const pastedText = (event.clipboardData || window.clipboardData).getData("text");
    if (!/^\d+$/.test(pastedText)) {
        event.preventDefault();
    }
});

longInput.addEventListener("paste", function (event) {
    const pastedText = (event.clipboardData || window.clipboardData).getData("text");
    if (!/^\d+$/.test(pastedText)) {
        event.preventDefault();
    }
});