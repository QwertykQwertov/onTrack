import { LOCAL_STORAGE_KEY } from "@/constants";
import { today } from "@/time";
import { activities } from '@/activities'
import { timelineItems } from '@/timeline-items'
import { activeTimelineItem, initializeTimelineItems } from "./timeline-items";
import { startTimelineItemTimer, stopTimelineItemTimer } from "@/timeline-item-timer";
import { initializeActivities } from "./activities";

export function syncState(shouldLoad = true) {
  shouldLoad ? loadState() : saveState()

  if (activeTimelineItem.value) {
    shouldLoad ?
      startTimelineItemTimer() :
      stopTimelineItemTimer()
  }
}

function loadState() {
  const state = loadFromLocalStorage()

  initializeActivities(state)
  initializeTimelineItems(state)
}

function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}')
}


function saveState() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
    timelineItems: timelineItems.value,
    activities: activities.value,
    lastActiveAt: today()
  }))
}



