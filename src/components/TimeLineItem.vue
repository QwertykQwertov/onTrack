<script setup>
import { ref } from 'vue'
import TimeLineHour from './TimeLineHour.vue';
import BaseSelect from './BaseSelect.vue'
import { isTimeLIneItemValid, validateSelectOptions } from '@/validators.js'

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimeLIneItemValid
  },
  activitySelectOptions: {
    required: true,
    type: Array,
    validator: validateSelectOptions
  }
})

const selectedActivityId = ref(0)
</script>
<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
    <TimeLineHour :hour="timelineItem.hour"/>
    <BaseSelect
      :selected="selectedActivityId"
      :options="activitySelectOptions"
      placeholder="Rest"
      @select="selectedActivityId = $event"
      type="danger"
    />
  </li>
</template>
