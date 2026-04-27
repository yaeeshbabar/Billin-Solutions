import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'
import logo from '../../assets/logo.png'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const { login }   = useAuth()
  const navigate    = useNavigate()
  const [form, setForm]      = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/admin')
    } catch {
      toast.error('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary-dark to-primary flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="Billin Solutions" className="h-16 w-auto mx-auto mb-4" />
          <h1 className="font-heading font-bold text-2xl text-dark">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1">Billin Solutions Medical Billing</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input name="email" type="email" value={form.email} onChange={onChange} required
                placeholder="admin@billinsolutions.com" className="input-field pl-11" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input name="password" type="password" value={form.password} onChange={onChange} required
                placeholder="••••••••" className="input-field pl-11" />
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="btn-primary w-full justify-center py-3 disabled:opacity-60">
            <FiLogIn size={16} /> {loading ? 'Logging in…' : 'Login to Dashboard'}
          </button>
        </form>
        <div className="mt-6 p-4 bg-gray-bg rounded-xl text-xs text-gray-500 text-center">
          <p className="font-semibold text-dark mb-1">Default Credentials (after seed)</p>
          <p>Email: admin@billinsolutions.com</p>
          <p>Password: Admin@123</p>
          <p className="text-primary mt-1">Run <code className="bg-gray-100 px-1 rounded">npm run seed</code> in backend first</p>
        </div>
      </div>
    </div>
  )
}
