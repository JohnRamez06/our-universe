import { motion } from 'framer-motion'

export default function Card({ children, hover = true, className = '', onClick, as = 'div', ...rest }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp
      onClick={onClick}
      className={['card', hover && 'card-hover', onClick && 'cursor-pointer', className].filter(Boolean).join(' ')}
      style={{ cursor: onClick ? 'pointer' : undefined }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
