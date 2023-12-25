<script setup>
import { PAGE_TIMELINE } from '@/constants';
import { navigate, currentPage } from '@/router';
import { scrollToCurrentHour } from '@/timeline-items';

function handleclick() {
  currentPage.value === PAGE_TIMELINE ? scrollToCurrentHour() : navigate(PAGE_TIMELINE)
}
</script>
<template>
   <a :href="`#${PAGE_TIMELINE}`" @click="handleclick">
      <img src="@/assets/img/logo.png" alt="Logo" class="h-9" />
    </a>
</template>