<script setup>
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/icons'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import { isTimelineItemValid } from '@/validators'
import { formatSeconds } from '@/functions'
import { BUTTON_TYPE_SUCCESS, BUTTON_TYPE_DANGER, BUTTON_TYPE_WARNING } from '@/constants'
import { now } from '@/time'
import { activeTimelineItem } from '@/timeline-items'
import {
  resetTimelineItemTimer,
  startTimelineItemTimer,
  stopTimelineItemTimer,
} from '@/timeline-item-timer'

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})
</script>
<template>
  <div class="flex w-full gap-2">
    <BaseButton
      :disabled="!timelineItem.activitySeconds"
      :type="BUTTON_TYPE_DANGER"
      @click="resetTimelineItemTimer(timelineItem)"
    >
      <BaseIcon :name="ICON_ARROW_PATH" class="h-8" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton
      v-if="timelineItem === activeTimelineItem"
      :type="BUTTON_TYPE_WARNING"
      @click="stopTimelineItemTimer"
    >
      <BaseIcon :name="ICON_PAUSE" class="h-8" />
    </BaseButton>
    <BaseButton
      v-else
      :type="BUTTON_TYPE_SUCCESS"
      :disabled="timelineItem.hour !== now.getHours()"
      @click="startTimelineItemTimer(timelineItem)"
    >
      <BaseIcon :name="ICON_PLAY" class="h-8" />
    </BaseButton>
  </div>
</template>
