<script setup>
import BaseIcon from './BaseIcon.vue'
import { BUTTON_TYPE_DANGER, PERIOD_SELEC_OPTIONS } from '@/constants'
import { ICON_TRASH } from '@/icons'
import { isActivityValid } from '@/validators.js'
import { updateActivity, deleteActivity } from '@/activities'
import { timelineItems, resetTimelineItemActivities } from '@/timeline-items'

import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import RemainingActivitySeconds from '@/components/RemainingActivitySeconds.vue'

defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  }
})
function deleteAndResetActivity(activity) {
  resetTimelineItemActivities(timelineItems.value, activity)
  deleteActivity(activity)
}
</script>
<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteAndResetActivity(activity)">
        <BaseIcon :name="ICON_TRASH" class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="grow font-mono"
        placeholder="hh:mm"
        :selected="activity.secondsToComplete || null"
        :options="PERIOD_SELEC_OPTIONS"
        @select="updateActivity(activity, { secondsToComplete: +$event || 0 })"
      />
      <RemainingActivitySeconds :activity="activity" />
    </div>
  </li>
</template>
