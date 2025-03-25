const Pomodoro = (function () {
    let instance;

    function createInstance(workDuration = 1, shortBreakDuration = 1, longBreakDuration = 1) {
        let timer;
        let startTime;
        let remainingTime;
        return {
            workDuration,
            shortBreakDuration,
            longBreakDuration,
            workDurationString: `${workDuration}:00`,
            shortBreakDurationString: `${shortBreakDuration}:00`, 
            longBreakDurationString: `${longBreakDuration}:00`,
            completedPomodoros: 0,
            isRunning: false,
            currentMode: 'Pomodoro',

            setTimer() {
                if(this.currentMode === 'Pomodoro'){
                    document.querySelector('.js-pomodoro-time').innerText = `${this.workDurationString}`;
        
                }
                else if(this.currentMode === 'ShortBreak'){
                    document.querySelector('.js-pomodoro-time').innerText = `${this.shortBreakDurationString}`;
                }
                else{
                    document.querySelector('.js-pomodoro-time').innerText = `${this.longBreakDurationString}`;
                }
            },

            start() {
                startTime = Date.now();
                let elapsedTime = 0;
                const time = this.getTime();
                let timeLeft = (time * 60 * 1000);
                if(!this.isRunning){
                    this.isRunning = true;
                    timer = setInterval(() => {
                        if(timeLeft > 0){
                            timeLeft -= 1000;
                            updateTimerDisplay(timeLeft);                
                        } else {
                            clearInterval(timer);
                            this.isRunning = false;
                            alert("Time's up! 🎉");
                            this.switchMode();
                            document.querySelector('.js-start-button').innerText = 'Start';
                        }
                    }, 1000);
                }
            },

            stop() {
                clearInterval(timer);
                this.isRunning = false;
                if (this.currentMode != 'Pomodoro'){
                    removeActiveStyle();
                    this.currentMode = 'Pomodoro';
                    document.querySelector('.js-pomodoro-button').classList.add("active");
                }
                document.getElementById('pomodoro-time').innerText = `${this.workDurationString}`;
                document.querySelector('.js-start-button').innerText = 'Start';
            },

            switchMode() {
                removeActiveStyle();
                if(this.currentMode != 'Pomodoro'){
                    this.currentMode = 'Pomodoro';
                    updateTimerDisplay(workDuration * 60000);
                    document.querySelector('.js-pomodoro-button').classList.add("active");
                }
                else {
                    this.completedPomodoros++;
                    this.saveToStorage();
                    if(this.completedPomodoros === 4) {
                        this.currentMode = 'LongBreak'
                        this.completedPomodoros = 0;
                        updateTimerDisplay(longBreakDuration * 60000);
                        document.querySelector('.js-long-break-button').classList.add("active");
                    }
                    else{
                        this.currentMode = 'ShortBreak';
                        updateTimerDisplay(shortBreakDuration * 60000);
                        document.querySelector('.js-short-break-button').classList.add("active");
                    }
                }
                console.log(`switched to mode: ${this.currentMode}`);
            },

            getTime() {
                if (this.currentMode === 'Pomodoro'){
                    return this.workDuration;
                }else if (this.currentMode === 'ShortBreak'){
                    return this.shortBreakDuration;
                }else {
                    return this.longBreakDuration;
                }
            },

            saveToStorage() {
                let count = localStorage.getItem('pomodorosCompleted')
                localStorage.setItem('pomodorosCompleted', count++);
            }
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

const pomodoro = Pomodoro.getInstance();
pomodoro.setTimer();

// event listeners
document.querySelector('.js-start-button').addEventListener('click', () => {
    if(!pomodoro.isRunning){
        document.querySelector('.js-start-button').innerText = 'Stop';
        pomodoro.start();
    }else {
        document.querySelector('.js-start-button').innerText = 'Start';
        pomodoro.stop();
    }
});

document.querySelector('.js-pomodoro-button').addEventListener('click', () => {
    document.getElementById('pomodoro-time').innerText = `${pomodoro.workDurationString}`;
    removeActiveStyle();
    pomodoro.currentMode = 'Pomodoro';
    document.querySelector('.js-pomodoro-button').classList.add("active");
});

document.querySelector('.js-short-break-button').addEventListener('click', () => {
    document.getElementById('pomodoro-time').innerText = `${pomodoro.shortBreakDurationString}`;
    removeActiveStyle();
    pomodoro.currentMode = 'ShortBreak';
    document.querySelector('.js-short-break-button').classList.add("active");
});

document.querySelector('.js-long-break-button').addEventListener('click', () => {
    document.getElementById('pomodoro-time').innerText = `${pomodoro.longBreakDurationString}`;
    removeActiveStyle();
    pomodoro.currentMode = 'LongBreak';
    document.querySelector('.js-long-break-button').classList.add("active");
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        pomodoro.remainingTime -= Date.now() - pomodoro.startTime;
        clearInterval(pomodoro.timer);
    } else {
        pomodoro.startTime = Date.now();
        pomodoro.timer = setInterval(updateTimerDisplay, 1000);
    }
});

function updateTimerDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    document.getElementById('pomodoro-time').innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    document.getElementById('tab').innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds} Pom Garden`;
}

function removeActiveStyle() {
    if (pomodoro.currentMode === 'Pomodoro'){
        document.querySelector('.js-pomodoro-button').classList.remove("active");
    }else if (pomodoro.currentMode === 'ShortBreak'){
        document.querySelector('.js-short-break-button').classList.remove("active");
    }else {
        document.querySelector('.js-long-break-button').classList.remove("active");
    }
}

