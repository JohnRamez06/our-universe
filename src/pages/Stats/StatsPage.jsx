import StatCard from './StatCard'
import useRealtime from '../../hooks/useRealtime'
import * as memoriesSvc from '../../services/memories.service'
import * as journalSvc from '../../services/journal.service'
import * as lettersSvc from '../../services/letters.service'
import * as musicSvc from '../../services/music.service'
import * as placesSvc from '../../services/places.service'
import * as goalsSvc from '../../services/goals.service'
import * as jokesSvc from '../../services/jokes.service'
import * as futureSvc from '../../services/future.service'
import * as constellationsSvc from '../../services/constellations.service'
import { sumPhotos, sumVideos, longestStreak } from '../../utils/statsUtils'
import { getDaysTogether } from '../../utils/dateUtils'

export default function StatsPage() {
  const { items: memories } = useRealtime(memoriesSvc)
  const { items: journal } = useRealtime(journalSvc)
  const { items: letters } = useRealtime(lettersSvc)
  const { items: music } = useRealtime(musicSvc)
  const { items: places } = useRealtime(placesSvc)
  const { items: goals } = useRealtime(goalsSvc)
  const { items: jokes } = useRealtime(jokesSvc)
  const { items: future } = useRealtime(futureSvc)
  const { items: constellations } = useRealtime(constellationsSvc)

  const stats = [
    { label: 'Days together', value: getDaysTogether() },
    { label: 'Memories', value: memories.length, hint: `${sumPhotos(memories)} photos · ${sumVideos(memories)} videos` },
    { label: 'Journal entries', value: journal.length },
    { label: 'Letters', value: letters.length },
    { label: 'Songs', value: music.length },
    { label: 'Places', value: places.length },
    { label: 'Goals reached', value: `${goals.filter(g => g.completed).length} / ${goals.length}` },
    { label: 'Inside jokes', value: jokes.length },
    { label: 'Dreams ahead', value: future.filter(f => !f.completed).length },
    { label: 'Constellations', value: constellations.length },
    { label: 'Longest memory streak', value: `${longestStreak(memories)} days` },
  ]

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Our Universe in Numbers</h1>
          <p className="section-subtitle">Every star, counted.</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>
    </div>
  )
}
