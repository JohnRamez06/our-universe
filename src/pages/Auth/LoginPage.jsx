import { useState } from 'react'
import { motion } from 'framer-motion'
import StarField from '../../components/animations/StarField'
import NebulaBackground from '../../components/animations/NebulaBackground'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'
import notify from '../../components/ui/Toast'
import { COUPLE } from '../../utils/constants'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      notify.success('Welcome back ✦')
    } catch (err) {
      notify.error(err.message?.replace('Firebase: ', '') || 'Sign in failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="login-page">
      <StarField count={80} />
      <NebulaBackground />
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="glass-strong login-card"
      >
        <h1 className="login-title cosmic-text">{COUPLE.appName}</h1>
        <p className="text-center text-soft" style={{ marginBottom: 20 }}>{COUPLE.tagline}</p>
        <form onSubmit={onSubmit}>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" variant="primary" loading={loading} className="w-full" style={{ width: '100%', justifyContent: 'center' }}>
            Enter our universe
          </Button>
        </form>
        <p className="text-center text-soft" style={{ marginTop: 16, fontSize: 12 }}>
          Only two souls live here.
        </p>
      </motion.div>
    </div>
  )
}
