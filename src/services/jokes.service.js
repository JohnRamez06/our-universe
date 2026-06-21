import * as base from './_base'
import { COLLECTIONS, STORAGE_PATHS } from '../utils/constants'
import { uploadMany } from './storage.service'

const C = COLLECTIONS.JOKES

export const list = (opts) => base.list(C, opts)
export const subscribe = (cb, opts) => base.subscribe(C, cb, opts)
export const get = (id) => base.getOne(C, id)
export const remove = (id) => base.remove(C, id)

export const create = async (uid, data, files = []) => {
  const images = await uploadMany(`${STORAGE_PATHS.JOKES}/${Date.now()}`, files)
  return base.create(C, {
    title: data.title || '',
    description: data.description || '',
    images: [...(data.existingImages || []), ...images],
    createdBy: uid,
  })
}

export const update = async (id, data, files = []) => {
  const images = await uploadMany(`${STORAGE_PATHS.JOKES}/${id}`, files)
  return base.update(C, id, {
    title: data.title,
    description: data.description,
    images: [...(data.existingImages || []), ...images],
  })
}
