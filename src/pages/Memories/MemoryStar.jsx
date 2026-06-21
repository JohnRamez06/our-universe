import { useState } from 'react'
import MemoryModal from './MemoryModal'

export default function MemoryStar({ memory, x = 0, y = 0, hot = false }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <span
        className={'memory-star animate-twinkle' + (hot ? ' hot' : '')}
        style={{ left: x, top: y, animationDuration: `${2 + Math.random() * 3}s` }}
        title={memory?.title}
        onClick={(e) => { e.stopPropagation(); setOpen(true) }}
      />
      <MemoryModal open={open} memory={memory} onClose={() => setOpen(false)} />
    </>
  )
}
