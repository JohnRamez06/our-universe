import Card from '../../components/ui/Card'
import { safeFormat } from '../../utils/dateUtils'
import { stripHtml, truncate } from '../../utils/formatters'

export default function JournalEntry({ entry, onClick }) {
  return (
    <Card onClick={onClick}>
      <div className="card-header">
        <div>
          <h4 className="card-title">{entry.title || 'Untitled'}</h4>
          <small className="card-meta">{safeFormat(entry.date)}</small>
        </div>
      </div>
      <p className="card-body">{truncate(stripHtml(entry.content), 180)}</p>
      {entry.images?.[0] && <img src={entry.images[0]} alt="" style={{ borderRadius: 12, marginTop: 10, maxHeight: 160, width: '100%', objectFit: 'cover' }} />}
    </Card>
  )
}
