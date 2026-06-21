import { useState, useCallback } from 'react'
import { searchAll } from '../services/search.service'

export default function useSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  const search = useCallback(async (q) => {
    setQuery(q); setLoading(true)
    try {
      const r = await searchAll(q)
      setResults(r)
    } catch { setResults([]) }
    finally { setLoading(false) }
  }, [])

  return { results, loading, query, search }
}
