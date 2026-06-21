import * as base from './_base'
import { COLLECTIONS } from '../utils/constants'
import { musicPlatformFromUrl } from '../utils/formatters'

const C = COLLECTIONS.MUSIC

export const list = (opts) => base.list(C, opts)
export const subscribe = (cb, opts) => base.subscribe(C, cb, opts)
export const get = (id) => base.getOne(C, id)
export const remove = (id) => base.remove(C, id)

export const create = (uid, data) => base.create(C, {
  title: data.title || '',
  artist: data.artist || '',
  link: data.link || '',
  platform: data.platform || musicPlatformFromUrl(data.link || ''),
  memoryId: data.memoryId || null,
  description: data.description || '',
  createdBy: uid,
})

export const update = (id, data) => base.update(C, id, data)
