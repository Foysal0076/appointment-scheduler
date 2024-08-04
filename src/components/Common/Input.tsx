import clsx from 'clsx'
import React, { forwardRef } from 'react'

type TextFieldParams = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  helperText?: string
  layout?: 'horizontal' | 'vertical'
  error?: string
  startAdornment?: StartAdornment
  endAdornment?: EndAdornment
}

type StartAdornment = {
  adornment: React.ReactNode
  onClick: () => void
  className?: string
}

type EndAdornment = {
  adornment: React.ReactNode
  onClick: () => void
  className?: string
}

export const Input = forwardRef<HTMLInputElement, TextFieldParams>(
  function CustomInput(
    {
      label,
      error,
      layout = 'vertical',
      className = '',
      helperText,
      startAdornment,
      endAdornment,
      ...inputParams
    },
    ref
  ) {
    return (
      <div
        className={clsx('custom-input group flex', {
          'flex-col gap-1': layout === 'vertical',
        })}>
        {label && (
          <label
            htmlFor={inputParams.id as string}
            className={clsx(
              'font-bold',
              {
                'text-neutral-600 group-focus-within:text-primary-500 dark:text-neutral-700 dark:group-focus-within:text-primary-300':
                  !error,
              },
              { 'text-danger-500 group-focus-within:text-danger-500': error },
              {
                'after:ml-0.5 after:mr-1 after:text-danger-500 after:content-["*"]':
                  inputParams.required,
              },
              {
                'mt-2': layout === 'horizontal',
              }
            )}>
            {label}
            {layout === 'horizontal' && <span>:</span>}
          </label>
        )}
        <div className='relative flex flex-col'>
          <input
            ref={ref}
            {...inputParams}
            className={clsx(
              `rounded-sm border-none bg-surface-50 px-4 text-neutral-600 outline-none ring-1 ring-surface-400 placeholder:text-neutral-100 focus:placeholder:text-primary-100 disabled:bg-neutral-30 disabled:text-neutral-100 dark:bg-surface-200 dark:disabled:bg-surface-400 ${className}`,
              {
                'ring-neutral-50 focus:ring-primary-500 dark:focus:ring-primary-300':
                  !error,
                'ring-danger-500 focus:ring-danger-500': error,
                'pr-12': endAdornment,
                'pl-12': startAdornment,
              }
            )}
          />
          {helperText && (
            <span className='helper-text text-xs font-normal text-neutral-400 md:text-sm'>
              {`${helperText}`}
            </span>
          )}
          {error && (
            <div
              className={clsx(
                'absolute -bottom-0 left-0',
                { 'translate-y-[80%]': helperText },
                { 'translate-y-[90%]': !helperText }
              )}>
              <span className='-mt-1 text-xs text-danger-500 dark:text-danger-500'>
                {error}
              </span>
            </div>
          )}
          {startAdornment && (
            <button
              onClick={startAdornment.onClick}
              className={clsx(
                'absolute left-2 top-1/2 w-max -translate-y-1/2 rounded-full text-neutral-50 transition-colors duration-200 hover:bg-neutral-30',
                `${startAdornment.className ? startAdornment.className : ''}`
              )}
              aria-label='start-adornment btn'>
              {startAdornment.adornment}
            </button>
          )}
          {endAdornment && (
            <button
              onClick={endAdornment.onClick}
              className={clsx(
                'absolute right-2 top-1/2 w-max -translate-y-1/2 rounded-full text-neutral-50 transition-colors duration-200 hover:bg-neutral-30',
                `${endAdornment.className ? endAdornment.className : ''}`
              )}
              aria-label='end-adornment btn'>
              {endAdornment.adornment}
            </button>
          )}
        </div>
      </div>
    )
  }
)
