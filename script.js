let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let intervalId;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
    const totalCentiseconds = Math.floor(ms / 10); 
    const hours = Math.floor(totalCentiseconds / 360000); 
    const minutes = Math.floor((totalCentiseconds % 360000) / 6000); 
    const seconds = Math.floor((totalCentiseconds % 6000) / 100); 
    const centiseconds = totalCentiseconds % 100;
    
    return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')} : ${centiseconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    const now = performance.now();
    const currentElapsed = elapsedTime + (isRunning ? (now - startTime) : 0);
    display.textContent = formatTime(currentElapsed);
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = performance.now();
        intervalId = setInterval(updateDisplay, 10); 
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        elapsedTime += performance.now() - startTime;
        clearInterval(intervalId);
    }
}

function resetStopwatch() {
    isRunning = false;
    elapsedTime = 0;
    startTime = 0;
    clearInterval(intervalId);
    display.textContent = '00 : 00 : 00 : 00';
    laps = [];
    lapsList.innerHTML = '';
}

function recordLap() {
    if (isRunning || elapsedTime > 0) {
        const now = performance.now();
        const lapTime = elapsedTime + (isRunning ? (now - startTime) : 0);
        laps.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapItem);
    }
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);


updateDisplay();