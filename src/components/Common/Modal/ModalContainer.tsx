import { Add } from 'iconsax-react'

type Props = {
  children: React.ReactNode
  handleClose: () => void
  className?: string
}

const ModalContainer = ({ children, className = '', handleClose }: Props) => {
  return (
    <div
      className={`shadow-04 scrollbar relative max-h-[90vh] overflow-y-auto rounded bg-surface-50 p-4 dark:bg-surface-100 md:p-6 ${className} `}>
      <button
        onClick={handleClose}
        className='group absolute right-2 top-2 rounded-full transition-all duration-300 md:right-3 md:top-3'>
        <Add
          size='32'
          className='rotate-45 text-neutral-400 transition-all duration-300 group-hover:text-neutral-900'
        />
      </button>
      <div className='mt-7 md:mt-8'>{children}</div>
    </div>
  )
}

export default ModalContainer
