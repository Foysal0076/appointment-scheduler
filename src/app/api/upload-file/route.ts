// app/api/uploadFile/route.ts
import { NextResponse } from 'next/server'

import { uploadFile } from '@/utils/firebase/queries'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const path = formData.get('folderName') as string
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ message: 'File is required' }, { status: 400 })
    }

    //upload file to firebase
    const uploadLink = await uploadFile(file, `${path}`)
    return NextResponse.json({ uploadLink })
  } catch (error: any) {
    console.error('Error uploading file', error)
    return NextResponse.json(
      { message: `Error uploading file: ${error.message}` },
      { status: 500 }
    )
  }
}
