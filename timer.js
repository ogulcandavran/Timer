class Timer {
  constructor(
    duration,
    startButton,
    stopButton,
    resetButton,
    errorDiv,
    isResetButtonClicked,
    optionalFunctions
  ) {
    this.duration = duration;
    this.startButton = startButton;
    this.stopButton = stopButton;
    this.errorDiv = errorDiv;
    this.resetButton = resetButton;
    this.isResetButtonClicked = isResetButtonClicked;

    if (optionalFunctions) {
      this.onStart = optionalFunctions.onStart;
      this.onEachTick = optionalFunctions.onEachTick;
      this.onComplete = optionalFunctions.onComplete;
      this.onStop = optionalFunctions.onStop;
      this.onReset = optionalFunctions.onReset;
    }

    this.startButton.addEventListener("click", this.start);
    this.stopButton.addEventListener("click", this.stop);
    this.resetButton.addEventListener("click", this.reset);
  }

  start = () => {
    if (typeof this.remainingTime === "number" && this.remainingTime !== 0) {
      if (this.onStart) {
        this.onStart(this.remainingTime);
      }
      this.startButton.removeEventListener("click", this.start);
      this.startButton.disabled = true;
      this.startButton.style.color = "#645c5d";
      this.stopButton.disabled = false;
      this.stopButton.style.color = "#fc9571";
      this.duration.readOnly = true;
      this.errorDiv.textContent = "";
      this.eachTick();
      this.ticker = setInterval(this.eachTick, 50);
    } else {
      clearInterval(this.ticker);
      this.errorDiv.textContent = `I don't know how to countdown from ${this.remainingTime}, please enter a valid number`;
    }
  };

  stop = () => {
    if (this.onStop) {
      this.onStop(this.remainingTime);
    }
    clearInterval(this.ticker);
    this.startButton.disabled = false;
    this.startButton.style.color = "#fc9571";
    this.stopButton.disabled = true;
    this.stopButton.style.color = "#645c5d";
    this.startButton.addEventListener("click", this.start);
  };

  eachTick = () => {
    const remainingTime = this.remainingTime;
    this.remainingTime = remainingTime - 0.05;
    if (this.onEachTick) {
      this.onEachTick(this.remainingTime);
      if (this.remainingTime <= 0) {
        this.stop();
        this.duration.readOnly = false;
        this.startButton.addEventListener("click", this.start);
        if (this.onComplete) {
          this.onComplete();
        }
      }
    }
  };

  reset = () => {
    if (this.onReset) {
      this.onReset();
    }
    this.duration.readOnly = false;
    this.startButton.disabled = false;
    this.startButton.style.color = "#fc9571";
    this.stopButton.style.color = "#645c5d";
    this.stopButton.disabled = true;
    clearInterval(this.ticker);
    this.startButton.addEventListener("click", this.start);
  };

  get remainingTime() {
    const regExp = /[a-zA-Z]/g;
    if (!regExp.test(this.duration.value)) {
      return parseFloat(this.duration.value);
    } else {
      return this.duration.value;
    }
  }

  set remainingTime(time) {
    this.duration.value = time.toFixed(2);
  }
}
