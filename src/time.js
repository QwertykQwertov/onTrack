
import { ref, computed } from 'vue'
import {
  SECONDS_IN_DAY,
  MILLISECONDS_IN_SECOND
} from '@/constants'

const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND)

export const now = ref(new Date())


export const secondsSinceMidnightInPercentage = computed(() => {
  return (100 * secondsSinceMidnight.value) / SECONDS_IN_DAY
})

const midnight = computed(() => new Date(now.value).setHours(0,0,0,0))

let timer = null

export function startTimer() {
  secondsSinceMidnight.value = new Date()
  timer = setInterval(() => 
  now.value = new Date(now.value.getTime() + 5 * 60 * 1000),
   MILLISECONDS_IN_SECOND)
}


export function stopTimer() {
  clearInterval(timer)
}
