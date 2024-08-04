import { createUserWithEmailAndPassword } from 'firebase/auth'
import { NextResponse } from 'next/server'

import { db, firebaseAuth } from '@/utils/firebase'

export async function POST(request: Request) {
  const { fullname, email, password } = await request.json()

  if (!fullname) {
    return NextResponse.json(
      { message: 'Full name is required' },
      { status: 400 }
    )
  }
  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 })
  }

  if (!password) {
    return NextResponse.json(
      { message: 'Password is required' },
      { status: 400 }
    )
  }

  // sign up the user & add firestore data
  createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then((cred) => {
      return db.collection('users').doc(cred.user.uid).set({
        fullname,
        email,
      })
    })
    .then(() => {
      return NextResponse.json({ message: 'User registered successfully' })
    })
    .catch((error) => {
      console.log(error)
      return NextResponse.json(
        { message: error.message },
        { status: error.code }
      )
    })
}
