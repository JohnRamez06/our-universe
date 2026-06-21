import * as base from './_base'
import { COLLECTIONS, STORAGE_PATHS } from '../utils/constants'
import { uploadMany } from './storage.service'

const C = COLLECTIONS.PLACES

export const list = (opts) => base.list(C, opts)
export const subscribe = (cb, opts) => base.subscribe(C, cb, opts)
export const get = (id) => base.getOne(C, id)
export const remove = (id) => base.remove(C, id)

export const create = async (uid, data, files = []) => {
  const photos = await uploadMany(`${STORAGE_PATHS.PLACES}/${Date.now()}`, files)
  return base.create(C, {
    name: data.name || '',
    lat: Number(data.lat), lng: Number(data.lng),
    story: data.story || '',
    photos: [...(data.existingPhotos || []), ...photos],
    createdBy: uid,
  })
}

export const update = async (id, data, files = []) => {
  const photos = await uploadMany(`${STORAGE_PATHS.PLACES}/${id}`, files)
  return base.update(C, id, {
    name: data.name, lat: Number(data.lat), lng: Number(data.lng),
    story: data.story,
    photos: [...(data.existingPhotos || []), ...photos],
  })
}
