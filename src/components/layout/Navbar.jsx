import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import SearchBar from '../shared/SearchBar'
import NotificationBell from '../shared/NotificationBell'
import UserAvatar from '../shared/UserAvatar'
import { useAuth } from '../../hooks/useAuth'
import { getDaysTogether } from '../../utils/dateUtils'

export default function Navbar() {
  const { userProfile } = useAuth()
  const navigate = useNavigate()
  return (
    <header className="navbar">
      <div className="navbar-search">
        <SearchBar onSubmit={(q) => navigate(`/search?q=${encodeURIComponent(q)}`)} placeholder="Search our universe…" />
      </div>
      <div className="navbar-actions">
        <span className="badge badge-teal" title="Days together">
          ✦ {getDaysTogether()} days
        </span>
        <NotificationBell />
        <UserAvatar profile={userProfile} />
      </div>
    </header>
  )
}
