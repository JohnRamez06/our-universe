import { differenceInDays, parseISO } from 'date-fns'

export const countBy = (arr, key) =>
  arr.reduce((acc, item) => {
    const k = typeof key === 'function' ? key(item) : item[key]
    acc[k] = (acc[k] || 0) + 1
    return acc
  }, {})

export const sumPhotos = (items = []) => items.reduce((s, m) => s + ((m.photos?.length) || 0), 0)
export const sumVideos = (items = []) => items.reduce((s, m) => s + ((m.videos?.length) || 0), 0)

export const memoriesPerMonth = (items = []) => {
  const out = {}
  items.forEach(m => {
    if (!m.date) return
    const d = parseISO(m.date)
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    out[k] = (out[k] || 0) + 1
  })
  return out
}

export const longestStreak = (items = []) => {
  const dates = [...new Set(items.map(m => m.date).filter(Boolean))]
    .map(d => parseISO(d).getTime()).sort((a, b) => a - b)
  let best = 0, cur = 0, prev = null
  dates.forEach(t => {
    if (prev !== null && differenceInDays(t, prev) === 1) cur++
    else cur = 1
    best = Math.max(best, cur)
    prev = t
  })
  return best
}
