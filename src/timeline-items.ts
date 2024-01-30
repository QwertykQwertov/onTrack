import { computed, ref, watch, ComponentPublicInstance } from 'vue'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from './constants'
import { now, today, isToday, endOfHour, toSeconds } from './time'
import { stopTimelineItemTimer } from './timeline-item-timer'
import type { Activity, State, TimelineItem, Hour } from './types'

export const timelineItemRefs = ref<ComponentPublicInstance[] | null>(null)
export const timelineItems = ref<TimelineItem[]>([])
export const activeTimelineItem = computed((): TimelineItem | undefined =>
  timelineItems.value.find(({ isActive }): boolean => isActive)
)

watch<Date>(now, (after, before): void => {
  if (activeTimelineItem.value && activeTimelineItem.value.hour !== after.getHours()) {
    stopTimelineItemTimer()
  }

  if (before.getHours() !== after.getHours() && after.getHours() == MIDNIGHT_HOUR) {
    resetTimelineItems()
  }
})

export function initializeTimelineItems(state: State): void {
  const lastActiveAt = new Date(state.lastActiveAt)

  timelineItems.value = state.timelineItems ?? generateTimelineItems()

  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    syncIdleSeconds(lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    resetTimelineItems()
  }
}

export function updateTimelineItem(
  timelineItem: TimelineItem,
  fields: Partial<TimelineItem>
): TimelineItem {
  return Object.assign(timelineItem, fields)
}

export function resetTimelineItemActivities(
  timelineItems: TimelineItem[],
  activity: Activity
): void {
  filterTimelineItemsByActivity(timelineItems, activity).forEach(
    (timelineItem: TimelineItem): void => {
      updateTimelineItem(timelineItem, {
        activityId: null,
        activitySeconds: timelineItem.hour === today().getHours() ? timelineItem.activitySeconds : 0
      })
    }
  )
}

export function calculateTrackedActivitySeconds(
  timelineItems: TimelineItem[],
  activity: Activity
): number {
  return filterTimelineItemsByActivity(timelineItems, activity).reduce(
    (totalSeconds: number, timelineItem: TimelineItem): number =>
      Math.round(timelineItem.activitySeconds + totalSeconds),
    0
  )
}

export function scrollToCurrentHour(isSmooth = false): void {
  scrollToHour(today().getHours() as Hour, isSmooth)
}

export function scrollToHour(hour: Hour, isSmooth = true): void {
  const el: HTMLBodyElement | HTMLLIElement =
    hour === MIDNIGHT_HOUR || !timelineItemRefs.value
      ? document.body
      : timelineItemRefs.value[hour - 1].$el

  // const options = { behavior: 'smooth' }
  el.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' })
}

function filterTimelineItemsByActivity(
  timelineItems: TimelineItem[],
  { id }: Activity
): TimelineItem[] {
  return timelineItems.filter(({ activityId }): boolean => activityId === id)
}

function generateTimelineItems(): TimelineItem[] {
  return ([...Array(HOURS_IN_DAY).keys()] as Hour[]).map(
    (hour): TimelineItem => ({
      hour,
      activityId: null,
      activitySeconds: 0,
      isActive: false
    })
  )
}

function resetTimelineItems(): void {
  return timelineItems.value.forEach((timelineItem): void => {
    updateTimelineItem(timelineItem, {
      activitySeconds: 0,
      isActive: false
    })
  })
}

function syncIdleSeconds(lastActiveAt: Date): void {
  updateTimelineItem(activeTimelineItem.value as any, {
    activitySeconds:
      (activeTimelineItem.value as any).activitySeconds + calculateIdleSeconds(lastActiveAt)
  })
}

function calculateIdleSeconds(lastActiveAt: Date): number {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds((today() as any) - (lastActiveAt as any))
    : toSeconds((endOfHour(lastActiveAt) as any) - (lastActiveAt as any))
}
