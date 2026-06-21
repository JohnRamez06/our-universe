import { Sparkles } from 'lucide-react'

export default function EmptyState({ icon, title = 'Nothing here yet', message, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon || <Sparkles size={44} />}</div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
