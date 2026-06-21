import * as base from './_base'
import { COLLECTIONS } from '../utils/constants'

const C = COLLECTIONS.CONSTELLATIONS

export const list = (opts) => base.list(C, opts)
export const subscribe = (cb, opts) => base.subscribe(C, cb, opts)
export const get = (id) => base.getOne(C, id)
export const remove = (id) => base.remove(C, id)

export const create = (uid, data) => base.create(C, {
  name: data.name || '',
  memoryIds: data.memoryIds || [],
  color: data.color || '#8b5cf6',
  icon: data.icon || '✦',
  createdBy: uid,
})

export const update = (id, data) => base.update(C, id, data)
