<script setup>
import TimeLineHour from './TimeLineHour.vue'
import TimeLineStopWatch from './TimeLineStopWatch.vue'
import BaseSelect from './BaseSelect.vue'
import {
  isTimelineItemValid,
  validateSelectOptions,
  isActivityValid,
  validateActivities
} from '@/validators.js'
import { NULLABLE_ACTIVITY } from '../constants'

const props = defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  },
  activities: {
    required: true,
    type: Array,
    validator: validateActivities
  },
  activitySelectOptions: {
    required: true,
    type: Array,
    validator: validateSelectOptions
  }
})

const emit = defineEmits({
  selectActivity: isActivityValid
})

function selectActivity(id) {
  emit('selectActivity', findActivityById(id))
}

function findActivityById(id) {
  return props.activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
}
</script>
<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
    <TimeLineHour :hour="timelineItem.hour" />
    <BaseSelect
      placeholder="Rest"
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      @select="selectActivity"
    />
    <TimeLineStopWatch :seconds="timelineItem.activitySeconds"/>
  </li>
</template>
