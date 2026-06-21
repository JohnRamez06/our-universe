import { useMemo } from 'react'

export default function StarField({ count = 120 }) {
  const stars = useMemo(() => (
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 4,
      opacity: 0.4 + Math.random() * 0.6,
    }))
  ), [count])
  return (
    <div className="starfield" aria-hidden="true">
      {stars.map(s => (
        <span
          key={s.id}
          className="star animate-twinkle"
          style={{
            left: `${s.left}%`, top: `${s.top}%`,
            width: s.size, height: s.size,
            animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s`,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  )
}
