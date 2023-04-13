const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerId = null;
const CHANGE_COLOR_DELAY = 1000;
btnStop.disabled = true;

btnStart.addEventListener('click', onBntStart);
btnStop.addEventListener('click', onBtnStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function onBntStart() {
    btnStart.disabled = true;
    btnStop.disabled = false;

    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    }, CHANGE_COLOR_DELAY);
}

function onBtnStop() {
    btnStart.disabled = false;
    btnStop.disabled = true;

    clearInterval(timerId);
}

