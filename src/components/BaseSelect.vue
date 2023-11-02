<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import BaseButton from './BaseButton.vue'

// const props = defineProps(['selected', 'options', 'placeholder'])
const props = defineProps({
  selected: Number,
  options: { required: true, type: Array,
  valudator(options){
    return options.every(({value, label}) => {
      typeof value === 'number' && typeof label === 'string'
    })
  } },
  placeholder: { required: true, type: String }
})
</script>
<template>
  <div class="flex gap-2">
    <BaseButton>
      <XMarkIcon class="h-8" />
    </BaseButton>
    <select name="" id="" class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl">
      <option selected disabled value="">{{ placeholder }}</option>
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
