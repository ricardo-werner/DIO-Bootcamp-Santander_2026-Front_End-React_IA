import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Common/Header'

export function RootLayout() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-medium focus:text-primary-foreground focus:shadow-md focus:outline-none"
      >
        Pular para o conteúdo principal
      </a>
      <Header />
      <div id="main-content" tabIndex={-1} className="outline-none">
        <Outlet />
      </div>
    </>
  )
}
