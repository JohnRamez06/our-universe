import { useMemo } from 'react'
import Modal from '../../components/ui/Modal'
import { safeFormat } from '../../utils/dateUtils'

export default function ConstellationView({ open, constellation, memories = [], onClose }) {
  const points = useMemo(() => {
    if (!constellation) return []
    const ids = constellation.memoryIds || []
    return ids.map((id, i) => {
      const angle = (i / Math.max(ids.length, 1)) * Math.PI * 2
      const r = 100 + (i % 2) * 30
      return { id, x: 50 + (Math.cos(angle) * r) / 4, y: 50 + (Math.sin(angle) * r) / 4 }
    })
  }, [constellation])

  if (!constellation) return null
  const linked = (constellation.memoryIds || []).map(id => memories.find(m => m.id === id)).filter(Boolean)

  return (
    <Modal open={open} onClose={onClose} title={`${constellation.icon} ${constellation.name}`} size="lg">
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: 300, background: 'radial-gradient(circle, rgba(26,14,58,0.6), rgba(5,3,15,0.9))', borderRadius: 12 }}>
        {points.map((p, i) =>
          points.slice(i + 1).map((q) => (
            <line key={`${p.id}-${q.id}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={constellation.color} strokeWidth="0.2" opacity="0.45" />
          ))
        )}
        {points.map(p => (
          <circle key={p.id} cx={p.x} cy={p.y} r="1.4" fill={constellation.color}>
            <animate attributeName="r" values="1.2;1.8;1.2" dur="3s" repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
      <div className="mt-4">
        <h4 className="cosmic-text">Stars in this constellation</h4>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 8 }}>
          {linked.map(m => (
            <li key={m.id} style={{ padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <strong>{m.title}</strong> <small className="text-muted">· {safeFormat(m.date)}</small>
            </li>
          ))}
          {linked.length === 0 && <li className="text-muted">No memories assigned yet.</li>}
        </ul>
      </div>
    </Modal>
  )
}
