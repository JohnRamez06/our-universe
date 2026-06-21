import { useState } from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import DatePicker from '../../components/ui/DatePicker'
import MediaUploader from '../../components/ui/MediaUploader'
import TagInput from '../../components/shared/TagInput'
import { useAuth } from '../../hooks/useAuth'
import * as memoriesSvc from '../../services/memories.service'
import notify from '../../components/ui/Toast'

export default function MemoryForm({ memory, onDone }) {
  const { user } = useAuth()
  const [data, setData] = useState({
    title: memory?.title || '',
    description: memory?.description || '',
    date: memory?.date || new Date().toISOString().slice(0, 10),
    location: memory?.location || '',
    tags: memory?.tags || [],
  })
  const [files, setFiles] = useState([])
  const [existingPhotos, setExistingPhotos] = useState(memory?.photos || [])
  const [saving, setSaving] = useState(false)

  const set = (k) => (e) => setData(d => ({ ...d, [k]: e?.target?.value ?? e }))

  const submit = async (e) => {
    e.preventDefault()
    if (!user) return
    setSaving(true)
    try {
      const newFiles = files.filter(f => typeof f !== 'string')
      const payload = { ...data, existingPhotos }
      const photoFiles = newFiles.filter(f => f.type?.startsWith('image'))
      const videoFiles = newFiles.filter(f => f.type?.startsWith('video'))
      if (memory) {
        await memoriesSvc.update(user.uid, memory.id, payload, { photos: photoFiles, videos: videoFiles })
        notify.success('Memory updated ✦')
      } else {
        await memoriesSvc.create(user.uid, payload, { photos: photoFiles, videos: videoFiles })
        notify.success('Memory captured ✦')
      }
      onDone?.()
    } catch (err) { notify.error(err.message) }
    finally { setSaving(false) }
  }

  return (
    <form onSubmit={submit}>
      <Input label="Title" value={data.title} onChange={set('title')} required />
      <Input as="textarea" label="Description" value={data.description} onChange={set('description')} rows={4} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <DatePicker label="Date" value={data.date} onChange={(v) => setData(d => ({ ...d, date: v }))} />
        <Input label="Location" value={data.location} onChange={set('location')} placeholder="Where?" />
      </div>
      <div className="field">
        <label className="field-label">Tags</label>
        <TagInput tags={data.tags} onChange={(t) => setData(d => ({ ...d, tags: t }))} />
      </div>
      <div className="field">
        <label className="field-label">Photos & videos</label>
        <MediaUploader files={[...existingPhotos, ...files]} onChange={(arr) => {
          const strs = arr.filter(x => typeof x === 'string')
          const fs = arr.filter(x => typeof x !== 'string')
          setExistingPhotos(strs); setFiles(fs)
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button type="button" variant="ghost" onClick={onDone}>Cancel</Button>
        <Button type="submit" variant="primary" loading={saving}>{memory ? 'Save' : 'Create'}</Button>
      </div>
    </form>
  )
}
