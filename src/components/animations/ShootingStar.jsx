import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ShootingStar() {
  const [trigger, setTrigger] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTrigger(t => t + 1), 5000 + Math.random() * 7000)
    return () => clearInterval(id)
  }, [])

  const top = 5 + Math.random() * 40
  const left = -10 + Math.random() * 30

  return (
    <AnimatePresence>
      <motion.span
        key={trigger}
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{ opacity: [0, 1, 0], x: 600, y: 300 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: `${top}%`, left: `${left}%`,
          width: 100, height: 2,
          background: 'linear-gradient(90deg, transparent, white, transparent)',
          transform: 'rotate(-25deg)',
          pointerEvents: 'none',
          zIndex: 0,
          boxShadow: '0 0 10px rgba(255,255,255,0.8)',
        }}
      />
    </AnimatePresence>
  )
}
