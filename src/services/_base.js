import {
  collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc,
  query, orderBy, where, onSnapshot, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export const colRef = (name) => collection(db, name)

export const list = async (name, opts = {}) => {
  const { orderField = 'createdAt', orderDir = 'desc', wheres = [] } = opts
  let q = colRef(name)
  const conds = []
  wheres.forEach(([f, op, v]) => conds.push(where(f, op, v)))
  q = query(q, ...conds, orderBy(orderField, orderDir))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const subscribe = (name, cb, opts = {}) => {
  const { orderField = 'createdAt', orderDir = 'desc', wheres = [] } = opts
  let q = colRef(name)
  const conds = []
  wheres.forEach(([f, op, v]) => conds.push(where(f, op, v)))
  q = query(q, ...conds, orderBy(orderField, orderDir))
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  })
}

export const getOne = async (name, id) => {
  const d = await getDoc(doc(db, name, id))
  return d.exists() ? { id: d.id, ...d.data() } : null
}

export const create = async (name, data) => {
  const ref = await addDoc(colRef(name), { ...data, createdAt: serverTimestamp() })
  return ref.id
}

export const update = async (name, id, data) => {
  await updateDoc(doc(db, name, id), { ...data, updatedAt: serverTimestamp() })
}

export const remove = async (name, id) => {
  await deleteDoc(doc(db, name, id))
}
