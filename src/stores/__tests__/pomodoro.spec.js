import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePomodoroStore } from '@/stores/pomodoro'

describe('Pomodoro Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with empty pomodoros', () => {
    const store = usePomodoroStore()
    expect(store.pomodoros).toEqual([])
    expect(store.totalToday).toBe(0)
  })

  it('adds a pomodoro record', () => {
    const store = usePomodoroStore()
    store.addPomodoro({
      startTime: '10:00:00',
      type: 'pomodoro',
      position: 'sitting'
    })
    expect(store.pomodoros).toHaveLength(1)
    expect(store.totalToday).toBe(1)
  })

  it('only counts pomodoro type for totalToday', () => {
    const store = usePomodoroStore()
    store.addPomodoro({
      startTime: '10:00:00',
      type: 'pomodoro',
      position: 'sitting'
    })
    store.addPomodoro({
      startTime: '10:30:00',
      type: 'Short Break',
      position: 'standing'
    })
    expect(store.pomodoros).toHaveLength(2)
    expect(store.totalToday).toBe(1)
  })

  it('resets the store', () => {
    const store = usePomodoroStore()
    store.addPomodoro({
      startTime: '10:00:00',
      type: 'pomodoro',
      position: 'sitting'
    })
    store.reset()
    expect(store.pomodoros).toEqual([])
    expect(store.totalToday).toBe(0)
  })
})
