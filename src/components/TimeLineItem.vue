<script setup>
import { inject } from 'vue'
import TimeLineHour from './TimeLineHour.vue'
import TimeLineStopWatch from './TimeLineStopWatch.vue'
import BaseSelect from './BaseSelect.vue'
import { isTimelineItemValid, isHourValid } from '@/validators.js'

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})

const emit = defineEmits({
  scrollToHour: isHourValid
})

const setTimelineItemActivity = inject('setTimelineItemActivity')
const activitySelectOptions = inject('activitySelectOptions')

</script>
<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
    <TimeLineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour', timelineItem.hour)"
    />
    <BaseSelect
      placeholder="Rest"
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      @select="setTimelineItemActivity(timelineItem, $event)"
    />
    <TimeLineStopWatch :timeline-item="timelineItem" />
  </li>
</template>
