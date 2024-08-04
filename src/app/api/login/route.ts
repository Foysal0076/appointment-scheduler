import { signInWithEmailAndPassword } from 'firebase/auth'
import { NextResponse } from 'next/server'

import { firebaseAuth } from '@/utils/firebase'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      )
    }

    if (!password) {
      return NextResponse.json(
        { message: 'Password is required' },
        { status: 400 }
      )
    }

    // sign up the user & add firestore data
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((cred) => {
        return NextResponse.json(cred.user)
      })
      .catch((error) => {
        console.log(error)
        return NextResponse.json(
          { message: error.message },
          { status: error.code }
        )
      })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
