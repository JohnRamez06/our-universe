import { Trash2, Check, Rocket } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { safeFormat, relativeFromNow } from '../../utils/dateUtils'
import * as svc from '../../services/future.service'
import notify from '../../components/ui/Toast'
import { useAuth } from '../../hooks/useAuth'

export default function DreamCard({ dream, onEdit }) {
  const { user } = useAuth()
  const remove = async (e) => {
    e.stopPropagation()
    try { await svc.remove(dream.id); notify.success('Dream removed') } catch (e) { notify.error(e.message) }
  }
  const complete = async (e) => {
    e.stopPropagation()
    try { await svc.markComplete(user.uid, dream); notify.success('Dream became memory ✦') } catch (e) { notify.error(e.message) }
  }
  return (
    <Card>
      <div className="card-header">
        <div>
          <h4 className="card-title"><Rocket size={14} style={{ display: 'inline', color: 'var(--color-aurora-violet)' }} /> {dream.title}</h4>
          {dream.targetDate && <small className="card-meta">{safeFormat(dream.targetDate)} · {relativeFromNow(dream.targetDate)}</small>}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {!dream.completed && <button className="icon-btn" onClick={complete} title="Mark complete"><Check size={14} /></button>}
          <button className="icon-btn" onClick={() => onEdit?.(dream)}>✎</button>
          <button className="icon-btn" onClick={remove}><Trash2 size={14} /></button>
        </div>
      </div>
      {dream.description && <p className="card-body">{dream.description}</p>}
      {dream.images?.[0] && <img src={dream.images[0]} alt="" style={{ marginTop: 10, width: '100%', borderRadius: 12, maxHeight: 200, objectFit: 'cover' }} />}
      {dream.completed && <small style={{ color: 'var(--color-aurora-green)', marginTop: 8, display: 'block' }}>✦ Achieved</small>}
    </Card>
  )
}
