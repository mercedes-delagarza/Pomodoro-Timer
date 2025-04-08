export let settings;
var modal = document.getElementById("myModal");
var openBtn = document.getElementById("settingsButton");
var closeBtn = document.querySelector(".closeButton");
var applyBtn = document.querySelector(".applyButton");
const pomInput = document.getElementById("pomodoro");
const shortInput = document.getElementById("shortBreak");
const longInput = document.getElementById("longBreak");
const appleTheme = document.getElementById("apple");
const peachTheme = document.getElementById("peach");
const pearTheme = document.getElementById("pear");
const cherryTheme = document.getElementById("cherry");
const orangeTheme = document.getElementById("orange");
const coconutTheme = document.getElementById("coconut");

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

appleTheme.onclick = () => {
    removeOldTheme();
    settings.theme = 'apple';
    showSettings();
}

peachTheme.onclick = () => {
    removeOldTheme();
    settings.theme = 'peach';
    showSettings();
}

pearTheme.onclick = () => {
    removeOldTheme();
    settings.theme = 'pear';
    showSettings(); 
}

orangeTheme.onclick = () => {
    removeOldTheme();
    settings.theme = 'orange';
    showSettings();
}

cherryTheme.onclick = () => {
    removeOldTheme();
    settings.theme = 'cherry';
    cherryTheme.classList.add('activeTheme');
    showSettings();
}

coconutTheme.onclick = () => {
    removeOldTheme();
    settings.theme = 'coconut';
    coconutTheme.classList.add('activeTheme');
    showSettings();
}

export function loadFromStorage() {
    settings = JSON.parse(localStorage.getItem('settings'));

    if(!settings) {
        settings =  {
            pomTime: 25,
            shortTime: 5,
            longTime: 20,
            theme: 'apple'
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

    if (settings.theme === 'apple'){
        appleTheme.classList.add('activeTheme');
        document.body.classList.add(`apple-theme`);
    }
    else if (settings.theme === 'peach'){
        peachTheme.classList.add('activeTheme');
        document.body.classList.add(`peach-theme`);
    }
    else if (settings.theme === 'pear'){
        pearTheme.classList.add('activeTheme');
        document.body.classList.add(`pear-theme`);
    }
    else if (settings.theme === 'cherry'){
        cherryTheme.classList.add('activeTheme');
        document.body.classList.add(`cherry-theme`);
    }
    else if (settings.theme === 'orange'){
        orangeTheme.classList.add('activeTheme');
        document.body.classList.add(`orange-theme`);
    }
    else{
        coconutTheme.classList.add('activeTheme');
        document.body.classList.add(`coconut-theme`);
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

    if (settings.theme === 'apple'){
        appleTheme.classList.remove('activeTheme');
        document.body.classList.remove(`apple-theme`);
    }
    else if (settings.theme === 'peach'){
        peachTheme.classList.remove('activeTheme');
        document.body.classList.remove(`peach-theme`);
    }
    else if (settings.theme === 'pear'){
        pearTheme.classList.remove('activeTheme');
        document.body.classList.remove(`pear-theme`);
    }
    else if (settings.theme === 'cherry'){
        cherryTheme.classList.remove('activeTheme');
        document.body.classList.remove(`cherry-theme`);
    }
    else if (settings.theme === 'orange'){
        orangeTheme.classList.remove('activeTheme');
        document.body.classList.remove(`orange-theme`);
    }
    else{
        coconutTheme.classList.remove('activeTheme');
        document.body.classList.remove(`coconut-theme`);
    }
}

function settingsUpdated() {
    const event = new CustomEvent('settingsChanged');
    document.dispatchEvent(event);
}
