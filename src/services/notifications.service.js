import * as base from './_base'
import { COLLECTIONS } from '../utils/constants'

const C = COLLECTIONS.NOTIFICATIONS

export const list = (uid, opts) => base.list(C, { wheres: [['userId', '==', uid]], ...(opts || {}) })
export const subscribe = (uid, cb) => base.subscribe(C, cb, { wheres: [['userId', '==', uid]] })
export const create = (uid, data) => base.create(C, { ...data, userId: uid, read: false })
export const markRead = (id) => base.update(C, id, { read: true })
export const remove = (id) => base.remove(C, id)
