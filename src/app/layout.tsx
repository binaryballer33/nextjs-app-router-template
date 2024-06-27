import type { Metadata, Viewport } from 'next/'
import { ReactNode } from 'react'
import { NProgress } from 'src/components/base/nprogress'
import { Layout as ProvidersLayout } from 'src/layouts/document'
import { MainLayout } from 'src/layouts/main-layout'

export const dynamic = 'force-dynamic'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: 'Starter Next Template',
  description: 'Created By Shaquille Rashad Mandy',
}

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body>
        <ProvidersLayout>
          <MainLayout>
            {children}
            <NProgress />
          </MainLayout>
        </ProvidersLayout>
      </body>
    </html>
  )
}

export default Layout
