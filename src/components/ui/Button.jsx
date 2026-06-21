export default function Button({
  children, variant = 'default', size, icon, type = 'button',
  className = '', loading, disabled, ...rest
}) {
  const cls = [
    'btn',
    variant === 'primary' && 'btn-primary',
    variant === 'ghost' && 'btn-ghost',
    variant === 'danger' && 'btn-danger',
    size === 'sm' && 'btn-sm',
    size === 'lg' && 'btn-lg',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button type={type} className={cls} disabled={disabled || loading} {...rest}>
      {loading ? <span className="loader" style={{ width: 14, height: 14, borderWidth: 2 }} /> : icon}
      {children}
    </button>
  )
}
