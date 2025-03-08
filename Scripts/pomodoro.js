let mode = 'Pomodoro';
let timer;
let isRunning = false;
let pomodorosCompleted = 0;

let pomodoro = {
    time: 25,
    timeString: `${this.time}:00`
};

let shortBreak = {
    time: 5,
    timeString: `${this.time}:00`
};

let longBreak = {
    time: 20,
    timeString: `${this.time}:00`
};

document.querySelector('.js-start-button').addEventListener('click', () => {
    if(!isRunning){
        document.querySelector('.js-start-button').innerText = 'Stop';
        startTimer();
    }else {
        document.querySelector('.js-start-button').innerText = 'Start';
    }
})

document.querySelector('.js-pomodoro-button').addEventListener('click', () => {
    document.getElementById('pomodoro-time').innerText = '25:00';
    removeActiveStyle();
    mode = 'Pomodoro';
    document.querySelector('.js-pomodoro-button').classList.add("active");
})

document.querySelector('.js-short-break-button').addEventListener('click', () => {
    document.getElementById('pomodoro-time').innerText = '5:00';
    removeActiveStyle();
    mode = 'ShortBreak';
    document.querySelector('.js-short-break-button').classList.add("active");
})

document.querySelector('.js-long-break-button').addEventListener('click', () => {
    document.getElementById('pomodoro-time').innerText = '20:00';
    removeActiveStyle();
    mode = 'LongBreak';
    document.querySelector('.js-long-break-button').classList.add("active");
})

function updateTimerDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    console.log(minutes);
    console.log(seconds);
    document.getElementById('pomodoro-time').innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
    let timeLeft = 0;

    if(!isRunning){
        timeLeft = 25 * 60;
        isRunning = true;
        timer = setInterval(() => {
            if(timeLeft > 0){
                timeLeft--;
                updateTimerDisplay(timeLeft);
            } else {
                clearInterval(timer);
                isRunning = false;
                alert("Time's up! 🎉");
            }
        }, 1000);
    }
}

function removeActiveStyle() {
    if (mode === 'Pomodoro'){
        document.querySelector('.js-pomodoro-button').classList.remove("active");
    }else if (mode === 'ShortBreak'){
        document.querySelector('.js-short-break-button').classList.remove("active");
    }else {
        document.querySelector('.js-long-break-button').classList.remove("active");
    }
}
