import { useState } from 'react'
import { FiLock, FiSave, FiUser } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import api from '../../utils/api'

export default function AdminSettings() {
  const { admin } = useAuth()
  const [pwForm, setPwForm] = useState({ currentPassword:'', newPassword:'', confirmPassword:'' })
  const [pwLoading, setPwLoading] = useState(false)

  const onPwChange = e => setPwForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const onPwSubmit = async e => {
    e.preventDefault()
    if (pwForm.newPassword !== pwForm.confirmPassword) { toast.error('New passwords do not match'); return }
    if (pwForm.newPassword.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setPwLoading(true)
    try {
      await api.post('/auth/change-password', { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword })
      toast.success('Password changed successfully')
      setPwForm({ currentPassword:'', newPassword:'', confirmPassword:'' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password')
    } finally { setPwLoading(false) }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-heading font-bold text-2xl text-dark">Settings</h1>
        <p className="text-gray-400 text-sm">Manage your admin account settings.</p>
      </div>

      {/* Profile info */}
      <div className="admin-card">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-heading font-bold text-2xl">
            {admin?.name?.[0] || 'A'}
          </div>
          <div>
            <h3 className="font-heading font-bold text-dark">{admin?.name || 'Admin'}</h3>
            <p className="text-gray-400 text-sm">{admin?.email}</p>
            <span className="badge badge-replied mt-1">Administrator</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-bg rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">Name</p>
            <p className="font-medium text-dark text-sm">{admin?.name || 'Billin Solutions Admin'}</p>
          </div>
          <div className="bg-gray-bg rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">Email</p>
            <p className="font-medium text-dark text-sm">{admin?.email}</p>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="admin-card">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center"><FiLock className="text-primary" size={18}/></div>
          <div>
            <h3 className="font-heading font-bold text-dark text-base">Change Password</h3>
            <p className="text-xs text-gray-400">Update your admin account password</p>
          </div>
        </div>
        <form onSubmit={onPwSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Current Password *</label>
            <input type="password" name="currentPassword" value={pwForm.currentPassword} onChange={onPwChange} required placeholder="••••••••" className="input-field"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">New Password *</label>
            <input type="password" name="newPassword" value={pwForm.newPassword} onChange={onPwChange} required placeholder="Min. 6 characters" className="input-field"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Confirm New Password *</label>
            <input type="password" name="confirmPassword" value={pwForm.confirmPassword} onChange={onPwChange} required placeholder="Repeat new password" className="input-field"/>
          </div>
          <button type="submit" disabled={pwLoading} className="btn-primary disabled:opacity-60">
            <FiSave size={15}/> {pwLoading ? 'Changing…' : 'Change Password'}
          </button>
        </form>
      </div>

      {/* Site Info */}
      <div className="admin-card">
        <h3 className="font-heading font-bold text-dark text-base mb-4">Site Information</h3>
        <div className="space-y-3 text-sm">
          {[
            ['Company Name',    'Billin Solutions Medical Billing'],
            ['Phone',          '+1 (224) 999-6997'],
            ['Email',          'info@billinsolutions.com'],
            ['WhatsApp',       '+923100786960'],
            ['Address',        '708 Church Street, Suite #216, Evanston, IL 60201'],
            ['Website',        'www.billinsolutions.com'],
          ].map(([k,v]) => (
            <div key={k} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
              <span className="text-gray-400 w-32 flex-shrink-0 text-xs font-semibold uppercase tracking-wide">{k}</span>
              <span className="text-dark font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="admin-card">
        <h3 className="font-heading font-bold text-dark text-base mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            ['View Website', '/', '🌐'],
            ['Manage Contacts', '/admin/contacts', '✉️'],
            ['Demo Requests', '/admin/demos', '📅'],
            ['Blog Posts', '/admin/blogs', '📝'],
            ['Popup Ads', '/admin/popups', '🔔'],
          ].map(([label, href, icon]) => (
            <a key={label} href={href} target={href === '/' ? '_blank' : '_self'}
              className="flex items-center gap-3 p-3 bg-gray-bg rounded-xl hover:bg-primary-light hover:text-primary transition text-sm font-medium text-gray-600">
              <span>{icon}</span> {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
