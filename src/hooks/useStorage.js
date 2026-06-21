import { useState } from 'react'
import { uploadMany } from '../services/storage.service'

export default function useStorage() {
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const upload = async (folder, files) => {
    setUploading(true); setProgress(0)
    try {
      const urls = await uploadMany(folder, files, setProgress)
      return urls
    } finally { setUploading(false) }
  }
  return { upload, uploading, progress }
}
