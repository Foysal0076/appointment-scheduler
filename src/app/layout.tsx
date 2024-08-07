import '@/styles/globals.css'
import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

import { Inter, Rubik } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

import { AuthProvider } from '@/auth/AuthProvider'
import NextThemeProvider from '@/components/Common/NextThemeProvider'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { ReduxProvider } from '@/redux/ReduxProvider'
import { PROJECT_INFORMATION } from '@/utils/constants'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
})

export const metadata = {
  title: PROJECT_INFORMATION.name,
  description: PROJECT_INFORMATION.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${inter.variable} ${rubik.variable}`}>
      <link
        rel='icon'
        type='image/ico'
        sizes='32x32'
        href='/assets/favicons/favicon.ico'
      />
      <body>
        <AuthProvider>
          <NextThemeProvider>
            <ReduxProvider>
              <div className='flex min-h-screen flex-col justify-between bg-surface-50 pt-[3.75rem] md:pt-[4.5rem]'>
                <div>
                  <Navbar />
                  <main>{children}</main>
                </div>
                <Footer />
              </div>
            </ReduxProvider>
          </NextThemeProvider>
        </AuthProvider>
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          draggable
          pauseOnHover
          pauseOnFocusLoss={false}
        />
      </body>
    </html>
  )
}
