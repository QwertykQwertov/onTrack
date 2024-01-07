<script setup>
import TimeLineItem from '@/components/TimeLineItem.vue'
import { onActivated } from 'vue'
import { timelineItems, timelineItemRefs, scrollToCurrentHour } from '@/timeline-items'


onActivated(scrollToCurrentHour)
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimeLineItem
        ref="timelineItemRefs"
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
      />
    </ul>
  </div>
</template>
