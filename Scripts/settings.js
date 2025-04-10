export let settings;
var modal = document.getElementById("myModal");
var openBtn = document.getElementById("settingsButton");
var closeBtn = document.querySelector(".closeButton");
var applyBtn = document.querySelector(".applyButton");
const pomInput = document.getElementById("pomodoro");
const shortInput = document.getElementById("shortBreak");
const longInput = document.getElementById("longBreak");
const redTheme = document.getElementById("red");
const pinkTheme = document.getElementById("pink");
const greenTheme = document.getElementById("green");
const purpleTheme = document.getElementById("purple");
const blueTheme = document.getElementById("blue");
const beigeTheme = document.getElementById("beige");

loadFromStorage();
showSettings();

openBtn.onclick = () => {
    modal.style.display = "block";
}

closeBtn.onclick = () => {
    modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target === modal) {
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

applyBtn.onclick = () => {
    const validated = validateTimeSettings();
    if(validated){
        modal.style.display = "none";
    }
    saveSettingsToStorage();
    settingsUpdated();
}

redTheme.onclick = () => {
    removeOldTheme();
    settings.theme = 'red';
    showSettings();
}

pinkTheme.onclick = () => {
    removeOldTheme();
    settings.theme = 'pink';
    showSettings();
}

greenTheme.onclick = () => {
    console.log('green button pressed')
    removeOldTheme();
    settings.theme = 'green';
    showSettings(); 
}

blueTheme.onclick = () => {
    console.log('blue button pressed')
    removeOldTheme();
    settings.theme = 'blue';
    showSettings();
}

purpleTheme.onclick = () => {
    removeOldTheme();
    settings.theme = 'purple';
    showSettings();
}

beigeTheme.onclick = () => {
    removeOldTheme();
    settings.theme = 'beige';
    showSettings();
}

export function loadFromStorage() {
    settings = JSON.parse(localStorage.getItem('settings'));

    if(!settings) {
        settings =  {
            pomTime: 25,
            shortTime: 5,
            longTime: 20,
            theme: 'red'
        };
    }
}

function saveSettingsToStorage() {
    localStorage.setItem( 'settings',JSON.stringify(settings));
}

function showSettings() {
    pomInput.value = settings.pomTime;
    shortInput.value = settings.shortTime;
    longInput.value = settings.longTime;

    if (settings.theme === 'red'){
        redTheme.classList.add('activeTheme');
        document.body.classList.add('red-theme');
    }
    else if (settings.theme === 'pink'){
        pinkTheme.classList.add('activeTheme');
        document.body.classList.add('pink-theme');
    }
    else if (settings.theme === 'green'){
        greenTheme.classList.add('activeTheme');
        document.body.classList.add('green-theme');
    }
    else if (settings.theme === 'blue'){
        blueTheme.classList.add('activeTheme');
        document.body.classList.add('blue-theme');
    }
    else if (settings.theme === 'purple'){
        purpleTheme.classList.add('activeTheme');
        document.body.classList.add('purple-theme');
    }
    else{
        beigeTheme.classList.add('activeTheme');
        document.body.classList.add('beige-theme');
    }
}

function validateTimeSettings() {
    var number;

    if(pomInput.value >= 0 && pomInput.value <= 120){
        if (pomInput.value.startsWith('0') && pomInput.value.length > 1) {
            number = parseInt(pomInput.value, 10);
            settings.pomTime = number;
        }
        else {
            settings.pomTime = pomInput.value;
        }
    }
    else {
        return false;
    }
    
    if(shortInput.value >= 0 && shortInput.value <= 120){
        if (shortInput.value.startsWith('0') && shortInput.value.length > 1) {
            number = parseInt(shortInput.value, 10);
            settings.shortTime = number;
        }
        else {
            settings.shortTime = shortInput.value;
        }
    }
    else {
        return false;
    }

    if(longInput.value >= 0 && longInput.value <= 120){
        if (longInput.value.startsWith('0') && longInput.value.length > 1) {
            number = parseInt(longInput.value, 10);
            settings.longTime = number;
            console.log(`read into if statement: ${longInput.value}`);
        }
        else {
            settings.longTime = longInput.value;
        }
    }
    else {
        return false;
    }
    return true;
}

function removeOldTheme() {

    if (settings.theme === 'red'){
        redTheme.classList.remove('activeTheme');
        document.body.classList.remove('red-theme');
    }
    else if (settings.theme === 'pink'){
        pinkTheme.classList.remove('activeTheme');
        document.body.classList.remove('pink-theme');
    }
    else if (settings.theme === 'green'){
        greenTheme.classList.remove('activeTheme');
        document.body.classList.remove('green-theme');
    }
    else if (settings.theme === 'purple'){
        purpleTheme.classList.remove('activeTheme');
        document.body.classList.remove('purple-theme');
    }
    else if (settings.theme === 'blue'){
        blueTheme.classList.remove('activeTheme');
        document.body.classList.remove('blue-theme');
    }
    else{
        beigeTheme.classList.remove('activeTheme');
        document.body.classList.remove('beige-theme');
    }
}

function settingsUpdated() {
    const event = new CustomEvent('settingsChanged');
    document.dispatchEvent(event);
}