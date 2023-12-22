<script setup>
import { ref, provide } from 'vue'
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheActivities from '@/assets/pages/TheActivities.vue'
import TheTimeline from '@/assets/pages/TheTimeline.vue'
import TheProgress from '@/assets/pages/TheProgress.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'
import {
  normalizePageHash,
  generateTimelineItems,
  generateActivitySelectOptions,
  generateActivities,
  generatePeriodSelectOptions
} from './functions'

const currentPage = ref(normalizePageHash())

const activities = ref(generateActivities())
const timelineItems = ref(generateTimelineItems(activities.value))

const activitySelectOptions = generateActivitySelectOptions(activities.value)

const timeline = ref()

function goTo(page) {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timeline.value.scrollToHour()
  }

  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView()
  }
  currentPage.value = page
}

function createActivity(activity) {
  activities.value.push(activity)
}

function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
      timelineItem.activitySeconds = 0
    }
  })
  activities.value.splice(activities.value.indexOf(activity), 1)
}

function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}

provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds)
provide('setActivitySecondsToComplete', setActivitySecondsToComplete)
provide('setTimelineItemActivity', setTimelineItemActivity)
provide('createActivity', createActivity)
provide('deleteActivity', deleteActivity)
provide('timelineItems', timelineItems.value)
provide('activitySelectOptions', activitySelectOptions)
provide('periodSelectOptions', generatePeriodSelectOptions())
</script>

<template>
  <TheHeader @navigate="goTo($event)" />
  <main class="flex flex-grow flex-col">
    <TheTimeline
      ref="timeline"
      v-show="currentPage === PAGE_TIMELINE"
      :current-page="currentPage"
      :timeline-items="timelineItems"
      @update-timeline-item-activity-seconds="updateTimelineItemActivitySeconds"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>
  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
