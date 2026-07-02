const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");
const session = document.querySelector(".minutes");
const DEFAULT_MINUTES = 25;

let myInterval;
let state = true;
let isFirstStart = true;
let totalSeconds = DEFAULT_MINUTES * 60;

const updateSeconds = () => {
  const minuteDiv = document.querySelector(".minutes");
  const secondDiv = document.querySelector(".seconds");

  totalSeconds--;

  let minutesLeft = Math.floor(totalSeconds / 60);
  let secondsLeft = totalSeconds % 60;

  if (secondsLeft < 10) {
    secondDiv.textContent = "0" + secondsLeft;
  } else {
    secondDiv.textContent = secondsLeft;
  }
  minuteDiv.textContent = `${minutesLeft}`;

  if (minutesLeft === 0 && secondsLeft === 0) {
    bells.play();
    clearInterval(myInterval);
    myInterval = null;
    state = true;
    isFirstStart = true;
  }
};

const appTimer = () => {
  if (myInterval) return;

  if (isFirstStart) {
    totalSeconds = Number.parseInt(session.textContent) * 60;
    isFirstStart = false;
  }

  state = false;
  myInterval = setInterval(updateSeconds, 1000);
};

const pauseTimer = () => {
  if (!myInterval) return;

  clearInterval(myInterval);
  myInterval = null;
  state = true;
};

const resetTimer = () => {
  clearInterval(myInterval);
  myInterval = null;
  state = true;
  isFirstStart = true;
  totalSeconds = DEFAULT_MINUTES * 60;

  document.querySelector(".minutes").textContent = DEFAULT_MINUTES;
  document.querySelector(".seconds").textContent = "00";
};

startBtn.addEventListener("click", appTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
