export const stopwatch = {
    ms: 0,
    sec: 0,
    min: 0,
    count: null,
  
    start() {
      this.count = setInterval(() => {
        this.ms++;
        if (this.ms === 100) {
          this.ms = 0;
          this.sec++;
          if (this.sec === 60) {
            this.sec = 0;
            this.min++;
          }
        }
        this.update();
      }, 10);
    },
  
    stop() {
      clearInterval(this.count);
    },
  
    update() {
      const timer = document.getElementById("timer");
      timer.textContent = `${this.pad(this.min)}:${this.pad(this.sec)}:${this.pad(this.ms)}`;
    },
  
    pad(value) {
      return value.toString().padStart(2, "0");
    },
  };
  