import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../../components/shared/SearchBar'
import SearchResults from './SearchResults'
import Loader from '../../components/ui/Loader'
import useSearch from '../../hooks/useSearch'

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const initial = params.get('q') || ''
  const { results, loading, search, query } = useSearch()

  useEffect(() => {
    if (initial) search(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial])

  const handle = (q) => {
    setParams(q ? { q } : {})
    search(q)
  }

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Search</h1>
          <p className="section-subtitle">Find any star in our universe.</p>
        </div>
      </div>
      <div style={{ maxWidth: 500, marginBottom: 24 }}>
        <SearchBar value={initial} onSubmit={handle} onChange={handle} placeholder="Search across everything…" />
      </div>
      {loading ? <Loader /> : <SearchResults results={results} />}
      {!loading && query && <small className="text-muted" style={{ display: 'block', marginTop: 12 }}>{results.length} result(s)</small>}
    </div>
  )
}
