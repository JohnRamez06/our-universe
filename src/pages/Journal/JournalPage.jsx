import { useState } from 'react'
import { Plus, BookOpen, Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import EmptyState from '../../components/ui/EmptyState'
import Loader from '../../components/ui/Loader'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import JournalEntry from './JournalEntry'
import JournalForm from './JournalForm'
import MediaGallery from '../../components/shared/MediaGallery'
import useRealtime from '../../hooks/useRealtime'
import * as svc from '../../services/journal.service'
import { safeFormat } from '../../utils/dateUtils'
import notify from '../../components/ui/Toast'

export default function JournalPage() {
  const { items, loading } = useRealtime(svc)
  const [adding, setAdding] = useState(false)
  const [reading, setReading] = useState(null)
  const [editing, setEditing] = useState(null)
  const [confirm, setConfirm] = useState(null)

  const handleDelete = async () => {
    try { await svc.remove(confirm); notify.success('Entry removed'); setReading(null) } catch (e) { notify.error(e.message) }
  }

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Journal</h1>
          <p className="section-subtitle">Thoughts, written for the two of us.</p>
        </div>
        <Button variant="primary" icon={<Plus size={14} />} onClick={() => setAdding(true)}>New entry</Button>
      </div>

      {loading ? <Loader full />
       : items.length === 0
         ? <EmptyState icon={<BookOpen size={44} />} title="No entries yet" action={<Button variant="primary" onClick={() => setAdding(true)}>Write one</Button>} />
         : <div className="grid-cards">{items.map(e => <JournalEntry key={e.id} entry={e} onClick={() => setReading(e)} />)}</div>}

      <Modal open={adding} onClose={() => setAdding(false)} title="New journal entry" size="lg">
        <JournalForm onDone={() => setAdding(false)} />
      </Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit entry" size="lg">
        {editing && <JournalForm entry={editing} onDone={() => setEditing(null)} />}
      </Modal>
      <Modal open={!!reading} onClose={() => setReading(null)} title={reading?.title || 'Entry'} size="lg" footer={reading && (
        <>
          <Button variant="ghost" onClick={() => { setEditing(reading); setReading(null) }}>Edit</Button>
          <Button variant="danger" icon={<Trash2 size={14} />} onClick={() => setConfirm(reading.id)}>Delete</Button>
        </>
      )}>
        {reading && (
          <>
            <small className="text-muted">{safeFormat(reading.date)}</small>
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: reading.content || '' }} />
            {reading.images?.length > 0 && <div className="mt-4"><MediaGallery items={reading.images} /></div>}
          </>
        )}
      </Modal>
      <ConfirmDialog open={!!confirm} onClose={() => setConfirm(null)} onConfirm={handleDelete} danger title="Delete entry?" confirmLabel="Delete" />
    </div>
  )
}
