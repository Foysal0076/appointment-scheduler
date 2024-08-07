import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore'

import { db } from '@/utils/firebase'
import { capitalize } from '@/utils/helpers'
import { AppointmentItem } from '@/utils/types/appointment.types'

export const getUserById = async (id: string) => {
  const q = query(collection(db, 'users'), where(documentId(), '==', id))

  const querySnapshot = await getDocs(q)
  const result: any[] = []
  querySnapshot.forEach((doc) => {
    result.push(doc.data())
  })
  return result
}

export const searchUser = async ({
  key,
  value,
}: {
  hostId: string
  key: 'fullname' | 'email'
  value: string
}) => {
  try {
    const normalizedValue = value.toLowerCase()
    const endValue = normalizedValue + '\uf8ff'
    const q =
      key && value
        ? query(
            collection(db, 'users'),
            where(key, '>=', normalizedValue),
            where(key, '<', endValue),
            limit(10)
          )
        : query(collection(db, 'users'))

    const querySnapshot = await getDocs(q)
    const result: any[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      result.push({ ...data, id: doc.id, fullname: capitalize(data.fullname) })
    })
    return result
  } catch (e) {
    console.error('Error searching for user: ', e)
    throw e
  }
}

export const getAppointmentById = async (id: string) => {
  const q = query(collection(db, 'appointments'), where(documentId(), '==', id))

  const querySnapshot = await getDocs(q)
  const result: any[] = []
  querySnapshot.forEach((doc) => {
    result.push(doc.data())
  })
  return result
}

export const getAppointments = async ({
  hostId,
  isPast,
  isUpcoming,
}: {
  hostId: string
  isUpcoming?: boolean
  isPast?: boolean
}) => {
  try {
    const getAll = (!isPast && !isUpcoming) || (isPast && isUpcoming)
    const appointmentRef = collection(db, 'appointments')

    const q = getAll
      ? query(
          appointmentRef,
          where('hostId', '==', hostId),
          orderBy('startTime', 'asc')
        )
      : isPast
        ? query(
            appointmentRef,
            where('hostId', '==', hostId),
            where('endTime', '<', new Date().getTime()),
            orderBy('startTime', 'asc')
          )
        : query(
            appointmentRef,
            where('hostId', '==', hostId),
            where('endTime', '>', new Date().getTime()),
            orderBy('startTime', 'asc')
          )
    // const q = query(appointmentRef, where('hostId', '==', hostId))
    const querySnapshot = await getDocs(q)
    const result: any[] = []

    querySnapshot.forEach(async (doc) => {
      const id = doc.id
      const data = doc.data()
      result.push({ ...data, id })
    })
    return result
  } catch (error) {
    console.error('Error getting appointments: ', error)
    throw error
  }
}

export const createAppointment = async (data: Omit<AppointmentItem, 'id'>) => {
  try {
    const uniqueId = Date.now().toString()
    const docRef = doc(db, 'appointments', uniqueId)
    await setDoc(docRef, { ...data })
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const id = docSnap.id
      return { id, ...docSnap.data() }
    } else {
      throw new Error('No such document!')
    }
  } catch (error) {
    console.error('Error creating document: ', error)
    throw error
  }
}

export const updateAppointment = async (data: any) => {
  try {
    const docRef = doc(db, 'appointments', data.id)
    await setDoc(docRef, data, { merge: true })

    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      throw new Error('No such document!')
    }
  } catch (e) {
    console.error('Error updating document: ', e)
    throw e
  }
}
