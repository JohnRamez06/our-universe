import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ value: initial = '', onChange, onSubmit, placeholder = 'Search…' }) {
  const [v, setV] = useState(initial)
  const handle = (e) => { setV(e.target.value); onChange?.(e.target.value) }
  const submit = (e) => { e.preventDefault(); onSubmit?.(v) }
  return (
    <form className="search-bar" onSubmit={submit}>
      <Search size={16} />
      <input className="input" value={v} onChange={handle} placeholder={placeholder} />
    </form>
  )
}
