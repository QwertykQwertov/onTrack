
import { ref, computed, watchEffect, onActivated, onDeactivated } from 'vue'
import {
  SECONDS_IN_DAY,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE,
  MILLISECONDS_IN_SECOND
} from '@/constants'

function calculateSecondsSinceMidnight() {
  const now = new Date()

  return (
    SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() +
    SECONDS_IN_MINUTE * now.getMinutes() +
    now.getSeconds()
  )
}

export function useSecondsSinceMidnight() {
  const secondsSinceMidnight = ref(calculateSecondsSinceMidnight())

  const secondsSinceMidnightInPercentage = computed(() => {
    return (100 * secondsSinceMidnight.value) / SECONDS_IN_DAY
  })

  watchEffect(() => {
    if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
      secondsSinceMidnight.value = 0
    }
  })

  let timer = null

  onActivated(() => {
    secondsSinceMidnight.value = calculateSecondsSinceMidnight()
    timer = setInterval(() => secondsSinceMidnight.value++, MILLISECONDS_IN_SECOND)
  })

  onDeactivated(() => {
    clearInterval(timer)
  })

  return {
    secondsSinceMidnightInPercentage
  }
}