<script setup>
import TimeLineItem from '@/components/TimeLineItem.vue'
import {isTimeLIneItemValid} from '@/validators.js'

const props = defineProps({
  timelineItems: {
    required: true,
    type: Array,
    validator(timelineItems) {
      return timelineItems.every(isTimeLIneItemValid)
    }
  }
})
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimeLineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
      />
    </ul>
  </div>
</template>
