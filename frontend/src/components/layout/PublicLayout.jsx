import { Outlet, useLocation } from 'react-router-dom'
import { useEffect }           from 'react'
import Navbar    from '../common/Navbar'
import Footer    from '../common/Footer'
import Popup     from '../common/Popup'
import WhatsApp  from '../common/WhatsApp'

export default function PublicLayout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Popup />
      <WhatsApp />
    </div>
  )
}
