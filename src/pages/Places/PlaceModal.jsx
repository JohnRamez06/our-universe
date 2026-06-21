import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import MediaGallery from '../../components/shared/MediaGallery'
import PlaceForm from './PlaceForm'
import * as svc from '../../services/places.service'
import notify from '../../components/ui/Toast'

export default function PlaceModal({ open, place, onClose }) {
  const [editing, setEditing] = useState(false)
  const [confirm, setConfirm] = useState(false)
  if (!place) return null

  const handleDelete = async () => {
    try { await svc.remove(place.id); notify.success('Place removed'); onClose?.() } catch (e) { notify.error(e.message) }
  }

  return (
    <>
      <Modal open={open} onClose={onClose} title={place.name} size="lg" footer={!editing && (
        <>
          <Button variant="ghost" onClick={() => setEditing(true)}>Edit</Button>
          <Button variant="danger" icon={<Trash2 size={14} />} onClick={() => setConfirm(true)}>Delete</Button>
        </>
      )}>
        {editing
          ? <PlaceForm place={place} onDone={() => { setEditing(false); onClose?.() }} />
          : (
            <>
              <small className="text-muted">{place.lat?.toFixed(4)}, {place.lng?.toFixed(4)}</small>
              {place.story && <p className="text-soft mt-4" style={{ whiteSpace: 'pre-wrap' }}>{place.story}</p>}
              {place.photos?.length > 0 && <div className="mt-4"><MediaGallery items={place.photos} /></div>}
            </>
          )}
      </Modal>
      <ConfirmDialog open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} danger title="Remove place?" confirmLabel="Delete" />
    </>
  )
}
