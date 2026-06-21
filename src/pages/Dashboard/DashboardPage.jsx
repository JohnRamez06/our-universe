import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MemoryOfTheDay from './MemoryOfTheDay'
import RecentActivity from './RecentActivity'
import UpcomingGoals from './UpcomingGoals'
import Card from '../../components/ui/Card'
import useRealtime from '../../hooks/useRealtime'
import * as memoriesSvc from '../../services/memories.service'
import * as journalSvc from '../../services/journal.service'
import * as lettersSvc from '../../services/letters.service'
import * as goalsSvc from '../../services/goals.service'
import { COUPLE } from '../../utils/constants'
import { getDaysTogether } from '../../utils/dateUtils'

export default function DashboardPage() {
  const { items: memories } = useRealtime(memoriesSvc)
  const { items: journal } = useRealtime(journalSvc)
  const { items: letters } = useRealtime(lettersSvc)
  const { items: goals } = useRealtime(goalsSvc)

  const stats = [
    { label: 'Days together', value: getDaysTogether(), to: '/' },
    { label: 'Memories', value: memories.length, to: '/memories' },
    { label: 'Journal', value: journal.length, to: '/journal' },
    { label: 'Letters', value: letters.length, to: '/letters' },
  ]

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass hero-panel">
        <h1>Hi, {COUPLE.user1} <span style={{ color: 'var(--color-nebula-pink)' }}>✦</span> {COUPLE.user2}</h1>
        <p className="text-soft">Welcome back to our little corner of the universe.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginTop: 18 }}>
          {stats.map(s => (
            <Link key={s.label} to={s.to} className="card stat-card">
              <div className="stat-num">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </Link>
          ))}
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
        <MemoryOfTheDay memories={memories} />
        <RecentActivity memories={memories} journal={journal} letters={letters} />
        <UpcomingGoals goals={goals} />
      </div>
    </div>
  )
}
