import { Lock, Mail } from 'lucide-react'
import Card from '../../components/ui/Card'
import { safeFormat, isLetterUnlocked } from '../../utils/dateUtils'

export default function LetterCard({ letter, onClick }) {
  const locked = !isLetterUnlocked(letter.unlockDate)
  return (
    <Card onClick={onClick}>
      <div className="card-header">
        <div>
          <h4 className="card-title">{letter.title || 'Untitled'}</h4>
          <small className="card-meta">
            {locked ? <>Unlocks {safeFormat(letter.unlockDate)}</> : <>Written {safeFormat(letter.createdAt) || ''}</>}
          </small>
        </div>
        {locked ? <Lock size={18} style={{ color: 'var(--color-aurora-violet)' }} /> : <Mail size={18} />}
      </div>
      <div style={{ position: 'relative', minHeight: 60 }}>
        <p className={'card-body' + (locked ? ' letter-locked' : '')} style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {locked ? 'Sealed until the day arrives.' : letter.message}
        </p>
      </div>
    </Card>
  )
}
