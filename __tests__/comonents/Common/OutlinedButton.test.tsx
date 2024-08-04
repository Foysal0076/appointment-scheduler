import OutlinedButton from '@/components/Common/OutlinedButton'
import { render } from '@testing-library/react'

describe('OutlinedButton component', () => {
  test('renders without crashing', () => {
    const { container } = render(<OutlinedButton />)
    expect(container).toBeInTheDocument()
  })

  test('applies default color and size classes if not provided', () => {
    const { container } = render(<OutlinedButton />)
    const buttonElement = container.querySelector('button')
    expect(buttonElement).toHaveClass('border-primary-500/80')
    expect(buttonElement).toHaveClass('h-[2.5rem]')
  })

  test('applies provided color and size classes', () => {
    const { container } = render(<OutlinedButton color='secondary' size='lg' />)
    const buttonElement = container.querySelector('button')
    expect(buttonElement).toHaveClass('border-secondary-500/80')
    expect(buttonElement).toHaveClass('h-[3.125rem]')
  })

  test('disables the button when loading is true', () => {
    const { container } = render(<OutlinedButton loading />)
    const buttonElement = container.querySelector('button')
    expect(buttonElement).toBeDisabled()
  })

  test('renders spinner when loading is true', () => {
    const { container } = render(<OutlinedButton loading />)
    const spinnerElement = container.querySelector('.absolute')
    expect(spinnerElement).toBeInTheDocument()
  })

  test('renders children when not loading', () => {
    const { container } = render(<OutlinedButton>Click me</OutlinedButton>)
    const childrenElement = container.querySelector('.visible')
    expect(childrenElement).toBeInTheDocument()
    expect(childrenElement).toHaveTextContent('Click me')
  })

  test('matches snapshot', () => {
    const { asFragment } = render(<OutlinedButton />)
    expect(asFragment()).toMatchSnapshot()
  })
})
