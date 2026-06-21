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

export const toDate = (v) => {
  if (!v) return null
  if (v instanceof Date) return v
  if (typeof v === 'string') return parseISO(v)
  if (v && typeof v.toDate === 'function') return v.toDate()
  if (typeof v === 'number') return new Date(v)
  return null
}

export const safeFormat = (v, fmt = 'MMM d, yyyy') => {
  const d = toDate(v); return d ? format(d, fmt) : ''
}

export const relativeFromNow = (v) => {
  const d = toDate(v); if (!d) return ''
  const diff = differenceInDays(d, new Date())
  if (diff === 0) return 'today'
  if (diff === 1) return 'tomorrow'
  if (diff === -1) return 'yesterday'
  return diff > 0 ? `in ${diff} days` : `${Math.abs(diff)} days ago`
}
