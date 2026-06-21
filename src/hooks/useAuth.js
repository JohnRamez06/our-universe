// src/hooks/useAuth.js
import { useAuthContext } from '../contexts/AuthContext'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'

export function useAuth() {
  const { user, userProfile, loading } = useAuthContext()

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    return signOut(auth)
  }

  return { user, userProfile, loading, login, logout }
}
