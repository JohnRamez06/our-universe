import { NavLink } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { SECTIONS, COUPLE } from '../../utils/constants'
import { useAuth } from '../../hooks/useAuth'

export default function Sidebar() {
  const { logout, userProfile } = useAuth()
  return (
    <aside className="sidebar">
      <div className="sidebar-brand cosmic-text">{COUPLE.appName}</div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {SECTIONS.map(s => {
          const Icon = Icons[s.icon] || Icons.Sparkles
          return (
            <NavLink
              key={s.key}
              to={s.path}
              end={s.path === '/'}
              className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
            >
              <Icon size={16} style={{ color: s.color }} />
              <span>{s.label}</span>
            </NavLink>
          )
        })}
      </nav>
      <div className="sidebar-footer">
        {userProfile?.displayName || COUPLE.user1}
        <button
          onClick={logout}
          style={{ display: 'block', marginTop: 8, color: 'var(--color-nebula-pink)', background: 'none', border: 'none', padding: 0, fontSize: 12, cursor: 'pointer' }}
        >Sign out</button>
      </div>
    </aside>
  )
}
