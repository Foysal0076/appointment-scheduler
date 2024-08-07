export const DrawerContent = () => {
  const year = new Date().getFullYear()
  return (
    <nav
      className='flex h-full flex-col justify-between'
      aria-label='Mobile navigation'>
      <div className='flex grow flex-col justify-between gap-4'>
        <div>{/* Top navigation */}</div>
        <div className='flex flex-col justify-end gap-4 bg-surface-50 px-6 py-4 dark:bg-surface-100/20'>
          <div className='flex items-center justify-between'>
            <p className={`flex items-center text-xs`}>
              © {year}. All rights reserved.
            </p>
            <p className='text-xs italic'>Foysal</p>
          </div>
        </div>
      </div>
    </nav>
  )
}
