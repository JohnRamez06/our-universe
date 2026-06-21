import { COUPLE } from '../../utils/constants'

export default function Footer() {
  return (
    <footer style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)', fontSize: 12 }}>
      Made with ✦ for {COUPLE.user1} & {COUPLE.user2}
    </footer>
  )
}
