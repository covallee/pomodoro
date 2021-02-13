<template>
  <div>
    <div class="type">{{ type }}</div>
    <div class="counter">{{ time }}</div>
    <button @click="startCounter">{{ isPlaying ? "Pause" : "Start" }}</button>
    <button @click="reset">Reset</button>
    <div class="toggle-wrapper">
      <span>sitting</span>
      <div class="toggle transparent">
        <input
          id="transparent"
          name="toggle"
          type="checkbox"
          v-model="positionToggle"
        />
        <label class="toggle-item" for="transparent"></label>
      </div>
      <span>standing</span>
    </div>
    <div>Total of Pomodoro today: {{ numberOfPomodoro }}</div>
    <Listing />
  </div>
</template>

<script>
import Listing from "./Listing";

export default {
  components: {
    Listing,
  },
  data() {
    return {
      counter: null,
      interval: null,
      isPlaying: false,
      time: "",
      type: "pomodoro",
      pomodoroTime: 25 * 60,
      positionToggle: false,
      startTime: "",
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
    positionStatus() {
      return this.positionToggle ? "standing" : "sitting";
    },
  },
  methods: {
    startCounter() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.setTime();
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
        this.updateStore();
        if (this.type === "pomodoro") {
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
    updateStore() {
      this.$store.dispatch("updateRecords", {
        startTime: this.startTime,
        type: this.type,
        position: this.positionStatus,
      });
    },
    setTime() {
      this.startTime = new Date();
      this.startTime = this.startTime.toLocaleTimeString();
    },
  },
};
</script>

<style lang="scss" scoped>
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

input {
  height: 40px;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 40px;
}
.toggle {
  position: relative;
  display: inline-block;
}

label.toggle-item {
  width: 6em;
  display: inline-block;
  border-radius: 50px;
  margin: 20px;
  position: relative;
  transition: all 0.3s ease;
  transform-origin: 20% center;
  cursor: pointer;

  &::before {
    display: block;
    transition: all 0.2s ease;
    border-radius: 2em;
    transition: 0.3s ease;
    content: "";
    position: absolute;
  }
}
.transparent {
  label {
    background: transparent;
    border: 3px solid #fff;
    height: 2.8em;

    &::before {
      border: 3px solid #fff;
      width: 1.5em;
      height: 1.5em;
      top: 0.3em;
      left: 0.3em;
      background: #fff;
    }
  }
}

.toggle-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  span {
    display: inline-block;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.04em;
  }
}

#transparent:checked + label {
  &:before {
    transform: translateX(50px);
  }
}

.list {
  padding: 16px;
}
</style>
