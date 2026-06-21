import * as base from './_base'
import { COLLECTIONS, STORAGE_PATHS } from '../utils/constants'
import { uploadMany } from './storage.service'

const C = COLLECTIONS.JOURNAL

export const list = (opts) => base.list(C, opts)
export const subscribe = (cb, opts) => base.subscribe(C, cb, opts)
export const get = (id) => base.getOne(C, id)
export const remove = (id) => base.remove(C, id)

export const create = async (uid, data, files = []) => {
  const images = await uploadMany(`${STORAGE_PATHS.JOURNAL}/${uid}/${Date.now()}`, files)
  return base.create(C, {
    title: data.title || '',
    content: data.content || '',
    images: [...(data.existingImages || []), ...images],
    date: data.date || new Date().toISOString().slice(0, 10),
    createdBy: uid,
  })
}

export const update = async (uid, id, data, files = []) => {
  const images = await uploadMany(`${STORAGE_PATHS.JOURNAL}/${uid}/${id}`, files)
  return base.update(C, id, {
    title: data.title,
    content: data.content,
    images: [...(data.existingImages || []), ...images],
    date: data.date,
  })
}
