import { Trash2 } from 'lucide-react'
import Card from '../../components/ui/Card'
import * as svc from '../../services/jokes.service'
import notify from '../../components/ui/Toast'

export default function JokeCard({ joke, onEdit }) {
  const remove = async (e) => {
    e.stopPropagation()
    try { await svc.remove(joke.id); notify.success('Removed') } catch (e) { notify.error(e.message) }
  }
  return (
    <Card>
      <div className="card-header">
        <h4 className="card-title">😂 {joke.title || 'Untitled'}</h4>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="icon-btn" onClick={() => onEdit?.(joke)}>✎</button>
          <button className="icon-btn" onClick={remove}><Trash2 size={14} /></button>
        </div>
      </div>
      {joke.description && <p className="card-body">{joke.description}</p>}
      {joke.images?.[0] && <img src={joke.images[0]} alt="" style={{ width: '100%', marginTop: 10, borderRadius: 12, maxHeight: 200, objectFit: 'cover' }} />}
    </Card>
  )
}
