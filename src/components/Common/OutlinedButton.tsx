import { cva } from 'class-variance-authority'
import clsx from 'clsx'

import Spinner from '@/components/Common/Spinner'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  loading?: boolean
}

const ButtonVariants = cva(
  'rounded bg-none border-2 focus:ring-4 disabled:active:transform-none disabled:cursor-not-allowed dark:hover:bg-neutral-20/50 transition-all duration-300 text-nowrap focus:outline-none font-medium active:scale-[.9]',
  {
    variants: {
      color: {
        primary:
          'hover:bg-primary-50 focus:ring-primary-100 border-primary-500/80 text-primary-500  focus:ring-primary-100 dark:text-primary-200 dark:border-primary-200 disabled:text-primary-200 disabled:border-primary-100 disabled:hover:bg-transparent dark:disabled:bg-primary-50/20 dark:disabled:border-primary-50/10 dark:disabled:text-primary-100/60',
        secondary:
          'hover:bg-secondary-50 focus:ring-secondary-100 border-secondary-500/80 text-secondary-500  focus:ring-secondary-100 dark:text-secondary-200 dark:border-secondary-200 disabled:text-secondary-200 disabled:border-secondary-100 disabled:hover:bg-transparent dark:disabled:bg-secondary-50/20 dark:disabled:border-secondary-50/10 dark:disabled:text-secondary-100/60',
        tertiary:
          'hover:bg-tertiary-50 focus:ring-tertiary-100 border-tertiary-500/80 text-tertiary-500  focus:ring-tertiary-100 dark:text-tertiary-200 dark:border-tertiary-200 disabled:text-tertiary-200 disabled:border-tertiary-100 disabled:hover:bg-transparent dark:disabled:bg-tertiary-50/20 dark:disabled:border-tertiary-50/10 dark:disabled:text-tertiary-100/60',
        danger:
          'hover:bg-danger-50 focus:ring-danger-100 border-danger-500/80 text-danger-500  focus:ring-danger-100 dark:text-danger-200 dark:border-danger-200 disabled:text-danger-200 disabled:border-danger-100 disabled:hover:bg-transparent dark:disabled:bg-danger-50/20 dark:disabled:border-danger-50/10 dark:disabled:text-danger-100/60',
        success:
          'hover:bg-success-50 focus:ring-success-100 border-success-500/80 text-success-500  focus:ring-success-100 dark:text-success-200 dark:border-success-200 disabled:text-success-200 disabled:border-success-100 disabled:hover:bg-transparent dark:disabled:bg-success-50/20 dark:disabled:border-success-50/10 dark:disabled:text-success-100/60',
      },
      size: {
        xs: 'h-[1.75rem] text-xs px-4',
        sm: 'h-[2rem] text-sm px-4',
        md: 'h-[2.5rem] text-md px-4',
        lg: 'h-[3.125rem] text-lg px-4',
        xl: 'h-[3.5rem] text-lg px-4',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'md',
    },
  }
)

const OutlinedButton = ({
  color = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        `relative select-none`,
        `${ButtonVariants({ color, size })}`,
        `${className}`
      )}
      disabled={loading}
      {...buttonProps}>
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <Spinner className='text-current' />
        </div>
      )}
      <div
        className={clsx(`visible font-Rubik`, {
          invisible: loading,
          'opacity-0': loading,
        })}>
        {children}
      </div>
    </button>
  )
}

export default OutlinedButton
