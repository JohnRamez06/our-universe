import { useState } from 'react'
import { Plus, Target } from 'lucide-react'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import ProgressBar from '../../components/ui/ProgressBar'
import EmptyState from '../../components/ui/EmptyState'
import Loader from '../../components/ui/Loader'
import GoalCard from './GoalCard'
import GoalForm from './GoalForm'
import useRealtime from '../../hooks/useRealtime'
import * as svc from '../../services/goals.service'

export default function BucketListPage() {
  const { items, loading } = useRealtime(svc)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)

  const done = items.filter(i => i.completed).length
  const total = items.length
  const open = items.filter(i => !i.completed)
  const completed = items.filter(i => i.completed)

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Bucket List</h1>
          <p className="section-subtitle">{done} of {total} dreams reached.</p>
        </div>
        <Button variant="primary" icon={<Plus size={14} />} onClick={() => setAdding(true)}>New goal</Button>
      </div>

      {total > 0 && <div className="mb-6"><ProgressBar value={total ? (done / total) * 100 : 0} /></div>}

      {loading ? <Loader full />
       : total === 0
         ? <EmptyState icon={<Target size={44} />} title="No goals yet" action={<Button variant="primary" onClick={() => setAdding(true)}>Add one</Button>} />
         : (
           <>
             <div className="grid-cards mb-6">
               {open.map(g => <GoalCard key={g.id} goal={g} onEdit={setEditing} />)}
             </div>
             {completed.length > 0 && (
               <>
                 <h3 className="cosmic-text" style={{ fontSize: 18, margin: '20px 0 12px' }}>Reached ✦</h3>
                 <div className="grid-cards">
                   {completed.map(g => <GoalCard key={g.id} goal={g} onEdit={setEditing} />)}
                 </div>
               </>
             )}
           </>
         )}

      <Modal open={adding} onClose={() => setAdding(false)} title="New goal"><GoalForm onDone={() => setAdding(false)} /></Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit goal">
        {editing && <GoalForm goal={editing} onDone={() => setEditing(null)} />}
      </Modal>
    </div>
  )
}
