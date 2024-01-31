<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { navigate, currentPage } from '../router'
import { scrollToCurrentHour } from '../timeline-items'
import { PageName, type NavItem } from '../types'

const props = defineProps<{ navItem: NavItem }>()

const classes = computed((): string[] => [
  'flex flex-col items-center p-2 text-xs capitalize',
  props.navItem.page === currentPage.value ? 'bg-gray-200' : 'hover:bg-gray-100'
])

function handleclick(): void {
  currentPage.value === PageName.TIMELINE && props.navItem.page === PageName.TIMELINE
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
