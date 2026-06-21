import { Music, ExternalLink, Trash2 } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import * as svc from '../../services/music.service'
import notify from '../../components/ui/Toast'

const COLORS = { spotify: 'badge-teal', youtube: 'badge-pink', apple: '', soundcloud: 'badge-gold', other: '' }

export default function MusicCard({ track, onEdit }) {
  const handleDelete = async (e) => {
    e.stopPropagation()
    try { await svc.remove(track.id); notify.success('Removed') } catch (e) { notify.error(e.message) }
  }
  return (
    <Card>
      <div className="card-header">
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--grad-cosmic)', display: 'grid', placeItems: 'center' }}>
            <Music size={18} color="white" />
          </div>
          <div>
            <h4 className="card-title" style={{ marginBottom: 0 }}>{track.title || 'Untitled'}</h4>
            <small className="card-meta">{track.artist}</small>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {track.link && <a href={track.link} target="_blank" rel="noreferrer" className="icon-btn" onClick={(e) => e.stopPropagation()}><ExternalLink size={14} /></a>}
          <button className="icon-btn" onClick={(e) => { e.stopPropagation(); onEdit?.(track) }}>✎</button>
          <button className="icon-btn" onClick={handleDelete}><Trash2 size={14} /></button>
        </div>
      </div>
      <Badge variant={COLORS[track.platform] ? track.platform : undefined}>{track.platform}</Badge>
      {track.description && <p className="card-body mt-2">{track.description}</p>}
    </Card>
  )
}
