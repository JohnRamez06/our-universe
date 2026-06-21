import { useState, useMemo } from 'react'
import { Plus, Star } from 'lucide-react'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import EmptyState from '../../components/ui/EmptyState'
import Loader from '../../components/ui/Loader'
import SearchBar from '../../components/shared/SearchBar'
import MemoryCard from './MemoryCard'
import MemoryModal from './MemoryModal'
import MemoryForm from './MemoryForm'
import useRealtime from '../../hooks/useRealtime'
import * as memoriesSvc from '../../services/memories.service'

export default function MemoriesPage() {
  const { items, loading } = useRealtime(memoriesSvc)
  const [adding, setAdding] = useState(false)
  const [selected, setSelected] = useState(null)
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    if (!q) return items
    const s = q.toLowerCase()
    return items.filter(m =>
      (m.title || '').toLowerCase().includes(s) ||
      (m.description || '').toLowerCase().includes(s) ||
      (m.location || '').toLowerCase().includes(s) ||
      (m.tags || []).some(t => t.toLowerCase().includes(s))
    )
  }, [items, q])

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Memories</h1>
          <p className="section-subtitle">Every moment, captured as a star.</p>
        </div>
        <Button variant="primary" icon={<Plus size={14} />} onClick={() => setAdding(true)}>New memory</Button>
      </div>
      <div style={{ marginBottom: 18, maxWidth: 420 }}>
        <SearchBar onChange={setQ} placeholder="Search memories…" />
      </div>

      {loading ? <Loader full />
       : filtered.length === 0
         ? <EmptyState icon={<Star size={44} />} title="No memories yet" message="Add your first shared moment." action={<Button variant="primary" onClick={() => setAdding(true)}>Add memory</Button>} />
         : (
           <div className="grid-cards">
             {filtered.map(m => <MemoryCard key={m.id} memory={m} onClick={() => setSelected(m)} />)}
           </div>
         )}

      <Modal open={adding} onClose={() => setAdding(false)} title="New memory" size="lg">
        <MemoryForm onDone={() => setAdding(false)} />
      </Modal>
      <MemoryModal open={!!selected} memory={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
