import { useState } from 'react'
import { Lock, Trash2 } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import LetterForm from './LetterForm'
import { safeFormat, isLetterUnlocked } from '../../utils/dateUtils'
import * as svc from '../../services/letters.service'
import notify from '../../components/ui/Toast'

export default function LetterModal({ open, letter, onClose }) {
  const [editing, setEditing] = useState(false)
  const [confirm, setConfirm] = useState(false)
  if (!letter) return null
  const locked = !isLetterUnlocked(letter.unlockDate)

  const handleDelete = async () => {
    try { await svc.remove(letter.id); notify.success('Letter removed'); onClose?.() } catch (e) { notify.error(e.message) }
  }

  return (
    <>
      <Modal open={open} onClose={onClose} title={letter.title || 'Letter'} footer={!editing && (
        <>
          <Button variant="ghost" onClick={() => setEditing(true)}>Edit</Button>
          <Button variant="danger" icon={<Trash2 size={14} />} onClick={() => setConfirm(true)}>Delete</Button>
        </>
      )}>
        {editing
          ? <LetterForm letter={letter} onDone={() => { setEditing(false); onClose?.() }} />
          : locked
            ? (
              <div className="text-center">
                <Lock size={36} style={{ color: 'var(--color-aurora-violet)', margin: '8px auto' }} />
                <p className="text-soft">This letter unlocks on <strong>{safeFormat(letter.unlockDate)}</strong>.</p>
              </div>
            )
            : <p className="text-soft" style={{ whiteSpace: 'pre-wrap' }}>{letter.message}</p>}
      </Modal>
      <ConfirmDialog open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} danger title="Delete letter?" confirmLabel="Delete" />
    </>
  )
}
