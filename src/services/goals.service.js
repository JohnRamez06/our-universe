import * as base from './_base'
import { COLLECTIONS } from '../utils/constants'

const C = COLLECTIONS.GOALS

export const list = (opts) => base.list(C, opts)
export const subscribe = (cb, opts) => base.subscribe(C, cb, opts)
export const get = (id) => base.getOne(C, id)
export const remove = (id) => base.remove(C, id)

export const create = (uid, data) => base.create(C, {
  title: data.title || '',
  description: data.description || '',
  completed: false,
  completedAt: null,
  createdBy: uid,
})

export const update = (id, data) => base.update(C, id, data)

export const toggleComplete = (id, completed) => base.update(C, id, {
  completed,
  completedAt: completed ? new Date().toISOString() : null,
})
