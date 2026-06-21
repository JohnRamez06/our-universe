import { useState } from 'react'
import { Plus, Orbit, Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Modal from '../../components/ui/Modal'
import EmptyState from '../../components/ui/EmptyState'
import Loader from '../../components/ui/Loader'
import ConstellationForm from './ConstellationForm'
import ConstellationView from './ConstellationView'
import useRealtime from '../../hooks/useRealtime'
import * as svc from '../../services/constellations.service'
import * as memoriesSvc from '../../services/memories.service'
import notify from '../../components/ui/Toast'

export default function ConstellationsPage() {
  const { items, loading } = useRealtime(svc)
  const { items: memories } = useRealtime(memoriesSvc)
  const [adding, setAdding] = useState(false)
  const [viewing, setViewing] = useState(null)
  const [editing, setEditing] = useState(null)

  const handleDelete = async (id, e) => {
    e?.stopPropagation()
    try { await svc.remove(id); notify.success('Constellation removed') } catch (err) { notify.error(err.message) }
  }

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Constellations</h1>
          <p className="section-subtitle">Group memories into shapes that mean something.</p>
        </div>
        <Button variant="primary" icon={<Plus size={14} />} onClick={() => setAdding(true)}>New constellation</Button>
      </div>

      {loading ? <Loader full />
       : items.length === 0
         ? <EmptyState icon={<Orbit size={44} />} title="No constellations yet" message="Bundle memories that belong together." action={<Button variant="primary" onClick={() => setAdding(true)}>Create one</Button>} />
         : (
           <div className="grid-cards">
             {items.map(c => (
               <Card key={c.id} onClick={() => setViewing(c)}>
                 <div className="card-header">
                   <div>
                     <h4 className="card-title" style={{ color: c.color }}>{c.icon} {c.name}</h4>
                     <small className="card-meta">{(c.memoryIds || []).length} memories</small>
                   </div>
                   <div style={{ display: 'flex', gap: 4 }}>
                     <button className="icon-btn" onClick={(e) => { e.stopPropagation(); setEditing(c) }} aria-label="Edit">✎</button>
                     <button className="icon-btn" onClick={(e) => handleDelete(c.id, e)} aria-label="Delete"><Trash2 size={14} /></button>
                   </div>
                 </div>
                 <div style={{ height: 80, background: `radial-gradient(circle, ${c.color}33, transparent 70%)`, borderRadius: 12 }} />
               </Card>
             ))}
           </div>
         )}

      <Modal open={adding} onClose={() => setAdding(false)} title="New constellation">
        <ConstellationForm memories={memories} onDone={() => setAdding(false)} />
      </Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit constellation">
        {editing && <ConstellationForm memories={memories} constellation={editing} onDone={() => setEditing(null)} />}
      </Modal>
      <ConstellationView open={!!viewing} constellation={viewing} memories={memories} onClose={() => setViewing(null)} />
    </div>
  )
}
