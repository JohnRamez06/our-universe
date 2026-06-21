export default function PulsingGlow({ color = '139,92,246', size = 200, style }) {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse-glow"
      style={{
        position: 'absolute', width: size, height: size, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(${color},0.45), transparent 70%)`,
        filter: 'blur(20px)', pointerEvents: 'none',
        ...style,
      }}
    />
  )
}
