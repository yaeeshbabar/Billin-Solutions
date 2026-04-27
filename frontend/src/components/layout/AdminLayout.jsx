import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  FiGrid, FiMail, FiCalendar, FiFileText,
  FiBell, FiSettings, FiLogOut, FiMenu, FiX
} from 'react-icons/fi'
import { useState } from 'react'
import logo from '../../assets/logo.png'

const links = [
  { to: '/admin',          label: 'Dashboard', icon: <FiGrid /> , exact: true },
  { to: '/admin/contacts', label: 'Contacts',  icon: <FiMail /> },
  { to: '/admin/demos',    label: 'Demo Requests', icon: <FiCalendar /> },
  { to: '/admin/blogs',    label: 'Blog Posts', icon: <FiFileText /> },
  { to: '/admin/popups',   label: 'Popup Ads',  icon: <FiBell /> },
  { to: '/admin/settings', label: 'Settings',   icon: <FiSettings /> },
]

export default function AdminLayout() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/admin/login') }

  const Sidebar = ({ mobile = false }) => (
    <aside className={`${mobile ? 'w-full' : 'w-64'} bg-dark text-white flex flex-col h-full`}>
      <div className="p-5 border-b border-white/10">
        <img src={logo} alt="Billin Solutions" className="h-14 w-auto brightness-90" />
        <p className="text-green-300 text-xs mt-2 font-medium tracking-wide">Admin Dashboard</p>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.exact}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive ? 'bg-primary text-white shadow-green' : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <span className="text-lg">{l.icon}</span> {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-bold">
            {admin?.name?.[0] || 'A'}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{admin?.name || 'Admin'}</p>
            <p className="text-xs text-gray-400 truncate max-w-[130px]">{admin?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition">
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 z-10">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <button className="lg:hidden text-gray-600" onClick={() => setOpen(true)}>
            <FiMenu size={22} />
          </button>
          <h1 className="font-heading font-bold text-dark text-lg hidden lg:block">
            Billin Solutions — Admin Panel
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden md:block">{admin?.email}</span>
            <button onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition">
              <FiLogOut size={15} /> Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
