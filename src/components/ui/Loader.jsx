export default function Loader({ full, label }) {
  return (
    <div className={full ? 'loader-full' : ''}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div className="loader" />
        {label && <small style={{ color: 'var(--text-muted)' }}>{label}</small>}
      </div>
    </div>
  )
}
