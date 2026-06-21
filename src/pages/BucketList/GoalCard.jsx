import { Check, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import * as svc from '../../services/goals.service'
import notify from '../../components/ui/Toast'
import { safeFormat } from '../../utils/dateUtils'

export default function GoalCard({ goal, onEdit }) {
  const toggle = async () => {
    try { await svc.toggleComplete(goal.id, !goal.completed) } catch (e) { notify.error(e.message) }
  }
  const remove = async () => {
    try { await svc.remove(goal.id); notify.success('Removed') } catch (e) { notify.error(e.message) }
  }
  return (
    <motion.div
      className={'card' + (goal.completed ? '' : ' card-hover')}
      style={{ opacity: goal.completed ? 0.75 : 1 }}
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: goal.completed ? 0.75 : 1, y: 0 }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <button onClick={toggle} style={{
          width: 28, height: 28, borderRadius: '50%',
          background: goal.completed ? 'var(--grad-cosmic)' : 'transparent',
          border: '2px solid var(--color-aurora-violet)',
          display: 'grid', placeItems: 'center', cursor: 'pointer', flexShrink: 0,
        }}>
          {goal.completed && <Check size={14} color="white" />}
        </button>
        <div style={{ flex: 1 }}>
          <h4 className="card-title" style={{ marginBottom: 4, textDecoration: goal.completed ? 'line-through' : 'none' }}>{goal.title}</h4>
          {goal.description && <p className="card-body">{goal.description}</p>}
          {goal.completedAt && <small className="text-muted">Completed {safeFormat(goal.completedAt)}</small>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <button className="icon-btn" onClick={() => onEdit?.(goal)}>✎</button>
          <button className="icon-btn" onClick={remove}><Trash2 size={14} /></button>
        </div>
      </div>
    </motion.div>
  )
}
