<script setup lang="ts" generic="T extends number | string">
import BaseIcon from './BaseIcon.vue'
import { ICON_X_MARK } from '../icons'
import BaseButton from './BaseButton.vue'
import { isUndefinedOrNull } from '../validators'
import { BUTTON_TYPE_NEUTRAL } from '../constants'
import { computed } from 'vue'
import { normalizeSelectValue } from '../functions'
import type { SelectOption } from '../types'

const props = defineProps<{
  options: SelectOption<T>[]
  selected: T | null
  placeholder: string
}>()

// const emit = defineEmits<{ (e: 'select', value: number | string | null): void }>()
const emit = defineEmits<{ select: [value: T | null] }>()

const isNotSelected = computed((): boolean => {
  return isUndefinedOrNull(props.selected)
})

function select(value: string | null) {
  emit('select', normalizeSelectValue(value))
}
</script>
<template>
  <div class="flex gap-2">
    <BaseButton @click="select(null)" :type="BUTTON_TYPE_NEUTRAL">
      <BaseIcon :name="ICON_X_MARK" class="h-8" />
    </BaseButton>
    <select
      name=""
      id=""
      class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl"
      @change="select(($event.target as HTMLSelectElement).value)"
    >
      <option :selected="isNotSelected" disabled value="">{{ placeholder }}</option>
      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :selected="value === selected"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>
