<script setup>
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheActivities from '@/assets/pages/TheActivities.vue'
import TheTimeline from '@/assets/pages/TheTimeline.vue'
import TheProgress from '@/assets/pages/TheProgress.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'
import { currentPage, timelineRef } from '@/router.js'

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
