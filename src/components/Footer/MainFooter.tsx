export const MainFooter = () => {
  const year = new Date().getFullYear()
  return (
    <div className='container flex justify-between border-t border-neutral-30 py-6'>
      <p className={`flex items-center text-xs`}>
        © {year}. All rights reserved.
      </p>
      <p className='text-sm italic'>Foysal</p>
    </div>
  )
}
