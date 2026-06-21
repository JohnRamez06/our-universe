import { Link } from 'react-router-dom'
import { COLLECTIONS } from '../../utils/constants'
import { stripHtml, truncate } from '../../utils/formatters'

const ROUTES = {
  [COLLECTIONS.MEMORIES]: '/memories',
  [COLLECTIONS.JOURNAL]: '/journal',
  [COLLECTIONS.LETTERS]: '/letters',
  [COLLECTIONS.MUSIC]: '/music',
  [COLLECTIONS.PLACES]: '/places',
  [COLLECTIONS.GOALS]: '/goals',
  [COLLECTIONS.JOKES]: '/jokes',
  [COLLECTIONS.FUTURE]: '/future',
}

export default function SearchResults({ results = [] }) {
  if (results.length === 0) return <p className="text-muted">No results yet.</p>
  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {results.map(r => {
        const text = r.description || r.message || r.story || stripHtml(r.content || '') || ''
        return (
          <li key={`${r._collection}-${r.id}`}>
            <Link to={ROUTES[r._collection] || '/'} className="card" style={{ display: 'block' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <strong>{r.title || r.name || 'Untitled'}</strong>
                <span className="badge">{r._collection}</span>
              </div>
              {text && <p className="card-body" style={{ marginTop: 6 }}>{truncate(text, 160)}</p>}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
