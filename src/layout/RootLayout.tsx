import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Common/Header'

export function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
