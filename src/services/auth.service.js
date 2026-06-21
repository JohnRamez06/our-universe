import {
  signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged,
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
export const logout = () => signOut(auth)
export const onAuth = (cb) => onAuthStateChanged(auth, cb)

export const getProfile = async (uid) => {
  const d = await getDoc(doc(db, 'users', uid))
  return d.exists() ? d.data() : null
}

export const upsertProfile = async (uid, data) => {
  await setDoc(doc(db, 'users', uid), data, { merge: true })
}

export const updateDisplayName = async (user, name) => {
  await updateProfile(user, { displayName: name })
  await updateDoc(doc(db, 'users', user.uid), { displayName: name })
}
