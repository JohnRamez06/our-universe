export const isEmail = (v = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
export const isUrl = (v = '') => {
  try { new URL(v); return true } catch { return false }
}
export const minLen = (v = '', n = 1) => (v || '').trim().length >= n
export const required = (v) => v !== null && v !== undefined && String(v).trim() !== ''
export const isImage = (file) => file && file.type && file.type.startsWith('image/')
export const isVideo = (file) => file && file.type && file.type.startsWith('video/')
export const maxFileSize = (file, mb) => file && file.size <= mb * 1024 * 1024
