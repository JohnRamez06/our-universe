import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function SupernovaAnimation({ trigger }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!trigger) return
    setShow(true)
    const t = setTimeout(() => setShow(false), 2000)
    return () => clearTimeout(t)
  }, [trigger])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="supernova"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 3, opacity: [0, 1, 0] }} exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  )
}
