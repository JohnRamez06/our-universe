import * as base from './_base'
import { COLLECTIONS, STORAGE_PATHS } from '../utils/constants'
import { uploadMany } from './storage.service'
import * as memories from './memories.service'

const C = COLLECTIONS.FUTURE

export const list = (opts) => base.list(C, opts)
export const subscribe = (cb, opts) => base.subscribe(C, cb, opts)
export const get = (id) => base.getOne(C, id)
export const remove = (id) => base.remove(C, id)

export const create = async (uid, data, files = []) => {
  const images = await uploadMany(`${STORAGE_PATHS.FUTURE}/${Date.now()}`, files)
  return base.create(C, {
    title: data.title || '',
    description: data.description || '',
    targetDate: data.targetDate || null,
    images: [...(data.existingImages || []), ...images],
    completed: false,
    memoryId: null,
    createdBy: uid,
  })
}

export const update = async (id, data, files = []) => {
  const images = await uploadMany(`${STORAGE_PATHS.FUTURE}/${id}`, files)
  return base.update(C, id, {
    title: data.title,
    description: data.description,
    targetDate: data.targetDate || null,
    images: [...(data.existingImages || []), ...images],
  })
}

export const markComplete = async (uid, dream) => {
  const memoryId = await memories.create(uid, {
    title: `Achieved: ${dream.title}`,
    description: dream.description || '',
    date: new Date().toISOString().slice(0, 10),
    tags: ['dream-come-true'],
    existingPhotos: dream.images || [],
  })
  await base.update(C, dream.id, { completed: true, completedAt: new Date().toISOString(), memoryId })
  return memoryId
}
