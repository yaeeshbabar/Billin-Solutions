import { useState, useEffect } from 'react'
import { FiSearch, FiTrash2, FiDownload, FiRefreshCw } from 'react-icons/fi'
import toast from 'react-hot-toast'
import api from '../../utils/api'

const STATUSES = ['pending','scheduled','completed','cancelled']

export default function AdminDemos() {
  const [demos,   setDemos]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [filter,  setFilter]  = useState('all')

  const load = () => {
    setLoading(true)
    api.get('/demo').then(r => setDemos(r.data.data)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/demo/${id}`, { status })
      setDemos(p => p.map(d => d._id === id ? { ...d, status } : d))
      toast.success('Status updated')
    } catch { toast.error('Failed to update') }
  }

  const deleteDemo = async id => {
    if (!confirm('Delete this demo request?')) return
    try {
      await api.delete(`/demo/${id}`)
      setDemos(p => p.filter(d => d._id !== id))
      toast.success('Deleted')
    } catch { toast.error('Failed to delete') }
  }

  const exportCSV = () => {
    const rows = [['Name','Email','Phone','Service','State','Specialty','Status','Date']]
    filtered.forEach(d => rows.push([d.name, d.email, d.phone, d.service, d.state, d.specialty, d.status, new Date(d.createdAt).toLocaleDateString()]))
    const csv = rows.map(r => r.join(',')).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = 'demo-requests.csv'
    a.click()
  }

  const counts = { all: demos.length, ...Object.fromEntries(STATUSES.map(s => [s, demos.filter(d => d.status === s).length])) }

  const filtered = demos.filter(d =>
    (filter === 'all' || d.status === filter) &&
    (d.name?.toLowerCase().includes(search.toLowerCase()) ||
     d.email?.toLowerCase().includes(search.toLowerCase()) ||
     d.specialty?.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl text-dark">Demo Requests</h1>
          <p className="text-gray-400 text-sm">{demos.length} total requests</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="btn-outline text-sm py-2 px-4"><FiRefreshCw size={14}/> Refresh</button>
          <button onClick={exportCSV} className="btn-primary text-sm py-2 px-4"><FiDownload size={14}/> Export CSV</button>
        </div>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { key:'pending',   label:'Pending',   color:'bg-yellow-50 border-yellow-200 text-yellow-700' },
          { key:'scheduled', label:'Scheduled', color:'bg-blue-50 border-blue-200 text-blue-700' },
          { key:'completed', label:'Completed', color:'bg-green-50 border-green-200 text-green-700' },
          { key:'cancelled', label:'Cancelled', color:'bg-red-50 border-red-200 text-red-600' },
        ].map(s => (
          <div key={s.key} className={`rounded-xl p-4 border ${s.color} cursor-pointer`} onClick={() => setFilter(s.key)}>
            <div className="text-2xl font-heading font-extrabold">{counts[s.key] || 0}</div>
            <div className="text-xs font-semibold mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15}/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email or specialty…"
            className="input-field pl-9 text-sm"/>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', ...STATUSES].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition ${filter === s ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-100 hover:border-primary/30'}`}>
              {s} {counts[s] !== undefined ? `(${counts[s]})` : ''}
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
            <div className="text-4xl mb-3">📅</div>
            <p className="text-gray-400 text-sm">No demo requests found</p>
          </div>
        ) : (
          <table className="w-full text-sm min-w-[800px]">
            <thead><tr className="border-b border-gray-100">
              {['Name','Contact','Service','State','Specialty','Status','Date','Action'].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs text-gray-400 font-semibold uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d._id} className="table-row">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{d.name?.[0]}</div>
                      <span className="font-medium text-dark text-xs">{d.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <p className="text-xs text-gray-600">{d.email}</p>
                    <p className="text-xs text-gray-400">{d.phone}</p>
                  </td>
                  <td className="py-3 px-3 text-xs text-gray-600 max-w-[120px] truncate">{d.service}</td>
                  <td className="py-3 px-3 text-xs text-gray-400">{d.state || '—'}</td>
                  <td className="py-3 px-3 text-xs text-gray-400">{d.specialty || '—'}</td>
                  <td className="py-3 px-3">
                    <select value={d.status} onChange={e => updateStatus(d._id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-lg border font-semibold cursor-pointer badge badge-${d.status}`}>
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="py-3 px-3 text-xs text-gray-400">{new Date(d.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-3">
                    <button onClick={() => deleteDemo(d._id)} className="text-red-400 hover:text-red-600 transition p-1">
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
