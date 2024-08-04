import Button from '@/components/Common/Button'
import { render } from '@testing-library/react'

describe('Button component', () => {
  test('renders without crashing', () => {
    const { container } = render(<Button />)
    expect(container).toBeInTheDocument()
  })

  test('applies default color and size classes if not provided', () => {
    const { container } = render(<Button />)
    const buttonElement = container.querySelector('button')
    expect(buttonElement).toHaveClass('bg-primary-500')
    expect(buttonElement).toHaveClass('h-[2.5rem]')
  })

  test('applies provided color and size classes', () => {
    const { container } = render(<Button color='secondary' size='lg' />)
    const buttonElement = container.querySelector('button')
    expect(buttonElement).toHaveClass('bg-secondary-500')
    expect(buttonElement).toHaveClass('h-[3.125rem]')
  })

  test('disables the button when loading is true', () => {
    const { container } = render(<Button loading />)
    const buttonElement = container.querySelector('button')
    expect(buttonElement).toBeDisabled()
  })

  test('renders spinner when loading is true', () => {
    const { container } = render(<Button loading />)
    const spinnerElement = container.querySelector('.absolute')
    expect(spinnerElement).toBeInTheDocument()
  })

  test('renders children when not loading', () => {
    const { container } = render(<Button>Click me</Button>)
    const childrenElement = container.querySelector('.visible')
    expect(childrenElement).toBeInTheDocument()
    expect(childrenElement).toHaveTextContent('Click me')
  })

  test('matches snapshot', () => {
    const { asFragment } = render(<Button />)
    expect(asFragment()).toMatchSnapshot()
  })
})
