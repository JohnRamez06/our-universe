import { useState, useRef, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { useNotificationContext } from '../../contexts/NotificationContext'

export default function NotificationBell() {
  const { notifications, unreadCount, markRead } = useNotificationContext()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div className="bell-wrap" ref={ref}>
      <button className="icon-btn" onClick={() => setOpen(o => !o)} aria-label="Notifications">
        <Bell size={16} />
        {unreadCount > 0 && <span className="bell-dot" />}
      </button>
      {open && (
        <div className="notif-panel glass-dark">
          {notifications.length === 0 && <div className="text-center" style={{ color: 'var(--text-muted)', padding: 12 }}>No notifications</div>}
          {notifications.map(n => (
            <div key={n.id} className={'notif-item' + (n.read ? '' : ' unread')} onClick={() => markRead(n.id)}>
              <div style={{ fontSize: 13 }}>{n.message}</div>
              <small style={{ color: 'var(--text-muted)' }}>{n.type}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
