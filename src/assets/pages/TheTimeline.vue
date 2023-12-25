<script setup>
import TimeLineItem from '@/components/TimeLineItem.vue'
import { nextTick, watchPostEffect } from 'vue'
import { PAGE_TIMELINE } from '@/constants'
import { currentPage } from '@/router'
import { timelineItems, timelineItemRefs, scrollToCurrentHour } from '@/timeline-items'

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    await nextTick()

    scrollToCurrentHour(false)
  }
})
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimeLineItem
        ref="timelineItemRefs"
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        @scroll-to-hour="scrollToHour(timelineItem.hour)"
      />
    </ul>
  </div>
</template>
