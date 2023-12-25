<script setup>
import { provide, readonly } from 'vue'
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheActivities from '@/assets/pages/TheActivities.vue'
import TheTimeline from '@/assets/pages/TheTimeline.vue'
import TheProgress from '@/assets/pages/TheProgress.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'
import { generatePeriodSelectOptions } from './functions'
import { currentPage, timelineRef } from '@/router.js'
import * as keys from '@/keys.js'
import {
  activitySelectOptions,
  createActivity,
  deleteActivity,
  setActivitySecondsToComplete,
  activities
} from '@/activities.js'
import {
  updateTimelineItemActivitySeconds,
  setTimelineItemActivity,
  timelineItems,
  resetTimelineItemActivities
} from '@/timeline-items.js'

provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds)
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete)
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)
provide(keys.createActivityKey, createActivity)
provide(keys.deleteActivityKey,(activity) => {resetTimelineItemActivities(activity), deleteActivity(activity)} )
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions))
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()))
</script>

<template>
  <TheHeader />
  <main class="flex flex-grow flex-col">
    <TheTimeline
      ref="timelineRef"
      v-show="currentPage === PAGE_TIMELINE"
      :current-page="currentPage"
      @update-timeline-item-activity-seconds="updateTimelineItemActivitySeconds"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>
  <TheNav />
</template>
