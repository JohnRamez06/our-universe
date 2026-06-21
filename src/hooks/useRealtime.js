import { useEffect, useState } from 'react'

// Subscribe to a service that exposes `subscribe(cb, opts)`.
export default function useRealtime(service, opts) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    let unsub
    try {
      unsub = service.subscribe((data) => {
        setItems(data); setLoading(false)
      }, opts)
    } catch (e) { setError(e); setLoading(false) }
    return () => { if (typeof unsub === 'function') unsub() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service])
  return { items, loading, error }
}
