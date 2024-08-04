import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

import { db } from '@/utils/firebase'

export const queryUserById = async (id: string) => {
  const q = query(collection(db, 'users'), where(documentId(), '==', id))

  const querySnapshot = await getDocs(q)
  const result: any[] = []
  querySnapshot.forEach((doc) => {
    result.push(doc.data())
  })
  return result
}

export const queryUser = async (key: string, value: string) => {
  const q = query(collection(db, 'users'), where(key, '==', value))

  const querySnapshot = await getDocs(q)
  const result: any[] = []
  querySnapshot.forEach((doc) => {
    result.push(doc.data())
  })
  return result
}
