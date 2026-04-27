import { useState, useEffect } from 'react'
import { FiPlus, FiTrash2, FiEdit2, FiRefreshCw, FiEye, FiToggleLeft, FiToggleRight } from 'react-icons/fi'
import toast from 'react-hot-toast'
import api from '../../utils/api'

const EMPTY = { title:'', subtitle:'', body:'', ctaText:'Get Free Demo', active:true, delay:6, showOnce:true, type:'offer' }

export default function AdminPopups() {
  const [popups,  setPopups]  = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(false)
  const [editing, setEditing] = useState(null)
  const [form,    setForm]    = useState(EMPTY)
  const [saving,  setSaving]  = useState(false)
  const [preview, setPreview] = useState(null)

  const load = () => {
    setLoading(true)
    api.get('/popup').then(r => setPopups(r.data.data)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModal(true) }
  const openEdit   = p  => { setEditing(p._id); setForm(p); setModal(true) }
  const closeModal = () => { setModal(false); setEditing(null); setForm(EMPTY) }

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const onSubmit = async e => {
    e.preventDefault(); setSaving(true)
    try {
      if (editing) {
        const r = await api.put(`/popup/${editing}`, form)
        setPopups(p => p.map(x => x._id === editing ? r.data.data : x))
        toast.success('Popup updated')
      } else {
        const r = await api.post('/popup', form)
        setPopups(p => [r.data.data, ...p])
        toast.success('Popup created')
      }
      closeModal()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save')
    } finally { setSaving(false) }
  }

  const toggleActive = async (id, active) => {
    try {
      const r = await api.put(`/popup/${id}`, { active })
      setPopups(p => p.map(x => x._id === id ? r.data.data : x))
      toast.success(active ? 'Popup activated' : 'Popup deactivated')
    } catch { toast.error('Failed to update') }
  }

  const deletePopup = async id => {
    if (!confirm('Delete this popup?')) return
    try {
      await api.delete(`/popup/${id}`)
      setPopups(p => p.filter(x => x._id !== id))
      toast.success('Deleted')
    } catch { toast.error('Failed to delete') }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl text-dark">Popup Ads</h1>
          <p className="text-gray-400 text-sm">{popups.filter(p => p.active).length} active popup(s)</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="btn-outline text-sm py-2 px-4"><FiRefreshCw size={14}/> Refresh</button>
          <button onClick={openCreate} className="btn-primary text-sm py-2 px-4"><FiPlus size={14}/> New Popup</button>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-primary-light border border-accent/20 rounded-xl p-4 text-sm text-primary">
        <strong>How popups work:</strong> The active popup appears on the website after the configured delay (in seconds). Only one popup can be "active" at a time. Use <code className="bg-white px-1 rounded text-xs">showOnce</code> to show it only once per session.
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 flex items-center justify-center h-32">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"/>
          </div>
        ) : popups.length === 0 ? (
          <div className="col-span-3 text-center py-16 admin-card">
            <div className="text-4xl mb-3">🔔</div>
            <p className="text-gray-400 text-sm mb-4">No popups created yet</p>
            <button onClick={openCreate} className="btn-primary text-sm"><FiPlus size={14}/> Create First Popup</button>
          </div>
        ) : popups.map(p => (
          <div key={p._id} className={`admin-card relative ${p.active ? 'ring-2 ring-primary' : ''}`}>
            {p.active && <span className="absolute -top-2 -right-2 bg-accent text-white text-xs px-2 py-0.5 rounded-full font-bold">ACTIVE</span>}
            <div className="flex items-start justify-between mb-3">
              <span className={`badge ${p.type === 'offer' ? 'bg-gold/20 text-yellow-700' : p.type === 'demo' ? 'badge-new' : 'badge-read'}`}>{p.type}</span>
              <div className="flex gap-1">
                <button onClick={() => setPreview(p)} className="text-gray-400 hover:text-primary transition p-1"><FiEye size={14}/></button>
                <button onClick={() => openEdit(p)} className="text-primary hover:text-primary-dark transition p-1"><FiEdit2 size={14}/></button>
                <button onClick={() => deletePopup(p._id)} className="text-red-400 hover:text-red-600 transition p-1"><FiTrash2 size={14}/></button>
              </div>
            </div>
            <h3 className="font-heading font-bold text-dark text-sm mb-1 line-clamp-2">{p.title}</h3>
            <p className="text-xs text-gray-400 mb-1">{p.subtitle}</p>
            <p className="text-xs text-gray-500 line-clamp-2 mb-3">{p.body}</p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-400 mb-4">
              <span>⏱ {p.delay}s delay</span>
              <span>• CTA: "{p.ctaText}"</span>
              <span>• {p.showOnce ? 'Once per session' : 'Always show'}</span>
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-50 text-xs text-gray-400">
              <span className="flex items-center gap-1"><FiEye size={11}/>{p.impressions || 0} impressions</span>
              <span>• {p.conversions || 0} conversions</span>
              {p.impressions > 0 && <span>• {Math.round((p.conversions / p.impressions) * 100)}% CTR</span>}
            </div>
            <button onClick={() => toggleActive(p._id, !p.active)}
              className={`mt-3 flex items-center gap-2 text-xs font-semibold w-full justify-center py-2 rounded-xl transition ${p.active ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-primary-light text-primary hover:bg-green-100'}`}>
              {p.active ? <><FiToggleRight size={16}/> Deactivate</> : <><FiToggleLeft size={16}/> Activate</>}
            </button>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl">
              <h2 className="font-heading font-bold text-lg text-dark">{editing ? 'Edit Popup' : 'Create New Popup'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <form onSubmit={onSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Title *</label>
                <input name="title" value={form.title} onChange={onChange} required placeholder="🎉 Get 30 Days FREE Billing!" className="input-field text-sm"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Subtitle</label>
                <input name="subtitle" value={form.subtitle} onChange={onChange} placeholder="Limited Time Offer for New Practices" className="input-field text-sm"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Body Text</label>
                <textarea name="body" value={form.body} onChange={onChange} rows={3} placeholder="Compelling description of the offer…" className="input-field text-sm resize-none"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">CTA Button Text</label>
                  <input name="ctaText" value={form.ctaText} onChange={onChange} placeholder="Get Free Demo" className="input-field text-sm"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Type</label>
                  <select name="type" value={form.type} onChange={onChange} className="input-field text-sm">
                    <option value="offer">Offer</option>
                    <option value="demo">Demo</option>
                    <option value="info">Info</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Delay (seconds before showing)</label>
                <input name="delay" type="number" min={1} max={60} value={form.delay} onChange={onChange} className="input-field text-sm"/>
              </div>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="active" checked={form.active} onChange={onChange} className="w-4 h-4 accent-primary"/>
                  <span className="text-sm text-gray-600 font-medium">Active (show on website)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="showOnce" checked={form.showOnce} onChange={onChange} className="w-4 h-4 accent-primary"/>
                  <span className="text-sm text-gray-600 font-medium">Show once per session</span>
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center disabled:opacity-60">
                  {saving ? 'Saving…' : (editing ? 'Update Popup' : 'Create Popup')}
                </button>
                <button type="button" onClick={closeModal} className="btn-outline px-6">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-primary-dark via-primary to-accent p-6 text-white relative">
              <button onClick={() => setPreview(null)} className="absolute top-4 right-4 bg-white/20 rounded-full p-1.5"><span className="text-xs">✕</span></button>
              <div className="text-4xl mb-2">🏥</div>
              <h3 className="font-heading font-bold text-xl">{preview.title}</h3>
              {preview.subtitle && <p className="text-green-100 text-sm mt-1">{preview.subtitle}</p>}
            </div>
            <div className="p-6">
              {preview.body && <p className="text-gray-600 text-sm leading-relaxed mb-5">{preview.body}</p>}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {['No Upfront Cost','Rates from 2.49%','99% Clean Claims','Free Consultation'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-600 bg-primary-light rounded-lg px-3 py-2">
                    <span className="text-accent font-bold">✓</span> {f}
                  </div>
                ))}
              </div>
              <button className="btn-primary w-full justify-center py-3">{preview.ctaText}</button>
              <p className="text-center text-xs text-gray-400 mt-3">Preview Mode</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
