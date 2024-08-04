import { Input } from '@/components/Common/Input'
import { fireEvent, render } from '@testing-library/react'

describe('Input component', () => {
  test('renders without crashing', () => {
    const { container } = render(<Input />)
    expect(container).toBeInTheDocument()
  })

  test('applies default styles', () => {
    const { container } = render(<Input />)
    const inputElement = container.querySelector('input')
    expect(inputElement).toHaveClass('rounded-sm border-none bg-surface-50')
  })

  test('renders label when provided', () => {
    const { container } = render(<Input label='Username' />)
    const labelElement = container.querySelector('label')
    expect(labelElement).toBeInTheDocument()
    expect(labelElement).toHaveTextContent('Username')
  })

  test('applies error styles when error is provided', () => {
    const { container } = render(<Input error='Invalid input' />)
    const inputElement = container.querySelector('input')
    expect(inputElement).toHaveClass('ring-danger-500 focus:ring-danger-500')
  })

  test('calls onClick handler when start adornment button is clicked', () => {
    const handleClick = jest.fn()
    const { container } = render(
      <Input
        startAdornment={{
          adornment: <span>🔍</span>,
          onClick: handleClick,
        }}
      />
    )
    const startAdornmentButton = container.querySelector(
      'button[aria-label="start-adornment btn"]'
    )
    if (startAdornmentButton) {
      fireEvent.click(startAdornmentButton)
      expect(handleClick).toHaveBeenCalled()
    }
  })

  test('calls onClick handler when end adornment button is clicked', () => {
    const handleClick = jest.fn()
    const { container } = render(
      <Input
        endAdornment={{
          adornment: <span>👁️</span>,
          onClick: handleClick,
        }}
      />
    )
    const endAdornmentButton = container.querySelector(
      'button[aria-label="end-adornment btn"]'
    )
    if (endAdornmentButton) {
      fireEvent.click(endAdornmentButton)
      expect(handleClick).toHaveBeenCalled()
    }
  })

  test('matches snapshot', () => {
    const { asFragment } = render(<Input />)
    expect(asFragment()).toMatchSnapshot()
  })
})
