
import { ref, computed } from 'vue'
import {
  SECONDS_IN_DAY,
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_HOUR
} from '@/constants'

const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND)

export function today() {
  return new Date()
}

export function tomorrow() {
  const tomorrow = today()

  tomorrow.setDate(tomorrow.getDate() + 1)

  return tomorrow
}

export function isToday(date) {
  return date.toDateString() === today().toDateString()
}

export const now = ref(today())

export const secondsSinceMidnightInPercentage = computed(() => {
  return (100 * secondsSinceMidnight.value) / SECONDS_IN_DAY
})

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

export function startCurrentDateTimer() {
  setInterval(() => now.value = today(), MILLISECONDS_IN_SECOND)
}

export function endOfHour(date) {
  const endOfHour = new Date(date)
  endOfHour.setTime(endOfHour.getTime() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND)
  endOfHour.setMinutes(0, 0, 0)

  return endOfHour
}

export function toSeconds(milliseconds) {
  return Math.round(milliseconds / MILLISECONDS_IN_SECOND)
}