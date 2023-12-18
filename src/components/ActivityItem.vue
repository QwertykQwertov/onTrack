<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'
import { PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER } from '../constants'
import { isActivityValid, isUndefined, isNumber, validateTimelineItems } from '@/validators.js'

import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import ActivitySecondsToComplete from '@/components/ActivitySecondsToComplete.vue'

defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  },  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems
  },
})

const emit = defineEmits({
  setSecondsToComplete: isNumber,
  delete: isUndefined
})
</script>
<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="grow font-mono"
        placeholder="hh:mm"
        :selected="activity.secondsToComplete || null"
        :options="PERIOD_SELECT_OPTIONS"
        @select="emit('setSecondsToComplete', +$event || 0)"
      />
      <ActivitySecondsToComplete :activity="activity" :timeline-items="timelineItems" />
    </div>
  </li>
</template>
