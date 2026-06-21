import { useState } from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import DatePicker from '../../components/ui/DatePicker'
import { useAuth } from '../../hooks/useAuth'
import * as svc from '../../services/letters.service'
import notify from '../../components/ui/Toast'

export default function LetterForm({ letter, onDone }) {
  const { user } = useAuth()
  const [data, setData] = useState({
    title: letter?.title || '',
    message: letter?.message || '',
    unlockDate: letter?.unlockDate || '',
  })
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (letter) await svc.update(letter.id, data)
      else await svc.create(user.uid, data)
      notify.success('Sealed ✦')
      onDone?.()
    } catch (err) { notify.error(err.message) }
    finally { setSaving(false) }
  }

  return (
    <form onSubmit={submit}>
      <Input label="Title" value={data.title} onChange={(e) => setData(d => ({ ...d, title: e.target.value }))} required />
      <Input as="textarea" rows={8} label="Message" value={data.message} onChange={(e) => setData(d => ({ ...d, message: e.target.value }))} required />
      <DatePicker label="Unlock date (optional)" value={data.unlockDate} onChange={(v) => setData(d => ({ ...d, unlockDate: v }))} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button type="button" variant="ghost" onClick={onDone}>Cancel</Button>
        <Button type="submit" variant="primary" loading={saving}>Seal</Button>
      </div>
    </form>
  )
}
