const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");
const applyTimeBtn = document.querySelector(".btn-apply-time");
const sessionInput = document.querySelector("#session-minutes");
const minuteDisplay = document.querySelector(".minutes");
const secondDisplay = document.querySelector(".seconds");
const focusVideo = document.querySelector(".focus-bg-video");
const appMessage = document.querySelector(".app-message");
const progressFills = document.querySelectorAll(".progress-fill");
const presetButtons = document.querySelectorAll(".preset-btn");

const DEFAULT_MINUTES = 25;
const STORAGE_MINUTES_KEY = "deepWorkSessionMinutes";
const IDLE_MESSAGE = "lock in. eliminate distractions.";
const FOCUS_MESSAGE = "neural sync established.";
const HOLD_MESSAGE = "protocol suspended.";

const BUTTON_CLICK_SOUND = "./sounds/button-click.mp3";
const BUTTON_HOVER_SOUND = "./sounds/button-hover.mp3";
const FOCUS_BEAT_SOUND = "./sounds/cyberpunk-beat.mp3";

const focusBeat = new Audio(FOCUS_BEAT_SOUND);
focusBeat.loop = true;
focusBeat.volume = 0.45;

let myInterval;
let isFirstStart = true;
let sessionMinutes = DEFAULT_MINUTES;
let totalSeconds = DEFAULT_MINUTES * 60;

const playUiSound = (src, volume = 0.6) => {
  const sound = new Audio(src);
  sound.volume = volume;
  sound.play().catch(() => {});
};

const initButtonSounds = () => {
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("mouseenter", () => {
      if (button.disabled) return;
      playUiSound(BUTTON_HOVER_SOUND, 0.35);
    });

    button.addEventListener("click", () => {
      playUiSound(BUTTON_CLICK_SOUND, 0.55);
    });
  });
};

const updateTimerDisplay = (minutes, seconds = 0) => {
  minuteDisplay.textContent = `${minutes}`;
  secondDisplay.textContent = seconds < 10 ? `0${seconds}` : `${seconds}`;
};

const updateProgress = () => {
  const total = sessionMinutes * 60;
  const elapsed = total - totalSeconds;
  const percent = total > 0 ? Math.min(100, (elapsed / total) * 100) : 0;
  progressFills.forEach((fill) => {
    fill.style.width = `${percent}%`;
  });
};

const syncPresetButtons = () => {
  presetButtons.forEach((button) => {
    const isMatch = Number.parseInt(button.dataset.minutes, 10) === sessionMinutes;
    button.classList.toggle("is-active", isMatch);
  });
};

const setSettingsLocked = (locked) => {
  sessionInput.disabled = locked;
  applyTimeBtn.disabled = locked;
  presetButtons.forEach((button) => {
    button.disabled = locked;
  });
};

const playFocusBeat = () => {
  focusBeat.play().catch(() => {});
};

const pauseFocusBeat = () => {
  focusBeat.pause();
};

const stopFocusBeat = () => {
  focusBeat.pause();
  focusBeat.currentTime = 0;
};

const enterFocusMode = () => {
  document.body.classList.add("is-engaged");
  appMessage.textContent = FOCUS_MESSAGE;

  if (focusVideo) {
    focusVideo.play().catch(() => {});
  }

  playFocusBeat();
};

const exitFocusMode = () => {
  document.body.classList.remove("is-engaged");
  appMessage.textContent = IDLE_MESSAGE;

  if (focusVideo) {
    focusVideo.pause();
    focusVideo.currentTime = 0;
  }

  stopFocusBeat();
};

const pauseFocusMode = () => {
  document.body.classList.remove("is-engaged");
  appMessage.textContent = HOLD_MESSAGE;

  if (focusVideo) {
    focusVideo.pause();
  }

  pauseFocusBeat();
};

const applySessionTime = () => {
  const minutes = Number.parseInt(sessionInput.value, 10);
  if (Number.isNaN(minutes) || minutes < 1 || minutes > 120) {
    alert("Set a session length between 1 and 120 minutes.");
    return;
  }

  sessionMinutes = minutes;
  totalSeconds = sessionMinutes * 60;
  updateTimerDisplay(sessionMinutes, 0);
  updateProgress();
  syncPresetButtons();
  localStorage.setItem(STORAGE_MINUTES_KEY, String(sessionMinutes));
};

const updateSeconds = () => {
  totalSeconds--;

  const minutesLeft = Math.floor(totalSeconds / 60);
  const secondsLeft = totalSeconds % 60;
  updateTimerDisplay(minutesLeft, secondsLeft);
  updateProgress();

  if (minutesLeft === 0 && secondsLeft === 0) {
    bells.play();
    clearInterval(myInterval);
    myInterval = null;
    isFirstStart = true;
    setSettingsLocked(false);
    exitFocusMode();
  }
};

const appTimer = () => {
  if (myInterval) return;

  if (isFirstStart) {
    totalSeconds = sessionMinutes * 60;
    updateTimerDisplay(sessionMinutes, 0);
    updateProgress();
    isFirstStart = false;
    setSettingsLocked(true);
  }

  myInterval = setInterval(updateSeconds, 1000);
  enterFocusMode();
};

const pauseTimer = () => {
  if (!myInterval) return;

  clearInterval(myInterval);
  myInterval = null;
  pauseFocusMode();
};

const resetTimer = () => {
  clearInterval(myInterval);
  myInterval = null;
  isFirstStart = true;
  totalSeconds = sessionMinutes * 60;
  updateTimerDisplay(sessionMinutes, 0);
  updateProgress();
  setSettingsLocked(false);
  exitFocusMode();
};

const savedMinutes = localStorage.getItem(STORAGE_MINUTES_KEY);
if (savedMinutes) {
  sessionMinutes = Number.parseInt(savedMinutes, 10) || DEFAULT_MINUTES;
  sessionInput.value = sessionMinutes;
  totalSeconds = sessionMinutes * 60;
  updateTimerDisplay(sessionMinutes, 0);
  syncPresetButtons();
}

updateProgress();

startBtn.addEventListener("click", appTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
applyTimeBtn.addEventListener("click", applySessionTime);

sessionInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") applySessionTime();
});

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.disabled) return;
    sessionInput.value = button.dataset.minutes;
    applySessionTime();
  });
});

initButtonSounds();
