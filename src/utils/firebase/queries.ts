import {
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { PutAppointmentBody } from '@/redux/apiQueries/apiQueries.type'
import { db, storage } from '@/utils/firebase'
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

    const hostQuery = getAll
      ? query(appointmentRef, where('hostId', '==', hostId))
      : isPast
        ? query(
            appointmentRef,
            where('hostId', '==', hostId),
            where('endTime', '<', new Date().getTime())
          )
        : query(
            appointmentRef,
            where('hostId', '==', hostId),
            where('endTime', '>', new Date().getTime())
          )

    const guestQuery = getAll
      ? query(appointmentRef, where('guestId', '==', hostId))
      : isPast
        ? query(
            appointmentRef,
            where('guestId', '==', hostId),
            where('endTime', '<', new Date().getTime())
          )
        : query(
            appointmentRef,
            where('guestId', '==', hostId),
            where('endTime', '>', new Date().getTime())
          )

    const [hostSnapshot, guestSnapshot] = await Promise.all([
      getDocs(hostQuery),
      getDocs(guestQuery),
    ])

    const result: any[] = []

    hostSnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() })
    })

    guestSnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() })
    })

    // Optionally, sort the combined results by startTime
    result.sort((a, b) => a.startTime - b.startTime)

    return result
  } catch (error) {
    console.error('Error fetching appointments: ', error)
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

export const updateAppointment = async (data: PutAppointmentBody) => {
  try {
    const { id, ...rest } = data
    const docRef = doc(db, 'appointments', id)

    await setDoc(docRef, { ...rest }, { merge: true })

    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      throw new Error('No such document!')
    }
  } catch (error) {
    console.error('Error updating document: ', error)
    throw error
  }
}

export const deleteAppointment = async (id: string) => {
  try {
    const docRef = doc(db, 'appointments', id)
    await deleteDoc(docRef)
    return { message: 'Appointment cancelled' }
  } catch (error) {
    console.error('Error deleting document: ', error)
    throw error
  }
}

export const uploadFile = async (file: File | Blob, path: string) => {
  try {
    const storageRef = ref(storage, `${path}`)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
  } catch (error) {
    console.error('Error uploading file: ', error)
    throw error
  }
}
