<template>
  <div>
    <div class="type">{{ type }}</div>
    <div class="counter">{{ time }}</div>
    <button @click="startCounter">{{ isPlaying ? "Pause" : "Start" }}</button>
    <button @click="reset">Reset</button>
    <div>Total of Pomodoro today: {{ numberOfPomodoro }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: null,
      interval: null,
      isPlaying: false,
      time: "",
      type: "pomodoro",
      pomodoroTime: 25 * 60,
    };
  },
  mounted() {
    this.counter = this.pomodoroTime;
    this.updateTimeString();
  },
  computed: {
    numberOfPomodoro() {
      return this.$store.state.totalToday;
    },
  },
  methods: {
    startCounter() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.interval = setInterval(this.updateCounter, 1000);
      } else {
        this.stopCounter();
      }
    },
    updateCounter() {
      this.counter--;
      this.updateTimeString();
      if (this.counter == 0) {
        this.stopCounter();
        this.playSound();
        this.isPlaying = false;
        if (this.type === "pomodoro") {
          this.$store.commit("INCREMENT_TOTAL");
          if (this.$store.state.totalToday % 4 === 0) {
            this.type = "Long Break";
            this.counter = 15 * 60;
          } else {
            this.type = "Short Break";
            this.counter = 5 * 60;
          }
        } else {
          this.type = "pomodoro";
          this.counter = this.pomodoroTime;
        }
        this.updateTimeString();
      }
    },
    stopCounter() {
      clearInterval(this.interval);
    },
    reset() {
      this.stopCounter();
      this.counter = this.pomodoroTime;
      this.updateTimeString();
      this.isPlaying = false;
    },
    updateTimeString() {
      let minutes = Math.floor(this.counter / 60);
      let seconds = this.counter % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      this.time = minutes + ":" + seconds;
    },
    playSound() {
      const audio = new Audio(require("@/assets/ding.mp3"));
      audio.play();
    },
  },
};
</script>

<style lang="scss">
.counter {
  font-size: 140px;
  padding: 16px;
}
.type {
  text-transform: uppercase;
  font-weight: 700;
  color: var(--tertiary);
}
button {
  padding: 16px 40px;
  background-color: var(--button);
  border: none;
  color: #fffffe;
  font-size: 24px;
  border-radius: 5px;
  margin: 16px;
  cursor: pointer;
  font-weight: 400;
  letter-spacing: 0.04em;
}
</style>
