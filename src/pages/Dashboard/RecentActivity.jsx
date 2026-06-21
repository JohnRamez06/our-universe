import { Link } from 'react-router-dom'
import Card from '../../components/ui/Card'
import { safeFormat, toDate } from '../../utils/dateUtils'

export default function RecentActivity({ memories = [], journal = [], letters = [] }) {
  const items = [
    ...memories.map(m => ({ ...m, _kind: 'memory', _path: '/memories' })),
    ...journal.map(j => ({ ...j, _kind: 'journal', _path: '/journal' })),
    ...letters.map(l => ({ ...l, _kind: 'letter', _path: '/letters' })),
  ]
  .map(i => ({ ...i, _when: toDate(i.createdAt) || toDate(i.date) }))
  .filter(i => i._when)
  .sort((a, b) => b._when - a._when)
  .slice(0, 6)

  return (
    <Card hover={false}>
      <h4 className="cosmic-text" style={{ marginBottom: 12 }}>Recent activity</h4>
      {items.length === 0 && <div className="text-muted" style={{ fontSize: 13 }}>Nothing yet — start adding memories.</div>}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map(i => (
          <li key={`${i._kind}-${i.id}`}>
            <Link to={i._path} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: 8, borderRadius: 8, background: 'rgba(139,92,246,0.06)' }}>
              <span style={{ color: 'var(--text-soft)' }}>
                <span className="badge" style={{ marginRight: 8 }}>{i._kind}</span>
                {i.title || i.name || 'Untitled'}
              </span>
              <small className="text-muted">{safeFormat(i._when)}</small>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}
