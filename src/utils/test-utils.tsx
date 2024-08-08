import { render, RenderOptions } from '@testing-library/react'
import React, { ReactElement } from 'react'

import { AuthProvider } from '@/auth/AuthProvider'
import { ReduxProvider } from '@/redux/ReduxProvider'

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </AuthProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: ProvidersWrapper, ...options })

export * from '@testing-library/react'
export { customRender as render }
