import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'

// Public layout & pages
import PublicLayout  from './components/layout/PublicLayout'
import Home          from './pages/public/Home'
import AboutUs       from './pages/public/AboutUs'
import Services      from './pages/public/Services'
import ServiceDetail from './pages/public/ServiceDetail'
import Specialties   from './pages/public/Specialties'
import SpecialtyDetail from './pages/public/SpecialtyDetail'
import States        from './pages/public/States'
import Pricing       from './pages/public/Pricing'
import Blog          from './pages/public/Blog'
import BlogDetail    from './pages/public/BlogDetail'
import Contact       from './pages/public/Contact'
import RequestDemo   from './pages/public/RequestDemo'

// Admin pages
import AdminLayout   from './components/layout/AdminLayout'
import AdminLogin    from './pages/admin/AdminLogin'
import Dashboard     from './pages/admin/Dashboard'
import AdminContacts from './pages/admin/AdminContacts'
import AdminDemos    from './pages/admin/AdminDemos'
import AdminBlogs    from './pages/admin/AdminBlogs'
import AdminPopups   from './pages/admin/AdminPopups'
import AdminSettings from './pages/admin/AdminSettings'

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"/></div>
  return admin ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ duration: 4000, style: { borderRadius: '12px', fontFamily: 'DM Sans' } }} />
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/"                   element={<Home />} />
          <Route path="/about-us"           element={<AboutUs />} />
          <Route path="/our-services"       element={<Services />} />
          <Route path="/service/:slug"      element={<ServiceDetail />} />
          <Route path="/our-specialties"    element={<Specialties />} />
          <Route path="/specialties/:slug"  element={<SpecialtyDetail />} />
          <Route path="/our-states"         element={<States />} />
          <Route path="/medical-billing-prices" element={<Pricing />} />
          <Route path="/blog"               element={<Blog />} />
          <Route path="/blog/:slug"         element={<BlogDetail />} />
          <Route path="/contact-us"         element={<Contact />} />
          <Route path="/request-free-demo"  element={<RequestDemo />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="demos"    element={<AdminDemos />} />
          <Route path="blogs"    element={<AdminBlogs />} />
          <Route path="popups"   element={<AdminPopups />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
