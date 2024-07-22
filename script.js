let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const timeDisplay = document.getElementById('time');
const lapTimes = document.getElementById('lapTimes');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        running = true;
        document.getElementById('start').style.display = 'none';
        document.getElementById('pause').style.display = 'inline';
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        difference = new Date().getTime() - startTime;
        document.getElementById('start').style.display = 'inline';
        document.getElementById('pause').style.display = 'none';
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    timeDisplay.innerHTML = '00:00:00.000';
    lapTimes.innerHTML = '';
    lapCounter = 0;
    document.getElementById('start').style.display = 'inline';
    document.getElementById('pause').style.display = 'none';
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 100) ? '0' + milliseconds : milliseconds;

    timeDisplay.innerHTML = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

function recordLap() {
    if (running) {
        lapCounter++;
        const li = document.createElement('li');
        li.innerHTML = `Lap ${lapCounter}: ${timeDisplay.innerHTML}`;
        lapTimes.appendChild(li);
    }
}

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', recordLap);
