'use client' // Error components must be Client Components

import { useEffect } from 'react'

import Button from '@/components/Common/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='container flex h-[95vh] items-center justify-center py-10'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='h3 text-center'>Something went wrong!</h1>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  )
}
