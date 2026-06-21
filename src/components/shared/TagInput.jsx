import { useState } from 'react'
import { X } from 'lucide-react'

export default function TagInput({ tags = [], onChange, placeholder = 'Add a tag…' }) {
  const [v, setV] = useState('')
  const add = (t) => {
    const tag = t.trim().replace(/^#/, '')
    if (!tag || tags.includes(tag)) return
    onChange?.([...tags, tag])
    setV('')
  }
  const remove = (t) => onChange?.(tags.filter(x => x !== t))
  return (
    <div className="tag-input">
      {tags.map(t => (
        <span key={t} className="tag-chip">#{t} <button type="button" onClick={() => remove(t)}><X size={12} /></button></span>
      ))}
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(v) }
          else if (e.key === 'Backspace' && !v && tags.length) remove(tags[tags.length - 1])
        }}
        placeholder={placeholder}
      />
    </div>
  )
}
