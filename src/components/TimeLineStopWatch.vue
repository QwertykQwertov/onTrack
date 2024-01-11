<script setup>
import { watchEffect } from 'vue'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/icons'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import { isTimelineItemValid } from '@/validators'
import { formatSeconds } from '@/functions'
import { BUTTON_TYPE_SUCCESS, BUTTON_TYPE_DANGER, BUTTON_TYPE_WARNING } from '@/constants'
import { updateTimelineItem } from '@/timeline-items'
import { useStopwatch } from '@/composables/stopwatch'
import { now } from '@/time'

const props = defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})

const { seconds, isRunning, start, stop, reset } = useStopwatch(props.timelineItem.activitySeconds)

watchEffect(() => {
  if (props.timelineItem.hour !== now.value.getHours() && isRunning.value) {
    stop()
  }
})
watchEffect(() =>
  updateTimelineItem(props.timelineItem, {
    activitySeconds: seconds.value
  })
)
</script>
<template>
  <div class="flex w-full gap-2">
    <BaseButton :disabled="!timelineItem.activitySeconds" :type="BUTTON_TYPE_DANGER" @click="reset">
      <BaseIcon :name="ICON_ARROW_PATH" class="h-8" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE" class="h-8" />
    </BaseButton>
    <BaseButton
      v-else
      :type="BUTTON_TYPE_SUCCESS"
      :disabled="timelineItem.hour !== now.getHours()"
      @click="start"
    >
      <BaseIcon :name="ICON_PLAY" class="h-8" />
    </BaseButton>
  </div>
</template>
