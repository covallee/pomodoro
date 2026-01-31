import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePomodoroStore = defineStore('pomodoro', () => {
  // State
  const pomodoros = ref([])

  // Getters
  const totalToday = computed(() => {
    return pomodoros.value.filter(p => p.type === 'pomodoro').length
  })

  // Actions
  function addPomodoro(record) {
    pomodoros.value.push(record)
  }

  function reset() {
    pomodoros.value = []
  }

  return {
    pomodoros,
    totalToday,
    addPomodoro,
    reset
  }
})
