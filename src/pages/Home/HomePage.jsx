import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import UniverseCanvas from './UniverseCanvas'
import useMemories from '../../hooks/useMemories'
import { COUPLE } from '../../utils/constants'
import { getDaysTogether } from '../../utils/dateUtils'

export default function HomePage() {
  const { items: memories } = useMemories()
  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 18, textAlign: 'center' }}>
        <h1 className="cosmic-text" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>{COUPLE.appName}</h1>
        <p className="text-soft">{COUPLE.tagline} · {getDaysTogether()} days orbiting each other</p>
      </motion.div>
      <UniverseCanvas memories={memories} />
    </div>
  )
}
