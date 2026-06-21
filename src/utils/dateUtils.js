// src/utils/dateUtils.js
import { differenceInDays, format, isAfter, parseISO } from 'date-fns'
import { RELATIONSHIP_START } from './constants'

export const getDaysTogether = () => {
  return differenceInDays(new Date(), parseISO(RELATIONSHIP_START))
}

export const formatDate = (date, formatStr = 'MMMM d, yyyy') => {
  return format(typeof date === 'string' ? parseISO(date) : date, formatStr)
}

export const isLetterUnlocked = (unlockDate) => {
  if (!unlockDate) return true
  return isAfter(new Date(), parseISO(unlockDate))
}
