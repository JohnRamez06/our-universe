import { useState } from 'react'
import { Pencil, Trash2, MapPin } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import MediaGallery from '../../components/shared/MediaGallery'
import MemoryForm from './MemoryForm'
import { safeFormat } from '../../utils/dateUtils'
import * as memoriesSvc from '../../services/memories.service'
import notify from '../../components/ui/Toast'

export default function MemoryModal({ open, memory, onClose }) {
  const [editing, setEditing] = useState(false)
  const [confirm, setConfirm] = useState(false)

  if (!memory) return null

  const handleDelete = async () => {
    try { await memoriesSvc.remove(memory.id); notify.success('Memory removed'); onClose?.() }
    catch (e) { notify.error(e.message) }
  }

  return (
    <>
      <Modal open={open} onClose={onClose} title={editing ? 'Edit memory' : (memory.title || 'Memory')} size="lg">
        {editing
          ? <MemoryForm memory={memory} onDone={() => { setEditing(false); onClose?.() }} />
          : (
            <>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, color: 'var(--text-muted)', fontSize: 13 }}>
                <span>{safeFormat(memory.date)}</span>
                {memory.location && <span><MapPin size={12} style={{ display: 'inline' }} /> {memory.location}</span>}
              </div>
              {memory.description && <p className="text-soft" style={{ whiteSpace: 'pre-wrap' }}>{memory.description}</p>}
              {memory.tags?.length > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  {memory.tags.map(t => <Badge key={t}>{t}</Badge>)}
                </div>
              )}
              <MediaGallery items={[...(memory.photos || []), ...(memory.videos || [])]} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                <Button variant="ghost" icon={<Pencil size={14} />} onClick={() => setEditing(true)}>Edit</Button>
                <Button variant="danger" icon={<Trash2 size={14} />} onClick={() => setConfirm(true)}>Delete</Button>
              </div>
            </>
          )}
      </Modal>
      <ConfirmDialog open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} danger title="Remove memory?" message="This will permanently delete this memory and its files." confirmLabel="Delete" />
    </>
  )
}
