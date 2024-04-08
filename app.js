let timerEL = document.getElementById("timer-el");
let timerControlsContainerEl = document.getElementById("timer-controls-container-el");

let hours = 0;
let minutes = 0;
let seconds = 0;

let hoursText = "00";
let minutesText = "00";
let secondsText = "00";

let active = false;
let countTime = 1000;

function performControlTasks() {

    function setTimeTextsVar(time, timeText) {
        timeText = time < 10 ? `0${time}` : `${time}`;
        return timeText;
    }

    let timeInterval;
    let dealTime = () => {
        if (seconds === 60) {
            seconds = 0;
            if (minutes > 60) {
                minutes = 0
                hours += 1;
            } else {
                minutes += 1;
            }
        } else {
            seconds += 1;
        }
        secondsText = setTimeTextsVar(seconds, secondsText);
        minutesText = setTimeTextsVar(minutes, minutesText);
        hoursText = setTimeTextsVar(hours, hoursText);
        timerEL.textContent = `${hoursText}:${minutesText}:${secondsText}`;
    }

    function startTime() {
        timeInterval = setInterval(() => {
            if (active) {
                dealTime()
            }                    
        }, countTime)
    }

    let tasks = {
        play: () => {
            active = true;
            startTime()
        },
        pause: () => {
            active = !active;
            if (!active) {
                clearInterval(timeInterval)
            } else {
                startTime()
            }
        },
        reset: () => {
            hours = 0;
            minutes = 0;
            seconds = 0;

            timerEL.textContent = `00:00:00`;
            clearInterval(timeInterval)
            timerControlsContainerEl.firstElementChild.classList.add("play")
        }
    };


    timerControlsContainerEl.addEventListener("click", (e) => {
        target = e.target;

        if (target.classList.contains("reset-btn")) {
            tasks.reset()
        } else if (target.classList.contains("play")) {
            tasks.play()
            console.log("playing")
        } else if (!target.classList.contains("play") && target.classList.contains("play-pause-btn")) {
            tasks.pause()
            console.log("stoping")
        }

        if (target.classList.contains("play-pause-icon")) {
            target.parentElement.classList.toggle("play")
        } else if (target.classList.contains("play-pause-btn")) {
            target.classList.toggle("play")
        }

        if (target.classList.contains("timer-control-icon")) {
            tasks[target.getAttribute("id")]()
            console.log(target.getAttribute("id"))
        }
        
    })
}

performControlTasks()