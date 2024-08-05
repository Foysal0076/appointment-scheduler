import clsx from 'clsx'

type Props = {
  status: string
  active: boolean
  onClick: () => void
}

const StatusPill = ({ active, onClick, status }: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'select-none rounded-full border px-2 py-1 text-sm capitalize transition-colors duration-200 md:text-base',
        {
          'border-primary-300 bg-primary-400/10 text-black hover:bg-primary-400/50':
            !active,
        },
        { 'border-primary-500 bg-primary-400 text-white': active }
      )}>
      {status}
    </button>
  )
}

export default StatusPill
