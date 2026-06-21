import { useState } from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import MediaUploader from '../../components/ui/MediaUploader'
import { useAuth } from '../../hooks/useAuth'
import * as svc from '../../services/places.service'
import notify from '../../components/ui/Toast'

export default function PlaceForm({ place, onDone }) {
  const { user } = useAuth()
  const [data, setData] = useState({
    name: place?.name || '',
    lat: place?.lat ?? '',
    lng: place?.lng ?? '',
    story: place?.story || '',
  })
  const [files, setFiles] = useState([])
  const [existing, setExisting] = useState(place?.photos || [])
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...data, existingPhotos: existing }
      const newFiles = files.filter(f => typeof f !== 'string')
      if (place) await svc.update(place.id, payload, newFiles)
      else await svc.create(user.uid, payload, newFiles)
      notify.success('Place pinned ✦')
      onDone?.()
    } catch (err) { notify.error(err.message) }
    finally { setSaving(false) }
  }

  return (
    <form onSubmit={submit}>
      <Input label="Place name" value={data.name} onChange={(e) => setData(d => ({ ...d, name: e.target.value }))} required />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Input label="Latitude" type="number" step="0.000001" value={data.lat} onChange={(e) => setData(d => ({ ...d, lat: e.target.value }))} required />
        <Input label="Longitude" type="number" step="0.000001" value={data.lng} onChange={(e) => setData(d => ({ ...d, lng: e.target.value }))} required />
      </div>
      <Input as="textarea" rows={4} label="Our story here" value={data.story} onChange={(e) => setData(d => ({ ...d, story: e.target.value }))} />
      <div className="field">
        <label className="field-label">Photos</label>
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
