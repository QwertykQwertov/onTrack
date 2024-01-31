<script setup lang="ts" generic="T extends number | string">
import BaseIcon from './BaseIcon.vue'
import BaseButton from './BaseButton.vue'
import { normalizeSelectValue } from '../functions'
import { IconName, ButtonType,  type SelectOption } from '../types'

defineProps<{
  options: SelectOption<T>[]
  selected: T | null
  placeholder: string
}>()

// const emit = defineEmits<{ (e: 'select', value: number | string | null): void }>()
const emit = defineEmits<{ select: [value: T | null] }>()

function select(value: string | null) {
  emit('select', normalizeSelectValue(value))
}
</script>
<template>
  <div class="flex gap-2">
    <BaseButton @click="select(null)" :type="ButtonType.NEUTRAL">
      <BaseIcon :name="IconName.X_MARK" class="h-8" />
    </BaseButton>
    <select
      name=""
      id=""
      class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl"
      @change="select(($event.target as HTMLSelectElement).value)"
    >
      <option :selected="selected === null" disabled value="">{{ placeholder }}</option>
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
