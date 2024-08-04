import { signOut } from 'firebase/auth'
import { NextResponse } from 'next/server'

import { auth } from '@/utils/firebase'

export async function POST(request: Request) {
  try {
    //sign out user fro firebase
    await signOut(auth)
    return NextResponse.json({
      message: 'User signed out successfully',
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
