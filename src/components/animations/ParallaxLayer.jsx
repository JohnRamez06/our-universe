import { useEffect, useRef } from 'react'

export default function ParallaxLayer({ children, depth = 0.2 }) {
  const ref = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      ref.current.style.transform = `translateY(${window.scrollY * depth}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [depth])
  return <div ref={ref}>{children}</div>
}
