import { useState } from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import DatePicker from '../../components/ui/DatePicker'
import MediaUploader from '../../components/ui/MediaUploader'
import JournalEditor from './JournalEditor'
import { useAuth } from '../../hooks/useAuth'
import * as svc from '../../services/journal.service'
import notify from '../../components/ui/Toast'

export default function JournalForm({ entry, onDone }) {
  const { user } = useAuth()
  const [data, setData] = useState({
    title: entry?.title || '',
    content: entry?.content || '',
    date: entry?.date || new Date().toISOString().slice(0, 10),
  })
  const [files, setFiles] = useState([])
  const [existing, setExisting] = useState(entry?.images || [])
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...data, existingImages: existing }
      const newFiles = files.filter(f => typeof f !== 'string')
      if (entry) await svc.update(user.uid, entry.id, payload, newFiles)
      else await svc.create(user.uid, payload, newFiles)
      notify.success('Saved ✦')
      onDone?.()
    } catch (err) { notify.error(err.message) }
    finally { setSaving(false) }
  }

  return (
    <form onSubmit={submit}>
      <Input label="Title" value={data.title} onChange={(e) => setData(d => ({ ...d, title: e.target.value }))} required />
      <DatePicker label="Date" value={data.date} onChange={(v) => setData(d => ({ ...d, date: v }))} />
      <div className="field">
        <label className="field-label">Entry</label>
        <JournalEditor value={data.content} onChange={(v) => setData(d => ({ ...d, content: v }))} />
      </div>
      <div className="field">
        <label className="field-label">Images</label>
        <MediaUploader accept="image/*" files={[...existing, ...files]} onChange={(arr) => {
          setExisting(arr.filter(x => typeof x === 'string'))
          setFiles(arr.filter(x => typeof x !== 'string'))
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button type="button" variant="ghost" onClick={onDone}>Cancel</Button>
        <Button type="submit" variant="primary" loading={saving}>{entry ? 'Save' : 'Write'}</Button>
      </div>
    </form>
  )
}
