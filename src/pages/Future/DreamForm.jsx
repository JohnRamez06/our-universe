import { useState } from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import DatePicker from '../../components/ui/DatePicker'
import MediaUploader from '../../components/ui/MediaUploader'
import { useAuth } from '../../hooks/useAuth'
import * as svc from '../../services/future.service'
import notify from '../../components/ui/Toast'

export default function DreamForm({ dream, onDone }) {
  const { user } = useAuth()
  const [data, setData] = useState({
    title: dream?.title || '', description: dream?.description || '', targetDate: dream?.targetDate || '',
  })
  const [existing, setExisting] = useState(dream?.images || [])
  const [files, setFiles] = useState([])
  const [saving, setSaving] = useState(false)
  const submit = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      const payload = { ...data, existingImages: existing }
      const newFiles = files.filter(f => typeof f !== 'string')
      if (dream) await svc.update(dream.id, payload, newFiles)
      else await svc.create(user.uid, payload, newFiles)
      notify.success('Saved ✦')
      onDone?.()
    } catch (err) { notify.error(err.message) } finally { setSaving(false) }
  }
  return (
    <form onSubmit={submit}>
      <Input label="Dream" value={data.title} onChange={(e) => setData(d => ({ ...d, title: e.target.value }))} required />
      <Input as="textarea" rows={3} label="Details" value={data.description} onChange={(e) => setData(d => ({ ...d, description: e.target.value }))} />
      <DatePicker label="Target date (optional)" value={data.targetDate} onChange={(v) => setData(d => ({ ...d, targetDate: v }))} />
      <div className="field">
        <label className="field-label">Inspiration images</label>
        <MediaUploader accept="image/*" files={[...existing, ...files]} onChange={(arr) => {
          setExisting(arr.filter(x => typeof x === 'string'))
          setFiles(arr.filter(x => typeof x !== 'string'))
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button type="button" variant="ghost" onClick={onDone}>Cancel</Button>
        <Button type="submit" variant="primary" loading={saving}>Save</Button>
      </div>
    </form>
  )
}
