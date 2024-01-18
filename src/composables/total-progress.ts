import { type ComputedRef, computed } from 'vue'
import { getProgressColorClass } from '../functions'
import { trackedActivities, calculateCompletionPercentage } from '../activities'
import { timelineItems, calculateTrackedActivitySeconds } from '../timeline-items'
import { ProgressColorClass } from '../types'

export function useTotalProgress(): {
  colorClass: ComputedRef<ProgressColorClass>
  percentage: ComputedRef<number>
} {

  const colorClass = computed((): ProgressColorClass => getProgressColorClass(percentage.value))

  const percentage = computed((): number => calculateCompletionPercentage(totalTrackedSeconds.value))

  const totalTrackedSeconds = computed((): number => {
    return trackedActivities.value
      .map((activity): number => Math.min(calculateTrackedActivitySeconds(timelineItems.value, activity)
        , activity.secondsToComplete)
      ).reduce((total, seconds): number => total + seconds, 0)
  })

  return {
    colorClass,
    percentage
  }
}