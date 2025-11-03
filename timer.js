const mode = document.getElementsByClassName('mode')[0];
const timeElement = document.getElementsByClassName('time')[0];

let isRunning = false;
let resetRequested = false;

timeElement.textContent = "00:00";

function toggle() {
  if (mode.textContent === "Dark mode") {
    mode.textContent = "Light mode";
    document.body.style.background = "white";
    document.body.style.color = "black";
  } else {
    mode.textContent = "Dark mode";
    document.body.style.background = "black";
    document.body.style.color = "white";
  }
}

async function timer() {
  if (isRunning) return;
  isRunning = true;

  let minutes = Number(prompt("Enter the minutes"));
  let seconds = Number(prompt("Enter the seconds"));

  if (isNaN(minutes) || minutes < 0) minutes = 0;
  if (isNaN(seconds) || seconds < 0 || seconds > 59) seconds = 0;

  let totalSec = minutes * 60 + seconds;

  while (totalSec >= 0) {
    if (resetRequested) break;

    let m = Math.floor(totalSec / 60);
    let s = totalSec % 60;

    timeElement.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

    await new Promise(resolve => setTimeout(resolve, 1000));
    totalSec--;
  }

  isRunning = false;
  resetRequested = false;
}

async function reset() {
  resetRequested = true;
  timeElement.textContent = "00:00";
}
