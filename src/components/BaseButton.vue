<script lang="ts">
import { ButtonType } from '../types'

const typeClasses: Record<ButtonType, string> = {
  [ButtonType.SUCCESS]: 'bg-green-500 enabled:hover:bg-red-600 text-white',
  [ButtonType.WARNING]: 'bg-yellow-500 enabled:hover:bg-red-600 text-white',
  [ButtonType.DANGER]: 'bg-red-500 enabled:hover:bg-red-600 text-white',
  [ButtonType.NEUTRAL]: 'bg-gray-100 enabled:hover:bg-gray-200',
  [ButtonType.PRIMARY]: 'bg-purple-500 enabled:hover:bg-purple-600, text-white'
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<{ type?: ButtonType }>(), { type: ButtonType.PRIMARY })

const classes = `${
  typeClasses[props.type]
} rounded p-3 disabled:cursor-not-allowed disabled:opacity-50`
</script>
<template>
  <button :class="classes">
    <slot />
  </button>
</template>
