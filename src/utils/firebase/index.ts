// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDJL8hMOi0SzM8BUI64en-U9mLSRMh_1Vw',
  authDomain: 'appointment-scheduler-60a97.firebaseapp.com',
  projectId: 'appointment-scheduler-60a97',
  storageBucket: 'appointment-scheduler-60a97.appspot.com',
  messagingSenderId: '70779774217',
  appId: '1:70779774217:web:c8432be6bf1acc99b89fd8',
  measurementId: 'G-8E9HNGRPR6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const firebaseAuth = getAuth()
