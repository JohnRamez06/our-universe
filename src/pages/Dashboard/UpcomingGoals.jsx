import Card from '../../components/ui/Card'
import ProgressBar from '../../components/ui/ProgressBar'
import { Link } from 'react-router-dom'

export default function UpcomingGoals({ goals = [] }) {
  const total = goals.length || 0
  const done = goals.filter(g => g.completed).length
  const pct = total ? (done / total) * 100 : 0
  const open = goals.filter(g => !g.completed).slice(0, 5)

  return (
    <Card hover={false}>
      <h4 className="cosmic-text" style={{ marginBottom: 6 }}>Bucket list</h4>
      <small className="text-muted">{done} / {total} stars collected</small>
      <div style={{ margin: '10px 0 14px' }}><ProgressBar value={pct} /></div>
      {open.length === 0
        ? <div className="text-muted" style={{ fontSize: 13 }}>All dreams accomplished ✦</div>
        : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {open.map(g => (
              <li key={g.id} style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--color-aurora-violet)' }}>○</span>
                <span className="text-soft" style={{ fontSize: 14 }}>{g.title}</span>
              </li>
            ))}
          </ul>
        )}
      <Link to="/goals" style={{ display: 'inline-block', marginTop: 12, fontSize: 12, color: 'var(--color-aurora-violet)' }}>View all →</Link>
    </Card>
  )
}
