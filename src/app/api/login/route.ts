import { NextResponse } from 'next/server'

import { authService } from '@/auth/services'

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

    const userData = authService.authenticateUser(email, password)

    return NextResponse.json({
      message: 'User signed in successfully',
      user: userData,
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
