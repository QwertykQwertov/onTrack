<script setup lang="ts">
import { formatSeconds } from '../functions'
import { now } from '../time'
import { activeTimelineItem } from '../timeline-items'
import {
  resetTimelineItemTimer,
  startTimelineItemTimer,
  stopTimelineItemTimer
} from '../timeline-item-timer'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import { IconName, ButtonType, type TimelineItem } from '../types'

defineProps<{ timelineItem: TimelineItem }>()
</script>
<template>
  <div class="flex w-full gap-2">
    <BaseButton
      :disabled="!timelineItem.activitySeconds"
      :type="ButtonType.DANGER"
      @click="resetTimelineItemTimer(timelineItem)"
    >
      <BaseIcon :name="IconName.ARROW_PATH" class="h-8" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton
      v-if="timelineItem === activeTimelineItem"
      :type="ButtonType.WARNING"
      @click="stopTimelineItemTimer"
    >
      <BaseIcon :name="IconName.PAUSE" class="h-8" />
    </BaseButton>
    <BaseButton
      v-else
      :type="ButtonType.SUCCESS"
      :disabled="timelineItem.hour !== now.getHours()"
      @click="startTimelineItemTimer(timelineItem)"
    >
      <BaseIcon :name="IconName.PLAY" class="h-8" />
    </BaseButton>
  </div>
</template>
