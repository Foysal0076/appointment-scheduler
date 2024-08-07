interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number
}

export const SearchIcon = ({ width = 20, className, ...props }: Props) => {
  if (typeof width !== 'number') throw new Error('width must be a number')
  const height = (width * 20) / 20

  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
      />
    </svg>
  )
}
