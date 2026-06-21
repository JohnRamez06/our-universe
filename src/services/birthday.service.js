import * as base from './_base'
import { COLLECTIONS, STORAGE_PATHS } from '../utils/constants'
import { uploadMany } from './storage.service'

const C = COLLECTIONS.BIRTHDAY

export const list = (opts) => base.list(C, { orderField: 'year', orderDir: 'desc', ...(opts || {}) })
export const subscribe = (cb, opts) => base.subscribe(C, cb, { orderField: 'year', orderDir: 'desc', ...(opts || {}) })
export const get = (id) => base.getOne(C, id)
export const remove = (id) => base.remove(C, id)

export const create = async (uid, data, files = {}) => {
  const photos = await uploadMany(`${STORAGE_PATHS.BIRTHDAY}/${data.year}/photos`, files.photos || [])
  const videos = await uploadMany(`${STORAGE_PATHS.BIRTHDAY}/${data.year}/videos`, files.videos || [])
  return base.create(C, {
    year: Number(data.year),
    photos: [...(data.existingPhotos || []), ...photos],
    videos: [...(data.existingVideos || []), ...videos],
    messages: data.messages || [],
    createdBy: uid,
  })
}

export const update = async (id, data, files = {}) => {
  const photos = await uploadMany(`${STORAGE_PATHS.BIRTHDAY}/${data.year}/photos`, files.photos || [])
  const videos = await uploadMany(`${STORAGE_PATHS.BIRTHDAY}/${data.year}/videos`, files.videos || [])
  return base.update(C, id, {
    year: Number(data.year),
    photos: [...(data.existingPhotos || []), ...photos],
    videos: [...(data.existingVideos || []), ...videos],
    messages: data.messages || [],
  })
}
