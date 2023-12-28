<script setup>
import { computed } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { navigate, currentPage } from '@/router.js'
import { isNavItemValid } from '@/validators.js'

const props = defineProps({
  navItem: { required: true, type: Object, validator: isNavItemValid }
})

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize',
  { 'pointer-events-none bg-gray-200': props.navItem.page == currentPage.value }
])
</script>

<template>
  <li class="flex-1 border">
    <a :href="`#${navItem.page}`" @click="navigate(navItem.page)" :class="classes">
      <BaseIcon :name="navItem.icon" class="h-6 w-6" /> {{ navItem.page }}
    </a>
  </li>
</template>
