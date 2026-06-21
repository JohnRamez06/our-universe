import Card from '../../components/ui/Card'

export default function StatCard({ label, value, hint }) {
  return (
    <Card hover={false} className="stat-card">
      <div className="stat-num">{value}</div>
      <div className="stat-label">{label}</div>
      {hint && <small className="text-muted" style={{ display: 'block', marginTop: 4 }}>{hint}</small>}
    </Card>
  )
}
