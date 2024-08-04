// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDJL8hMOi0SzM8BUI64en-U9mLSRMh_1Vw',
  authDomain: 'appointment-scheduler-60a97.firebaseapp.com',
  projectId: 'appointment-scheduler-60a97',
  storageBucket: 'appointment-scheduler-60a97.appspot.com',
  messagingSenderId: '70779774217',
  appId: '1:70779774217:web:c8432be6bf1acc99b89fd8',
  measurementId: 'G-8E9HNGRPR6',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
export { auth, db }
