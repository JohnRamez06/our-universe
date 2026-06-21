import { useState } from 'react'
import { Plus, Laugh } from 'lucide-react'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import EmptyState from '../../components/ui/EmptyState'
import Loader from '../../components/ui/Loader'
import JokeCard from './JokeCard'
import JokeForm from './JokeForm'
import useRealtime from '../../hooks/useRealtime'
import * as svc from '../../services/jokes.service'

export default function JokesPage() {
  const { items, loading } = useRealtime(svc)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Inside Jokes</h1>
          <p className="section-subtitle">Punchlines only the two of us get.</p>
        </div>
        <Button variant="primary" icon={<Plus size={14} />} onClick={() => setAdding(true)}>New joke</Button>
      </div>
      {loading ? <Loader full />
       : items.length === 0
         ? <EmptyState icon={<Laugh size={44} />} title="No jokes yet" action={<Button variant="primary" onClick={() => setAdding(true)}>Add one</Button>} />
         : <div className="grid-cards">{items.map(j => <JokeCard key={j.id} joke={j} onEdit={setEditing} />)}</div>}
      <Modal open={adding} onClose={() => setAdding(false)} title="New joke"><JokeForm onDone={() => setAdding(false)} /></Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit joke">{editing && <JokeForm joke={editing} onDone={() => setEditing(null)} />}</Modal>
    </div>
  )
}
