import { ref } from "vue"

import { isPageValid } from '@/validators'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'
import TheActivities from '@/assets/pages/TheActivities.vue'
import TheTimeline from '@/assets/pages/TheTimeline.vue'
import TheProgress from '@/assets/pages/TheProgress.vue'



export const routes = {
  [PAGE_TIMELINE]: TheTimeline,
  [PAGE_ACTIVITIES]: TheActivities,
  [PAGE_PROGRESS]: TheProgress
}


export const currentPage = ref(normalizePageHash())

export function navigate(page) {

  document.body.scrollIntoView()

  currentPage.value = page
}

export function normalizePageHash() {
  const page = window.location.hash.slice(1)

  if (isPageValid(page)) {
    return page
  }

  window.location.hash = PAGE_TIMELINE

  return PAGE_TIMELINE
}