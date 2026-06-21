import { useState } from 'react'
import { Plus, Music } from 'lucide-react'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import EmptyState from '../../components/ui/EmptyState'
import Loader from '../../components/ui/Loader'
import MusicCard from './MusicCard'
import MusicForm from './MusicForm'
import useRealtime from '../../hooks/useRealtime'
import * as svc from '../../services/music.service'

export default function MusicPage() {
  const { items, loading } = useRealtime(svc)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Soundtrack</h1>
          <p className="section-subtitle">Songs that scored our scenes.</p>
        </div>
        <Button variant="primary" icon={<Plus size={14} />} onClick={() => setAdding(true)}>Add song</Button>
      </div>

      {loading ? <Loader full />
       : items.length === 0
         ? <EmptyState icon={<Music size={44} />} title="No songs yet" action={<Button variant="primary" onClick={() => setAdding(true)}>Add one</Button>} />
         : <div className="grid-cards">{items.map(t => <MusicCard key={t.id} track={t} onEdit={setEditing} />)}</div>}

      <Modal open={adding} onClose={() => setAdding(false)} title="New track"><MusicForm onDone={() => setAdding(false)} /></Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit track">
        {editing && <MusicForm track={editing} onDone={() => setEditing(null)} />}
      </Modal>
    </div>
  )
}
