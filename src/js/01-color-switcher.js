const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
}

let timerId = null;
const CHANGE_COLOR_DELAY = 1000;
refs.btnStop.disabled = true;

refs.btnStart.addEventListener('click', onBntStart);
refs.btnStop.addEventListener('click', onBtnStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function onBntStart() {
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;

    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, CHANGE_COLOR_DELAY);
}

function onBtnStop() {
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;

    clearInterval(timerId);
}

