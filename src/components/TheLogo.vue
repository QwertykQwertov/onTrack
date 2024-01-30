<script setup lang="ts">
import { PAGE_TIMELINE } from '../constants'
import { navigate, currentPage } from '../router'
import { scrollToCurrentHour } from '../timeline-items'
import BaseIcon from './BaseIcon.vue'
import { IconName } from '../types'

function handleclick(): void {
  currentPage.value === PAGE_TIMELINE ? scrollToCurrentHour(true) : navigate(PAGE_TIMELINE)
}
</script>
<template>
  <a
    :href="`#${PAGE_TIMELINE}`"
    @click="handleclick"
    class="scale-125 rounded bg-black p-1 text-white"
  >
    <BaseIcon :name="IconName.CLOCK" class="h-5" />
    <!-- <img src="@/assets/img/logo.png" alt="Logo" class="h-9" /> -->
  </a>
</template>
