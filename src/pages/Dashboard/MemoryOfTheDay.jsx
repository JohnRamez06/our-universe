import { useMemo } from 'react'
import { Star } from 'lucide-react'
import Card from '../../components/ui/Card'
import { safeFormat } from '../../utils/dateUtils'

export default function MemoryOfTheDay({ memories = [] }) {
  const memory = useMemo(() => {
    if (!memories.length) return null
    const todayKey = new Date().toISOString().slice(0, 10)
    const seed = todayKey.split('-').join('')
    const idx = Number(seed) % memories.length
    try { localStorage.setItem('motd-date', todayKey) } catch {}
    return memories[idx]
  }, [memories])

  if (!memory) return null

  return (
    <Card>
      <div className="card-header">
        <div>
          <small className="label">Memory of the day</small>
          <h3 className="card-title cosmic-text" style={{ marginTop: 4 }}>{memory.title || 'Untitled'}</h3>
        </div>
        <Star size={20} style={{ color: 'var(--color-star-gold)' }} />
      </div>
      {memory.photos?.[0] && (
        <img src={memory.photos[0]} alt="" style={{ borderRadius: 'var(--radius-md)', width: '100%', maxHeight: 220, objectFit: 'cover', marginBottom: 10 }} />
      )}
      <p className="card-body">{memory.description}</p>
      <small className="text-muted">{safeFormat(memory.date)}</small>
    </Card>
  )
}
