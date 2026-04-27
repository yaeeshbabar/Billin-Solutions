import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiSend } from 'react-icons/fi'
import api from '../../utils/api'

const SERVICES = [
  'Revenue Cycle Management','Insurance Credentialing',
  'Front Office Management','Medical Billing Audit',
  'Eligibility Verification','Upfront Assistance',
]

export default function ContactForm({ title = 'Request a Call Back', source = 'hero-form' }) {
  const [form, setForm]     = useState({ name:'', phone:'', email:'', service:'', source })
  const [loading, setLoading] = useState(false)

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/contact', form)
      toast.success('Thank you! We will contact you shortly.')
      setForm({ name:'', phone:'', email:'', service:'', source })
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div className="bg-white rounded-2xl p-7 shadow-green-lg">
      <h3 className="font-heading font-bold text-xl text-dark mb-6">{title}</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Service *</label>
          <select name="service" value={form.service} onChange={onChange} required className="input-field text-gray-600">
            <option value="">Choose Service</option>
            {SERVICES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Full Name *</label>
          <input name="name" value={form.name} onChange={onChange} required placeholder="Dr. John Smith" className="input-field"/>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Phone *</label>
            <input name="phone" value={form.phone} onChange={onChange} required placeholder="+1 (xxx) xxx-xxxx" className="input-field"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email *</label>
            <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="you@practice.com" className="input-field"/>
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="btn-primary w-full justify-center py-3 disabled:opacity-60">
          <FiSend size={15}/> {loading ? 'Sending…' : 'Submit Request'}
        </button>
        <p className="text-xs text-gray-600 text-center leading-relaxed">
          By submitting, you consent to receive communications from Billin Solutions Medical Billing.
        </p>
      </form>
    </div>
  )
}
