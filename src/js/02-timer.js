import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notiflix.Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
});

const TIMER_DELAY = 1000;
let selectedTime = null;

const refs = {
  body: document.querySelector('body'),
  inputDate: document.querySelector('#datetime-picker'),
  startBtnDate: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

refs.startBtnDate.disabled = true;

class Timer {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
  }

    start() {
    if (this.isActive) {
      return;
      }
      
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      const timeComponents = convertMs(deltaTime);
      this.updateTimer(timeComponents);
      refs.startBtnDate.disabled = true;

      if (deltaTime <= 0) {
        this.stop();
      }
    }, TIMER_DELAY)
  }

  stop() {
    clearInterval(this.intervalId);
  }

  updateTimer({ days, hours, minutes, seconds }) {
    refs.days.innerHTML = addLeadingZero(days);
    refs.hours.innerHTML = addLeadingZero(hours);
    refs.minutes.innerHTML = addLeadingZero(minutes);
    refs.seconds.innerHTML = addLeadingZero(seconds);
 }
}

const timer = new Timer();

refs.startBtnDate.addEventListener('click', () => {
  timer.start();
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] < Date.now()) {
        Notify.failure('🥺 Ooops... Please, choose a date in the future');
        selectedDates[0] = new Date();
      } else {
        Notify.success('🥰 Congratulation! Click on start!');
        refs.startBtnDate.disabled = false;
        selectedTime = selectedDates[0];
      }
    },
};

flatpickr(refs.inputDate, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


