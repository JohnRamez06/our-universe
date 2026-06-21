import toast from 'react-hot-toast'

// Thin wrappers so callers don't import react-hot-toast directly.
export const notify = {
  success: (msg) => toast.success(msg, { icon: '✨' }),
  error: (msg) => toast.error(msg),
  info: (msg) => toast(msg, { icon: '🌌' }),
  loading: (msg) => toast.loading(msg),
  dismiss: (id) => toast.dismiss(id),
}

export default notify
