<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import BaseButton from './BaseButton.vue'
import { validateSelectOptions, isUndefinedOrNull, isSelectValueValid } from '@/validators.js'
import { BUTTON_TYPE_NEUTRAL } from '@/constants.js'
import { computed } from 'vue'

const props = defineProps({
  selected: [String, Number],
  options: { required: true, type: Array, validator: validateSelectOptions },
  placeholder: { required: true, type: String }
})
const emit = defineEmits({
  select: isSelectValueValid
})

const isNotSelected = computed(() => {
  return isUndefinedOrNull(props.selected) 
})
</script>
<template>
  <div class="flex gap-2">
    <BaseButton @click="emit('select', null)" :type="BUTTON_TYPE_NEUTRAL">
      <XMarkIcon class="h-8" />
    </BaseButton>
    <select
      name=""
      id=""
      class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl"
      @change="emit('select', $event.target.value)"
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
