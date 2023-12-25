<script setup>
import TimeLineHour from './TimeLineHour.vue'
import TimeLineStopWatch from './TimeLineStopWatch.vue'
import BaseSelect from './BaseSelect.vue'
import { isTimelineItemValid, isUndefined } from '@/validators.js'
import {updateTimelineItem} from '@/timeline-items'
import {activitySelectOptions} from '@/activities'

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})

const emit = defineEmits({
  scrollToHour: isUndefined
})

</script>
<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
    <TimeLineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour')"
    />
    <BaseSelect
      placeholder="Rest"
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      @select="updateTimelineItem(timelineItem, {activityId: $event})"
    />
    <TimeLineStopWatch :timeline-item="timelineItem" />
  </li>
</template>
