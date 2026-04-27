import { useState, useEffect } from 'react'
import { FiSearch, FiTrash2, FiEdit2, FiDownload, FiRefreshCw } from 'react-icons/fi'
import toast from 'react-hot-toast'
import api from '../../utils/api'

const STATUSES = ['new','read','replied','closed']

export default function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [filter,   setFilter]   = useState('all')

  const load = () => {
    setLoading(true)
    api.get('/contact').then(r => setContacts(r.data.data)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/contact/${id}`, { status })
      setContacts(p => p.map(c => c._id === id ? { ...c, status } : c))
      toast.success('Status updated')
    } catch { toast.error('Failed to update') }
  }

  const deleteContact = async id => {
    if (!confirm('Delete this contact?')) return
    try {
      await api.delete(`/contact/${id}`)
      setContacts(p => p.filter(c => c._id !== id))
      toast.success('Deleted')
    } catch { toast.error('Failed to delete') }
  }

  const exportCSV = () => {
    const rows = [['Name','Email','Phone','Service','Status','Source','Date']]
    filtered.forEach(c => rows.push([c.name, c.email, c.phone, c.service, c.status, c.source, new Date(c.createdAt).toLocaleDateString()]))
    const csv = rows.map(r => r.join(',')).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = 'contacts.csv'
    a.click()
  }

  const filtered = contacts.filter(c =>
    (filter === 'all' || c.status === filter) &&
    (c.name?.toLowerCase().includes(search.toLowerCase()) ||
     c.email?.toLowerCase().includes(search.toLowerCase()) ||
     c.service?.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl text-dark">Contacts</h1>
          <p className="text-gray-400 text-sm">{contacts.length} total inquiries</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="btn-outline text-sm py-2 px-4"><FiRefreshCw size={14}/> Refresh</button>
          <button onClick={exportCSV} className="btn-primary text-sm py-2 px-4"><FiDownload size={14}/> Export CSV</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15}/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email or service…"
            className="input-field pl-9 text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', ...STATUSES].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition ${filter === s ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-100 hover:border-primary/30'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="admin-card overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"/>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-gray-400 text-sm">No contacts found</p>
          </div>
        ) : (
          <table className="w-full text-sm min-w-[700px]">
            <thead><tr className="border-b border-gray-100">
              {['Name','Contact','Service','Source','Status','Date','Actions'].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs text-gray-400 font-semibold uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c._id} className="table-row">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{c.name?.[0]}</div>
                      <span className="font-medium text-dark text-xs">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <p className="text-xs text-gray-600">{c.email}</p>
                    <p className="text-xs text-gray-400">{c.phone}</p>
                  </td>
                  <td className="py-3 px-3 text-xs text-gray-600 max-w-[140px] truncate">{c.service}</td>
                  <td className="py-3 px-3 text-xs text-gray-400">{c.source || 'website'}</td>
                  <td className="py-3 px-3">
                    <select value={c.status} onChange={e => updateStatus(c._id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-lg border font-semibold cursor-pointer badge badge-${c.status} bg-opacity-80`}>
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="py-3 px-3 text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-3">
                    <button onClick={() => deleteContact(c._id)} className="text-red-400 hover:text-red-600 transition p-1">
                      <FiTrash2 size={14}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
