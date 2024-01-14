<script setup>
import { ref, computed } from 'vue'
import { secondsSinceMidnightInPercentage } from '@/time'

const indicatorRef = ref()


const topOffset = computed(
  () => (secondsSinceMidnightInPercentage.value * getTimelineHeight()) / 100
)

function getTimelineHeight() {
  return indicatorRef.value?.parentNode.getBoundingClientRect().height
}


</script>

<template>
  <hr
    ref="indicatorRef"
    class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
    :style="{ top: topOffset + 'px' }"
  />
</template>
