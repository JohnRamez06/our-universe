import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { guessMediaType } from '../../utils/mediaUtils'

export default function MediaGallery({ items = [] }) {
  const [open, setOpen] = useState(null)
  if (!items.length) return null

  const next = () => setOpen((i) => (i + 1) % items.length)
  const prev = () => setOpen((i) => (i - 1 + items.length) % items.length)

  return (
    <>
      <div className="media-grid">
        {items.map((url, i) => {
          const type = guessMediaType(url)
          return (
            <div key={i} className="media-thumb" onClick={() => setOpen(i)} style={{ cursor: 'zoom-in' }}>
              {type === 'video' ? <video src={url} muted /> : <img src={url} alt="" />}
            </div>
          )
        })}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <button className="modal-close" style={{ position: 'absolute', top: 20, right: 20 }} onClick={() => setOpen(null)}><X size={18} /></button>
            <button className="icon-btn" style={{ position: 'absolute', left: 20 }} onClick={(e) => { e.stopPropagation(); prev() }}><ChevronLeft /></button>
            <button className="icon-btn" style={{ position: 'absolute', right: 20 }} onClick={(e) => { e.stopPropagation(); next() }}><ChevronRight /></button>
            <motion.div
              key={open}
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              style={{ maxWidth: '90vw', maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {guessMediaType(items[open]) === 'video'
                ? <video src={items[open]} controls autoPlay style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: 12 }} />
                : <img src={items[open]} alt="" style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: 12 }} />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
