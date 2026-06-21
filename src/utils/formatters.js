export const truncate = (s, n = 120) => (s && s.length > n ? s.slice(0, n - 1) + '…' : s || '')

export const pluralize = (n, singular, plural) => `${n} ${n === 1 ? singular : plural || singular + 's'}`

export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let v = bytes
  while (v >= 1024 && i < units.length - 1) { v /= 1024; i++ }
  return `${v.toFixed(v < 10 && i > 0 ? 1 : 0)} ${units[i]}`
}

export const stripHtml = (html = '') => html.replace(/<[^>]+>/g, '')

export const initials = (name = '') =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?'

export const musicPlatformFromUrl = (url = '') => {
  if (/spotify/.test(url)) return 'spotify'
  if (/youtube|youtu\.be/.test(url)) return 'youtube'
  if (/apple/.test(url)) return 'apple'
  if (/soundcloud/.test(url)) return 'soundcloud'
  return 'other'
}
