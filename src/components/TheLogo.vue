<script setup lang="ts">
import { navigate, currentPage } from '../router'
import { scrollToCurrentHour } from '../timeline-items'
import BaseIcon from './BaseIcon.vue'
import { IconName, PageName } from '../types'

function handleclick(): void {
  currentPage.value === PageName.TIMELINE ? scrollToCurrentHour(true) : navigate(PageName.TIMELINE)
}
</script>
<template>
  <a
    :href="`#${PageName.TIMELINE}`"
    @click="handleclick"
    class="scale-125 rounded bg-black p-1 text-white"
  >
    <BaseIcon :name="IconName.CLOCK" class="h-5" />
  </a>
</template>
