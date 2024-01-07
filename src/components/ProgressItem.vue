<script setup>
import { calculateActivityCompletionPercentage } from '@/activities'
import { getProgressColorClass, formatSeconds } from '@/functions'
import { timelineItems, calculateTrackedActivitySeconds } from '@/timeline-items'
import { computed } from 'vue'
import { isActivityValid } from '@/validators'

const props = defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  }
})

const percentage = computed(() =>
  calculateActivityCompletionPercentage(props.activity, trackedActivitySeconds.value)
)
const trackedActivitySeconds = computed(() =>
  calculateTrackedActivitySeconds(timelineItems.value, props.activity)
)
</script>

<template>
  <li class="flex flex-col gap-1 p-5">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div :class="getProgressColorClass(percentage)" :style="`width: ${percentage}%`"></div>
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ percentage }}%</span>
      <span
        >{{ formatSeconds(trackedActivitySeconds) }} /
        {{ formatSeconds(activity.secondsToComplete) }}</span
      >
    </div>
  </li>
</template>
