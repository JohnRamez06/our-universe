import { MapPin } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { safeFormat } from '../../utils/dateUtils'

export default function MemoryCard({ memory, onClick }) {
  const cover = memory.photos?.[0]
  return (
    <Card onClick={onClick}>
      {cover && (
        <img
          src={cover}
          alt=""
          style={{ width: 'calc(100% + 36px)', margin: '-18px -18px 12px', height: 180, objectFit: 'cover' }}
        />
      )}
      <div className="card-header">
        <div>
          <h4 className="card-title">{memory.title || 'Untitled'}</h4>
          <small className="card-meta">{safeFormat(memory.date)}{memory.location ? <> · <MapPin size={10} style={{ display: 'inline' }} /> {memory.location}</> : null}</small>
        </div>
      </div>
      {memory.description && <p className="card-body" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{memory.description}</p>}
      {memory.tags?.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          {memory.tags.slice(0, 4).map(t => <Badge key={t}>{t}</Badge>)}
        </div>
      )}
    </Card>
  )
}
