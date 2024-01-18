import { ICON_CLOCK, ICON_LIST_BULLET, ICON_CHART_BAR } from '../src/icons'
import { generatePeriodSelectOptions } from './functions'
import type { NavItem, ButtonType } from './types'


export const LOCAL_STORAGE_KEY = 'time-tracker'

export const PAGE_TIMELINE = 'timeline'
export const PAGE_ACTIVITIES = 'activities'
export const PAGE_PROGRESS = 'progress'

export const NAV_ITEMS: NavItem[] = [
  { page: PAGE_TIMELINE, icon: ICON_CLOCK },
  { page: PAGE_ACTIVITIES, icon: ICON_LIST_BULLET },
  { page: PAGE_PROGRESS, icon: ICON_CHART_BAR }
]

export const BUTTON_TYPE_SUCCESS = 'success'
export const BUTTON_TYPE_WARNING = 'warning'
export const BUTTON_TYPE_DANGER = 'danger'
export const BUTTON_TYPE_NEUTRAL = 'neutral'
export const BUTTON_TYPE_PRIMARY = 'primary'

export const BUTTON_TYPES: ButtonType[] = [
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_NEUTRAL,
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_PRIMARY
]

export const HOURS_IN_DAY = 24
export const MIDNIGHT_HOUR = 0
export const MINUTES_IN_HOUR = 60
export const SECONDS_IN_MINUTE = 60
export const SECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE
export const MILLISECONDS_IN_SECOND = 1000
export const SECONDS_IN_DAY = HOURS_IN_DAY * SECONDS_IN_HOUR

export const PERIOD_SELEC_OPTIONS = generatePeriodSelectOptions()