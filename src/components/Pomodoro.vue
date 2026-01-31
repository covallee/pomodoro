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
    <div>Total of Pomodoro today: {{ store.totalToday }}</div>
    <Listing />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usePomodoroStore } from '@/stores/pomodoro'
import Listing from './Listing.vue'
import dingSound from '@/assets/ding.mp3'

const store = usePomodoroStore()

const POMODORO_TIME = 25 * 60
const SHORT_BREAK = 5 * 60
const LONG_BREAK = 15 * 60

const counter = ref(POMODORO_TIME)
const interval = ref(null)
const isPlaying = ref(false)
const type = ref('pomodoro')
const positionToggle = ref(false)
const startTime = ref('')

const positionStatus = computed(() => positionToggle.value ? 'standing' : 'sitting')

const time = computed(() => {
  const minutes = Math.floor(counter.value / 60)
  let seconds = counter.value % 60
  seconds = seconds < 10 ? '0' + seconds : seconds
  return `${minutes}:${seconds}`
})

function startCounter() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    setTime()
    interval.value = setInterval(updateCounter, 1000)
  } else {
    stopCounter()
  }
}

function updateCounter() {
  counter.value--
  if (counter.value === 0) {
    stopCounter()
    playSound()
    isPlaying.value = false
    updateStore()
    
    if (type.value === 'pomodoro') {
      if (store.totalToday % 4 === 0) {
        type.value = 'Long Break'
        counter.value = LONG_BREAK
      } else {
        type.value = 'Short Break'
        counter.value = SHORT_BREAK
      }
    } else {
      type.value = 'pomodoro'
      counter.value = POMODORO_TIME
    }
  }
}

function stopCounter() {
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  }
}

function reset() {
  stopCounter()
  counter.value = POMODORO_TIME
  isPlaying.value = false
  type.value = 'pomodoro'
}

function playSound() {
  const audio = new Audio(dingSound)
  audio.play()
}

function updateStore() {
  store.addPomodoro({
    startTime: startTime.value,
    type: type.value,
    position: positionStatus.value
  })
}

function setTime() {
  const now = new Date()
  startTime.value = now.toLocaleTimeString()
}

onMounted(() => {
  // Timer is already set via ref initial value
})

onUnmounted(() => {
  stopCounter()
})
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
