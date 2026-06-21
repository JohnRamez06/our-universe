export default function Input({ label, error, as = 'input', className = '', ...rest }) {
  const Comp = as
  const cls = as === 'textarea' ? 'textarea' : as === 'select' ? 'select' : 'input'
  return (
    <div className="field">
      {label && <label className="field-label">{label}</label>}
      <Comp className={[cls, className].filter(Boolean).join(' ')} {...rest} />
      {error && <div className="field-error">{error}</div>}
    </div>
  )
}
