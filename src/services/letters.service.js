import * as base from './_base'
import { COLLECTIONS } from '../utils/constants'
import { isLetterUnlocked } from '../utils/dateUtils'

const C = COLLECTIONS.LETTERS

const mask = (l) => isLetterUnlocked(l.unlockDate) ? l : { ...l, message: '', _locked: true }

export const list = async (opts) => (await base.list(C, opts)).map(mask)
export const subscribe = (cb, opts) => base.subscribe(C, (items) => cb(items.map(mask)), opts)
export const get = async (id) => {
  const l = await base.getOne(C, id)
  return l ? mask(l) : null
}
export const remove = (id) => base.remove(C, id)

export const create = (uid, data) => base.create(C, {
  title: data.title || '',
  message: data.message || '',
  unlockDate: data.unlockDate || null,
  createdBy: uid,
})

export const update = (id, data) => base.update(C, id, data)
