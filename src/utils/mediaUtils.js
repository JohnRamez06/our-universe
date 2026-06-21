export const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result)
    r.onerror = reject
    r.readAsDataURL(file)
  })

export const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`

export const guessMediaType = (url = '') => {
  if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)) return 'video'
  return 'image'
}

export const compressImageIfLarge = async (file, maxBytes = 2 * 1024 * 1024) => {
  if (!file || file.size <= maxBytes) return file
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.sqrt(maxBytes / file.size)
    const w = Math.round(bitmap.width * scale)
    const h = Math.round(bitmap.height * scale)
    const canvas = document.createElement('canvas')
    canvas.width = w; canvas.height = h
    canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h)
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.85))
    return new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' })
  } catch {
    return file
  }
}
