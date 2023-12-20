<script setup>
import TimeLineItem from '@/components/TimeLineItem.vue'
import {
  validateTimelineItems,
  isTimelineItemValid,
  isActivityValid,
  isPageValid
} from '@/validators.js'
import { nextTick, ref, watchPostEffect } from 'vue'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants'

const props = defineProps({
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems
  },
  currentPage: {
    required: true,
    type: String,
    validator: isPageValid
  }
})

const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(Boolean)
  }
})

defineExpose({ scrollToHour })

const timelineItemsRefs = ref([])

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()

    scrollToHour(new Date().getHours())
  }
})

function scrollToHour(hour = null) {
  hour ??= new Date().getHours()
  const options = { behavior: 'smooth' }
  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView(options)
  } else {
    timelineItemsRefs.value[hour - 1].$el.scrollIntoView(options)
  }
}
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimeLineItem
        ref="timelineItemsRefs"
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        @scroll-to-hour="scrollToHour"
        @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
      />
    </ul>
  </div>
</template>
