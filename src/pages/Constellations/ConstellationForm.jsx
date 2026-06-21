import { useState } from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'
import * as svc from '../../services/constellations.service'
import notify from '../../components/ui/Toast'

const ICONS = ['✦', '✶', '☄', '✧', '★', '✺', '♡', '☾']
const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#fbbf24', '#10b981', '#f472b6']

export default function ConstellationForm({ memories = [], constellation, onDone }) {
  const { user } = useAuth()
  const [data, setData] = useState({
    name: constellation?.name || '',
    memoryIds: constellation?.memoryIds || [],
    color: constellation?.color || COLORS[0],
    icon: constellation?.icon || ICONS[0],
  })
  const [saving, setSaving] = useState(false)

  const toggleMem = (id) =>
    setData(d => ({ ...d, memoryIds: d.memoryIds.includes(id) ? d.memoryIds.filter(x => x !== id) : [...d.memoryIds, id] }))

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (constellation) await svc.update(constellation.id, data)
      else await svc.create(user.uid, data)
      notify.success('Constellation saved ✦')
      onDone?.()
    } catch (e) { notify.error(e.message) } finally { setSaving(false) }
  }

  return (
    <form onSubmit={submit}>
      <Input label="Name" value={data.name} onChange={(e) => setData(d => ({ ...d, name: e.target.value }))} required />
      <div className="field">
        <label className="field-label">Icon</label>
        <div style={{ display: 'flex', gap: 6 }}>
          {ICONS.map(i => (
            <button type="button" key={i} onClick={() => setData(d => ({ ...d, icon: i }))}
              className="icon-btn" style={{ borderColor: data.icon === i ? 'var(--color-aurora-violet)' : undefined, fontSize: 18 }}>{i}</button>
          ))}
        </div>
      </div>
      <div className="field">
        <label className="field-label">Color</label>
        <div style={{ display: 'flex', gap: 6 }}>
          {COLORS.map(c => (
            <button type="button" key={c} onClick={() => setData(d => ({ ...d, color: c }))}
              style={{ width: 32, height: 32, borderRadius: '50%', background: c, border: data.color === c ? '2px solid white' : '2px solid transparent' }} />
          ))}
        </div>
      </div>
      <div className="field">
        <label className="field-label">Memories ({data.memoryIds.length})</label>
        <div style={{ maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {memories.map(m => (
            <label key={m.id} style={{ display: 'flex', gap: 8, padding: 6, borderRadius: 8, background: data.memoryIds.includes(m.id) ? 'rgba(139,92,246,0.18)' : 'rgba(255,255,255,0.03)' }}>
              <input type="checkbox" checked={data.memoryIds.includes(m.id)} onChange={() => toggleMem(m.id)} />
              {m.title || 'Untitled'}
            </label>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button type="button" variant="ghost" onClick={onDone}>Cancel</Button>
        <Button type="submit" variant="primary" loading={saving}>Save</Button>
      </div>
    </form>
  )
}
