import { useState } from 'react'
import { Plus, Rocket } from 'lucide-react'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import EmptyState from '../../components/ui/EmptyState'
import Loader from '../../components/ui/Loader'
import DreamCard from './DreamCard'
import DreamForm from './DreamForm'
import useRealtime from '../../hooks/useRealtime'
import * as svc from '../../services/future.service'

export default function FuturePage() {
  const { items, loading } = useRealtime(svc)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  const open = items.filter(i => !i.completed)
  const done = items.filter(i => i.completed)
  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Future Dreams</h1>
          <p className="section-subtitle">Tomorrows we're already building.</p>
        </div>
        <Button variant="primary" icon={<Plus size={14} />} onClick={() => setAdding(true)}>New dream</Button>
      </div>
      {loading ? <Loader full />
       : items.length === 0
         ? <EmptyState icon={<Rocket size={44} />} title="No dreams yet" action={<Button variant="primary" onClick={() => setAdding(true)}>Add one</Button>} />
         : (
           <>
             <div className="grid-cards mb-6">{open.map(d => <DreamCard key={d.id} dream={d} onEdit={setEditing} />)}</div>
             {done.length > 0 && (
               <>
                 <h3 className="cosmic-text" style={{ fontSize: 18, margin: '20px 0 12px' }}>Already real ✦</h3>
                 <div className="grid-cards">{done.map(d => <DreamCard key={d.id} dream={d} onEdit={setEditing} />)}</div>
               </>
             )}
           </>
         )}
      <Modal open={adding} onClose={() => setAdding(false)} title="New dream"><DreamForm onDone={() => setAdding(false)} /></Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit dream">{editing && <DreamForm dream={editing} onDone={() => setEditing(null)} />}</Modal>
    </div>
  )
}
