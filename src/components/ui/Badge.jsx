export default function Badge({ children, variant }) {
  const cls = ['badge', variant && `badge-${variant}`].filter(Boolean).join(' ')
  return <span className={cls}>{children}</span>
}
