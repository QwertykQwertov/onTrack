<script setup lang="ts">
import { onActivated } from 'vue'
import { timelineItems, timelineItemRefs, scrollToCurrentHour } from '../../timeline-items'
import TimeLineItem from '../../components/TimeLineItem.vue'
import TheTimelineIndicator from '../../components/TheTimelineIndicator.vue'

onActivated(scrollToCurrentHour)
</script>

<template>
  <div class="mt-7 relative">
    <TheTimelineIndicator />
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
