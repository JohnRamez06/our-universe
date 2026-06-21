import { useState } from 'react'
import { Plus, Mail } from 'lucide-react'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import EmptyState from '../../components/ui/EmptyState'
import Loader from '../../components/ui/Loader'
import LetterCard from './LetterCard'
import LetterForm from './LetterForm'
import LetterModal from './LetterModal'
import useRealtime from '../../hooks/useRealtime'
import * as svc from '../../services/letters.service'

export default function LettersPage() {
  const { items, loading } = useRealtime(svc)
  const [adding, setAdding] = useState(false)
  const [reading, setReading] = useState(null)

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Letters</h1>
          <p className="section-subtitle">Sealed messages. Some open today, some someday.</p>
        </div>
        <Button variant="primary" icon={<Plus size={14} />} onClick={() => setAdding(true)}>Seal letter</Button>
      </div>

      {loading ? <Loader full />
       : items.length === 0
         ? <EmptyState icon={<Mail size={44} />} title="No letters yet" action={<Button variant="primary" onClick={() => setAdding(true)}>Write one</Button>} />
         : <div className="grid-cards">{items.map(l => <LetterCard key={l.id} letter={l} onClick={() => setReading(l)} />)}</div>}

      <Modal open={adding} onClose={() => setAdding(false)} title="New letter"><LetterForm onDone={() => setAdding(false)} /></Modal>
      <LetterModal open={!!reading} letter={reading} onClose={() => setReading(null)} />
    </div>
  )
}
