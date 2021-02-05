<template>
  <div>
    <div class="type">{{ type }}</div>
    <div class="counter">{{ time }}</div>
    <button @click="startCounter">Start</button>
    <button @click="reset">Reset</button>
    <div>Total of Pomodoro today: {{ numberOfPomodoro }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 25*60,
      interval: null,
      isPaused: false,
      time: "",
      type: "pomodoro",
    };
  },
  mounted() {
    this.updateTimeString();
  },
  computed: {
    numberOfPomodoro() {
      return this.$store.state.totalToday;
    },
  },
  methods: {
    startCounter() {
      if (this.isPaused) {
        this.stopCounter();
      } else {
        this.interval = setInterval(this.updateCounter, 1000);
      }
    },
    updateCounter() {
      this.counter--;
      this.updateTimeString();
      if (this.counter == 0) {
        this.stopCounter();
        this.playSound();
        this.isPaused = true;
        if (this.type === "pomodoro") {
          this.$store.commit("increment");
          if (this.$store.state.totalToday % 4 === 0) {
            this.type = "Long Break";
            this.counter = 15 * 60;
          } else {
            this.type = "Short Break";
            this.counter = 5 * 60;
          }
          this.updateTimeString();
        } else {
          this.type = "pomodoro";
        }
      }
    },
    stopCounter() {
      clearInterval(this.interval);
    },
    reset() {
      this.counter = 60;
    },
    updateTimeString() {
      let minutes = Math.floor(this.counter / 60);
      let seconds = this.counter % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      this.time = minutes + ":" + seconds;
    },
    playSound() {
      const audio = new Audio(require('@/assets/ding.mp3'));
      audio.play();
    }
  },
};
</script>

<style lang="scss">
.counter {
  font-size: 120px;
  padding: 16px;
}
.type {
  text-transform: uppercase;
  font-weight: 700;
}
button {
  padding: 16px 40px;
  background-color: #7f5af0;
  border: none;
  color: #fffffe;
  font-size: 24px;
  border-radius: 5px;
  margin: 16px;
  cursor: pointer;
}
</style>
