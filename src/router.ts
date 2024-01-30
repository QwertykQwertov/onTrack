import { ref } from "vue"

import { NAV_ITEMS, PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from './constants'
import TheActivities from './assets/pages/TheActivities.vue'
import TheTimeline from './assets/pages/TheTimeline.vue'
import TheProgress from './assets/pages/TheProgress.vue'

import type { Component } from "vue"
import type { PageName } from "./types"



export const routes: Record<PageName, Component> = {
  [PAGE_TIMELINE]: TheTimeline,
  [PAGE_ACTIVITIES]: TheActivities,
  [PAGE_PROGRESS]: TheProgress
}


export const currentPage = ref<PageName>(normalizePageHash())

export function navigate(page: PageName): void {

  document.body.scrollIntoView()

  currentPage.value = page
}

export function normalizePageHash(): PageName {
  const page = window.location.hash.slice(1)

  if (NAV_ITEMS.some(navItem => navItem.page === page)) {
    return page as PageName
  }

  window.location.hash = PAGE_TIMELINE

  return PAGE_TIMELINE
}