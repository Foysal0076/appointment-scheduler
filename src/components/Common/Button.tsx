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
  'rounded text-white focus:ring-4 disabled:active:transform-none active:scale-[.9] disabled:cursor-not-allowed transition-all duration-300 text-nowrap focus:outline-none font-medium',
  {
    variants: {
      color: {
        primary:
          'bg-primary-500 disabled:text-primary-200 disabled:bg-primary-50 hover:bg-primary-600 focus:ring-primary-100 focus:outline-primary-200 ',
        secondary:
          'bg-secondary-500 hover:bg-secondary-600 focus:ring-secondary-100 focus:outline-secondary-200 disabled:text-secondary-200 disabled:bg-secondary-50',
        tertiary:
          'bg-tertiary-500 hover:bg-tertiary-600 focus:ring-tertiary-100 focus:outline-tertiary-200 disabled:text-tertiary-200 disabled:bg-tertiary-50',
        danger:
          'bg-danger-500 hover:bg-danger-600 focus:ring-danger-100 focus:outline-danger-200 disabled:text-danger-200 disabled:bg-danger-50',
        success:
          'bg-success-500 hover:bg-success-600 focus:ring-success-100 focus:outline-success-200 disabled:text-success-200 disabled:bg-success-50',
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

const Button = ({
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

export default Button
