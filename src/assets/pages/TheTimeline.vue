<script setup>
import TimeLineItem from '@/components/TimeLineItem.vue'
import { nextTick, ref, watchPostEffect } from 'vue'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants'
import { currentPage } from '@/router'
import { currentHour } from '@/functions'
import { timelineItems } from '@/timeline-items'


defineExpose({ scrollToHour })

const timelineItemRefs = ref([])

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    await nextTick()

    scrollToHour(currentHour())
  }
})

function scrollToHour(hour = null) {
  hour ??= currentHour()

  // const options = {behavior: isSmooth ? 'smooth' : 'instant'}
  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el

  const options = { behavior: 'smooth' }
  el.scrollIntoView(options)
}
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
