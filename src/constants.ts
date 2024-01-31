
import { generatePeriodSelectOptions } from './functions'
import {PageName, IconName,ButtonType, type NavItem  } from './types'


export const LOCAL_STORAGE_KEY = 'time-tracker'

export const NAV_ITEMS: NavItem[] = [
  { page: PageName.TIMELINE, icon: IconName.CLOCK },
  { page: PageName.ACTIVITIES, icon: IconName.LIST_BULLET },
  { page: PageName.PROGRESS, icon: IconName.CHART_BAR }
]

export const BUTTON_TYPES: ButtonType[] = [
  ButtonType.SUCCESS,
  ButtonType.WARNING,
  ButtonType.NEUTRAL,
  ButtonType.DANGER,
  ButtonType.PRIMARY
]

export const HOURS_IN_DAY = 24
export const MIDNIGHT_HOUR = 0
export const MINUTES_IN_HOUR = 60
export const SECONDS_IN_MINUTE = 60
export const SECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE
export const MILLISECONDS_IN_SECOND = 1000
export const SECONDS_IN_DAY = HOURS_IN_DAY * SECONDS_IN_HOUR

export const PERIOD_SELEC_OPTIONS = generatePeriodSelectOptions()
