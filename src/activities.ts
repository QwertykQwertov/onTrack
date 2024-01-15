import { computed, ref } from 'vue'

interface Activity {
  id: string
  name: string
  secondsToComplete: number
}

interface activitySelectOption {
  value: string
  label: string
}

export const activities = ref<Activity[]>([])

export const trackedActivities = computed<Activity[]>(() =>
  activities.value.filter(({ secondsToComplete }): boolean => secondsToComplete !== 0)
)

export const activitySelectOptions = computed<activitySelectOption[]>(() =>
  generateActivitySelectOptions(activities.value)
)

export function initializeActivities(state: any): void {
  activities.value = state.activities || []
}

export function createActivity(activity: Activity): void {
  activities.value.push(activity)
}

export function updateActivity(activity: Activity, fields: any): Activity {
  return Object.assign(activity, fields)
}

export function deleteActivity(activity: Activity): void {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function calculateActivityCompletionPercentage(
  { secondsToComplete }: Activity,
  trackedSeconds: number
): number {
  return Math.floor((trackedSeconds * 100) / secondsToComplete)
}

export function calculateCompletionPercentage(totalTrackedSeconds: number): number {
  return Math.floor((totalTrackedSeconds * 100) / totalActivitySecondsToComplete.value)
}

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value
    .map(({ secondsToComplete }): number => secondsToComplete)
    .reduce((total, seconds) => total + seconds, 0)
})

function generateActivitySelectOptions(activities: Activity[]): activitySelectOption[] {
  return activities.map((activity): activitySelectOption => ({ value: activity.id, label: activity.name }))
}
