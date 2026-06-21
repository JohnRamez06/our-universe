import { COLLECTIONS } from '../utils/constants'
import { list } from './_base'
import { stripHtml } from '../utils/formatters'

const TARGETS = [
  { key: COLLECTIONS.MEMORIES, fields: ['title', 'description', 'location', 'tags'] },
  { key: COLLECTIONS.JOURNAL,  fields: ['title', 'content'] },
  { key: COLLECTIONS.LETTERS,  fields: ['title', 'message'] },
  { key: COLLECTIONS.MUSIC,    fields: ['title', 'artist', 'description'] },
  { key: COLLECTIONS.PLACES,   fields: ['name', 'story'] },
  { key: COLLECTIONS.GOALS,    fields: ['title', 'description'] },
  { key: COLLECTIONS.JOKES,    fields: ['title', 'description'] },
  { key: COLLECTIONS.FUTURE,   fields: ['title', 'description'] },
]

const matches = (item, fields, q) => {
  const text = fields.map(f => {
    const v = item[f]
    if (Array.isArray(v)) return v.join(' ')
    if (typeof v === 'string') return stripHtml(v)
    return ''
  }).join(' ').toLowerCase()
  return text.includes(q)
}

export const searchAll = async (queryStr) => {
  const q = queryStr.trim().toLowerCase()
  if (!q) return []
  const buckets = await Promise.all(
    TARGETS.map(async (t) => {
      try {
        const items = await list(t.key)
        return items.filter(i => matches(i, t.fields, q)).map(i => ({ ...i, _collection: t.key }))
      } catch { return [] }
    })
  )
  return buckets.flat()
}
