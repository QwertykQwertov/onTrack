<script setup>
import { computed } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { navigate, currentPage } from '@/router.js'
import { isNavItemValid } from '@/validators.js'
import { scrollToCurrentHour } from '@/timeline-items'
import { PAGE_TIMELINE } from '../constants'

const props = defineProps({
  navItem: { required: true, type: Object, validator: isNavItemValid }
})

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize',
  props.navItem.page === currentPage.value ? 'bg-gray-200' : 'hover:bg-gray-100',
 ])

function handleclick() {
  currentPage.value === PAGE_TIMELINE && props.navItem.page === PAGE_TIMELINE
    ? scrollToCurrentHour(true)
    : navigate(props.navItem.page)
}
</script>

<template>
  <li class="flex-1 border">
    <a :href="`#${navItem.page}`" @click="handleclick" :class="classes">
      <BaseIcon :name="navItem.icon" class="h-6 w-6" /> {{ navItem.page }}
    </a>
  </li>
</template>
