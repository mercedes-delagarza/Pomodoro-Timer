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
        setTimeout(() => {
                document.querySelector('.js-start-button').innerText = 'Start';
                stopTimer();
            }, 2000);
        
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
    document.getElementById('pomodoro-time').innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    document.getElementById('tab').innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds} Pom Garden`;
}

function startTimer() {
    let timeLeft = 0;
    const time = getTime();
    if(!isRunning){
        timeLeft = time * 60;
        isRunning = true;
        timer = setInterval(() => {
            if(timeLeft > 0){
                timeLeft--;                
            } else {
                clearInterval(timer);
                isRunning = false;
                alert("Time's up! 🎉");
            }
            updateTimerDisplay(timeLeft);
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    if (mode != 'Pomodoro'){
        mode = 'Pomodoro';
        removeActiveStyle();
        document.querySelector('.js-pomodoro-button').classList.add("active");
    }
    document.getElementById('pomodoro-time').innerText = '25:00';
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

function getTime() {
    if (mode === 'Pomodoro'){
       return pomodoro.time;
    }else if (mode === 'ShortBreak'){
        return shortBreak.time;
    }else {
        return longBreak.time;
    }
}
