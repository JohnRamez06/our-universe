import { useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SECTIONS } from '../../utils/constants'
import CelestialObject from './CelestialObject'
import MemoryStar from '../Memories/MemoryStar'
import { useNavigate } from 'react-router-dom'

const ORBIT_SECTIONS = SECTIONS.filter(s => !['home', 'search'].includes(s.key))

export default function UniverseCanvas({ memories = [] }) {
  const navigate = useNavigate()
  const ref = useRef(null)
  const [zoom, setZoom] = useState(1)

  const positions = useMemo(() => {
    const r1 = 200, r2 = 340
    return ORBIT_SECTIONS.map((s, i) => {
      const angle = (i / ORBIT_SECTIONS.length) * Math.PI * 2
      const r = i % 2 === 0 ? r1 : r2
      return { ...s, x: Math.cos(angle) * r, y: Math.sin(angle) * r }
    })
  }, [])

  const stars = useMemo(() => memories.map((m, i) => {
    const angle = Math.random() * Math.PI * 2
    const r = 80 + Math.random() * 260
    return {
      id: m.id || i, m,
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
    }
  }), [memories])

  return (
    <div
      className="universe-canvas"
      onWheel={(e) => {
        e.preventDefault()
        setZoom(z => Math.max(0.5, Math.min(2, z + (e.deltaY > 0 ? -0.08 : 0.08))))
      }}
      ref={ref}
    >
      <motion.div
        className="universe-inner"
        drag
        dragMomentum={false}
        style={{ scale: zoom }}
      >
        <div style={{ position: 'absolute', left: '50%', top: '50%' }}>
          {/* Center sun = home brand */}
          <motion.div
            onClick={() => navigate('/dashboard')}
            style={{
              position: 'absolute', transform: 'translate(-50%, -50%)',
              width: 110, height: 110, borderRadius: '50%',
              background: 'radial-gradient(circle, #fff7d6, #fbbf24 40%, #ec4899 80%)',
              boxShadow: '0 0 60px rgba(251,191,36,0.7), 0 0 120px rgba(236,72,153,0.5)',
              cursor: 'pointer',
            }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {stars.map(s => (
            <MemoryStar key={s.id} memory={s.m} x={s.x} y={s.y} />
          ))}

          {positions.map(p => (
            <CelestialObject key={p.key} section={p} x={p.x} y={p.y} />
          ))}
        </div>
      </motion.div>

      <div style={{
        position: 'absolute', bottom: 12, right: 16, color: 'var(--text-muted)',
        fontSize: 11, background: 'rgba(0,0,0,0.4)', padding: '4px 10px', borderRadius: 999,
      }}>
        Drag to pan · scroll to zoom · click a planet to enter
      </div>
    </div>
  )
}
