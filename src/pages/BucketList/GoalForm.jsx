import { useState } from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'
import * as svc from '../../services/goals.service'
import notify from '../../components/ui/Toast'

export default function GoalForm({ goal, onDone }) {
  const { user } = useAuth()
  const [data, setData] = useState({ title: goal?.title || '', description: goal?.description || '' })
  const [saving, setSaving] = useState(false)
  const submit = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      if (goal) await svc.update(goal.id, data)
      else await svc.create(user.uid, data)
      notify.success('Saved ✦')
      onDone?.()
    } catch (err) { notify.error(err.message) } finally { setSaving(false) }
  }
  return (
    <form onSubmit={submit}>
      <Input label="Goal" value={data.title} onChange={(e) => setData(d => ({ ...d, title: e.target.value }))} required />
      <Input as="textarea" rows={3} label="Why / details" value={data.description} onChange={(e) => setData(d => ({ ...d, description: e.target.value }))} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button type="button" variant="ghost" onClick={onDone}>Cancel</Button>
        <Button type="submit" variant="primary" loading={saving}>Save</Button>
      </div>
    </form>
  )
}
