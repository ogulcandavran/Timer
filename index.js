const duration = document.querySelector("#duration");
const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");
const resetButton = document.querySelector("#resetButton");
const errorDiv = document.querySelector("#err");

const circle = document.querySelector("#circle");
const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

let initialDuration;
let isResetButtonClicked = true;
const timer = new Timer(
  duration,
  startButton,
  stopButton,
  resetButton,
  errorDiv,
  isResetButtonClicked,
  {
    onStart() {
      if (isResetButtonClicked) {
        circle.setAttribute("stroke-dashoffset", 0);
        initialDuration = duration.value;
        isResetButtonClicked = false;
      }
    },

    onEachTick(remainingTime) {
      circle.setAttribute(
        "stroke-dashoffset",
        (perimeter * remainingTime) / initialDuration - perimeter
      );
    },

    onStop() {},

    onComplete() {
      isResetButtonClicked = true;
    },

    onReset() {
      isResetButtonClicked = true;
      duration.value = 30;
      circle.setAttribute("stroke-dashoffset", 0);
    },
  }
);
