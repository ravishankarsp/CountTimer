const mode = document.getElementsByClassName('mode')[0];
const timeElement = document.getElementsByClassName('time')[0];
const header = document.getElementsByClassName('header')[0];
const startButton = document.getElementsByClassName('btu')[0];

let isRunning = false;
let resetRequested = false;
let isPaused = false;
let totalSec = 0;

timeElement.textContent = "00:00";

// 🌙 Toggle Dark/Light Mode
function toggle() {
  if (mode.textContent === "Dark mode 🌙") {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    mode.textContent = "Light mode ☀️";
    header.style.backgroundColor = "black";
  } else {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    mode.textContent = "Dark mode 🌙";
    header.style.backgroundColor = "skyblue";
  }
}

// 🔁 Reset Timer
function reset() {
  resetRequested = true;
  isPaused = false;
  totalSec = 0;
  timeElement.textContent = "00:00";
  startButton.textContent = "Start";
  isRunning = false;
}

// ▶️ Main Timer Logic
async function startTimer() {
  if (isRunning) return;
  isRunning = true;

  // Only ask for time if new timer
  if (totalSec === 0) {
    let minutes = Number(prompt("Enter the minutes"));
    let seconds = Number(prompt("Enter the seconds"));

    if (isNaN(minutes) || minutes < 0) minutes = 0;
    if (isNaN(seconds) || seconds < 0 || seconds > 59) seconds = 0;

    totalSec = minutes * 60 + seconds;
  }

  startButton.textContent = "Stop";

  while (totalSec >= 0) {
    if (resetRequested) break;

    // Pause logic
    while (isPaused) {
      startButton.textContent = "Resume";
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    let m = Math.floor(totalSec / 60);
    let s = totalSec % 60;

    timeElement.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    if (totalSec === 0) break;

    await new Promise(resolve => setTimeout(resolve, 1000));
    totalSec--;
  }

  resetRequested = false;
  isRunning = false;
  startButton.textContent = "Start";
}

// ⏸️ Pause/Resume/Start Button Behavior
startButton.onclick = async function () {
  const state = startButton.textContent.toLowerCase();

  if (state === "start") {
    startTimer();
  } else if (state === "stop") {
    isPaused = true;
  } else if (state === "resume") {
    isPaused = false;
    startButton.textContent = "Stop";
  }
};
