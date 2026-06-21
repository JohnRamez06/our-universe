import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import * as Icons from 'lucide-react'

export default function CelestialObject({ section, x, y, size = 72, orbit }) {
  const navigate = useNavigate()
  const Icon = Icons[section.icon] || Icons.Sparkles
  return (
    <motion.div
      className="celestial-object"
      style={{ left: x, top: y }}
      whileHover={{ scale: 1.1 }}
      onClick={() => navigate(section.path)}
    >
      <motion.div
        className="planet"
        style={{
          width: size, height: size,
          background: `radial-gradient(circle at 30% 30%, ${section.color}, #1a0e3a 70%)`,
          boxShadow: `0 0 40px ${section.color}66`,
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon size={size * 0.4} color="white" />
      </motion.div>
      <div className="label">{section.label}</div>
    </motion.div>
  )
}
