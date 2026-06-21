import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../lib/firebase'
import { compressImageIfLarge } from '../utils/mediaUtils'

export const uploadFile = async (path, file) => {
  const cleaned = file && file.type?.startsWith('image/') ? await compressImageIfLarge(file) : file
  const r = ref(storage, path)
  await uploadBytes(r, cleaned)
  return getDownloadURL(r)
}

export const uploadMany = async (folder, files = [], onProgress) => {
  const out = []
  for (let i = 0; i < files.length; i++) {
    const f = files[i]
    if (typeof f === 'string') { out.push(f); continue }
    const name = `${Date.now()}-${i}-${(f.name || 'file').replace(/[^a-z0-9.\-_]/gi, '_')}`
    const url = await uploadFile(`${folder}/${name}`, f)
    out.push(url)
    onProgress?.((i + 1) / files.length)
  }
  return out
}

export const deleteByUrl = async (url) => {
  try { await deleteObject(ref(storage, url)) } catch {}
}
