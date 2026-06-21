import { initials } from '../../utils/formatters'

export default function UserAvatar({ profile, size = 'md' }) {
  const name = profile?.displayName || 'You'
  return (
    <div className={'avatar' + (size === 'lg' ? ' avatar-lg' : '')} title={name}>
      {profile?.avatar
        ? <img src={profile.avatar} alt={name} />
        : <span>{initials(name)}</span>}
    </div>
  )
}
