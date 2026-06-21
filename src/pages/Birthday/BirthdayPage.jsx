import { useState, useMemo } from 'react'
import { Plus, Gift, Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import EmptyState from '../../components/ui/EmptyState'
import Loader from '../../components/ui/Loader'
import MediaUploader from '../../components/ui/MediaUploader'
import MediaGallery from '../../components/shared/MediaGallery'
import SupernovaAnimation from './SupernovaAnimation'
import useRealtime from '../../hooks/useRealtime'
import * as svc from '../../services/birthday.service'
import { useAuth } from '../../hooks/useAuth'
import notify from '../../components/ui/Toast'

function BirthdayForm({ entry, onDone, onCelebrate }) {
  const { user } = useAuth()
  const [data, setData] = useState({
    year: entry?.year || new Date().getFullYear(),
    messages: entry?.messages || [''],
  })
  const [photoExisting, setPhotoExisting] = useState(entry?.photos || [])
  const [videoExisting, setVideoExisting] = useState(entry?.videos || [])
  const [photoFiles, setPhotoFiles] = useState([])
  const [videoFiles, setVideoFiles] = useState([])
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      const payload = { year: data.year, messages: data.messages.filter(Boolean), existingPhotos: photoExisting, existingVideos: videoExisting }
      const files = { photos: photoFiles.filter(f => typeof f !== 'string'), videos: videoFiles.filter(f => typeof f !== 'string') }
      if (entry) await svc.update(entry.id, payload, files)
      else await svc.create(user.uid, payload, files)
      onCelebrate?.()
      notify.success('🎉 Saved')
      onDone?.()
    } catch (err) { notify.error(err.message) } finally { setSaving(false) }
  }

  return (
    <form onSubmit={submit}>
      <Input label="Year" type="number" value={data.year} onChange={(e) => setData(d => ({ ...d, year: e.target.value }))} required />
      <div className="field">
        <label className="field-label">Photos</label>
        <MediaUploader accept="image/*" files={[...photoExisting, ...photoFiles]} onChange={(arr) => {
          setPhotoExisting(arr.filter(x => typeof x === 'string'))
          setPhotoFiles(arr.filter(x => typeof x !== 'string'))
        }} />
      </div>
      <div className="field">
        <label className="field-label">Videos</label>
        <MediaUploader accept="video/*" files={[...videoExisting, ...videoFiles]} onChange={(arr) => {
          setVideoExisting(arr.filter(x => typeof x === 'string'))
          setVideoFiles(arr.filter(x => typeof x !== 'string'))
        }} />
      </div>
      <div className="field">
        <label className="field-label">Messages</label>
        {data.messages.map((m, i) => (
          <Input as="textarea" rows={2} key={i} value={m} onChange={(e) => {
            const next = [...data.messages]; next[i] = e.target.value
            setData(d => ({ ...d, messages: next }))
          }} placeholder={`Wish ${i + 1}`} />
        ))}
        <Button type="button" variant="ghost" size="sm" onClick={() => setData(d => ({ ...d, messages: [...d.messages, ''] }))}>+ Add message</Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button type="button" variant="ghost" onClick={onDone}>Cancel</Button>
        <Button type="submit" variant="primary" loading={saving}>Save</Button>
      </div>
    </form>
  )
}

export default function BirthdayPage() {
  const { items, loading } = useRealtime(svc)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  const [celebrate, setCelebrate] = useState(0)
  const years = useMemo(() => items, [items])

  const remove = async (id) => { try { await svc.remove(id); notify.success('Removed') } catch (e) { notify.error(e.message) } }

  return (
    <div>
      <SupernovaAnimation trigger={celebrate} />
      <div className="section-header">
        <div>
          <h1 className="section-title">Birthday</h1>
          <p className="section-subtitle">Every year, a supernova.</p>
        </div>
        <Button variant="primary" icon={<Plus size={14} />} onClick={() => setAdding(true)}>Add year</Button>
      </div>
      {loading ? <Loader full />
       : years.length === 0
         ? <EmptyState icon={<Gift size={44} />} title="No birthdays yet" action={<Button variant="primary" onClick={() => setAdding(true)}>Start one</Button>} />
         : (
           <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
             {years.map(y => (
               <div key={y.id} className="glass" style={{ padding: 24 }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                   <h2 className="cosmic-text" style={{ margin: 0 }}>✨ {y.year}</h2>
                   <div style={{ display: 'flex', gap: 4 }}>
                     <button className="icon-btn" onClick={() => setEditing(y)}>✎</button>
                     <button className="icon-btn" onClick={() => remove(y.id)}><Trash2 size={14} /></button>
                   </div>
                 </div>
                 {y.messages?.length > 0 && (
                   <ul style={{ listStyle: 'none', padding: 0, marginBottom: 12 }}>
                     {y.messages.map((m, i) => <li key={i} className="text-soft" style={{ padding: '4px 0' }}>♡ {m}</li>)}
                   </ul>
                 )}
                 <MediaGallery items={[...(y.photos || []), ...(y.videos || [])]} />
               </div>
             ))}
           </div>
         )}
      <Modal open={adding} onClose={() => setAdding(false)} title="New birthday entry" size="lg">
        <BirthdayForm onDone={() => setAdding(false)} onCelebrate={() => setCelebrate(c => c + 1)} />
      </Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit birthday" size="lg">
        {editing && <BirthdayForm entry={editing} onDone={() => setEditing(null)} onCelebrate={() => setCelebrate(c => c + 1)} />}
      </Modal>
    </div>
  )
}
