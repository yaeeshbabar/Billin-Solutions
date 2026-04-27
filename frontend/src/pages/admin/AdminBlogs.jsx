import { useState, useEffect } from 'react'
import { FiPlus, FiTrash2, FiEdit2, FiRefreshCw, FiEye } from 'react-icons/fi'
import toast from 'react-hot-toast'
import api from '../../utils/api'

const CATS = ['Medical Billing','Medical Coding','Revenue Cycle','Denial Management','Compliance','Insurance']
const EMPTY = { title:'', slug:'', category:'', excerpt:'', content:'', author:'Billin Solutions Team', tags:'', published:true }

export default function AdminBlogs() {
  const [blogs,   setBlogs]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(false)
  const [editing, setEditing] = useState(null)
  const [form,    setForm]    = useState(EMPTY)
  const [saving,  setSaving]  = useState(false)

  const load = () => {
    setLoading(true)
    api.get('/blog').then(r => setBlogs(r.data.data)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModal(true) }
  const openEdit   = b => { setEditing(b._id); setForm({ ...b, tags: b.tags?.join(', ') || '' }); setModal(true) }
  const closeModal = () => { setModal(false); setEditing(null); setForm(EMPTY) }

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const autoSlug = title => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const onSubmit = async e => {
    e.preventDefault()
    setSaving(true)
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }
    if (!payload.slug) payload.slug = autoSlug(payload.title)
    try {
      if (editing) {
        const r = await api.put(`/blog/${editing}`, payload)
        setBlogs(p => p.map(b => b._id === editing ? r.data.data : b))
        toast.success('Blog updated')
      } else {
        const r = await api.post('/blog', payload)
        setBlogs(p => [r.data.data, ...p])
        toast.success('Blog created')
      }
      closeModal()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save')
    } finally { setSaving(false) }
  }

  const deleteBlog = async id => {
    if (!confirm('Delete this blog post?')) return
    try {
      await api.delete(`/blog/${id}`)
      setBlogs(p => p.filter(b => b._id !== id))
      toast.success('Deleted')
    } catch { toast.error('Failed to delete') }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl text-dark">Blog Posts</h1>
          <p className="text-gray-400 text-sm">{blogs.length} published posts</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="btn-outline text-sm py-2 px-4"><FiRefreshCw size={14}/> Refresh</button>
          <button onClick={openCreate} className="btn-primary text-sm py-2 px-4"><FiPlus size={14}/> New Post</button>
        </div>
      </div>

      <div className="admin-card overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"/>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">📝</div>
            <p className="text-gray-400 text-sm mb-4">No blog posts yet</p>
            <button onClick={openCreate} className="btn-primary text-sm"><FiPlus size={14}/> Create First Post</button>
          </div>
        ) : (
          <table className="w-full text-sm min-w-[700px]">
            <thead><tr className="border-b border-gray-100">
              {['Title','Category','Views','Status','Date','Actions'].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs text-gray-400 font-semibold uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {blogs.map(b => (
                <tr key={b._id} className="table-row">
                  <td className="py-3 px-3">
                    <p className="font-medium text-dark text-xs line-clamp-1 max-w-[220px]">{b.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{b.author}</p>
                  </td>
                  <td className="py-3 px-3"><span className="bg-primary-light text-primary text-xs px-2 py-0.5 rounded-full font-medium">{b.category}</span></td>
                  <td className="py-3 px-3 text-xs text-gray-500"><span className="flex items-center gap-1"><FiEye size={11}/>{b.views || 0}</span></td>
                  <td className="py-3 px-3">
                    <span className={`badge ${b.published ? 'badge-replied' : 'badge-closed'}`}>{b.published ? 'Published' : 'Draft'}</span>
                  </td>
                  <td className="py-3 px-3 text-xs text-gray-400">{new Date(b.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(b)} className="text-primary hover:text-primary-dark transition p-1"><FiEdit2 size={14}/></button>
                      <button onClick={() => deleteBlog(b._id)} className="text-red-400 hover:text-red-600 transition p-1"><FiTrash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl z-10">
              <h2 className="font-heading font-bold text-lg text-dark">{editing ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <form onSubmit={onSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Title *</label>
                <input name="title" value={form.title} onChange={e => { onChange(e); if (!editing) setForm(p => ({ ...p, slug: autoSlug(e.target.value) })) }}
                  required placeholder="Blog post title" className="input-field text-sm"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Slug *</label>
                  <input name="slug" value={form.slug} onChange={onChange} required placeholder="url-friendly-slug" className="input-field text-sm"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Category *</label>
                  <select name="category" value={form.category} onChange={onChange} required className="input-field text-sm">
                    <option value="">Select category</option>
                    {CATS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Author</label>
                <input name="author" value={form.author} onChange={onChange} placeholder="Author name" className="input-field text-sm"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Excerpt *</label>
                <textarea name="excerpt" value={form.excerpt} onChange={onChange} required rows={2}
                  placeholder="Short description shown in blog listing" className="input-field text-sm resize-none"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Content *</label>
                <textarea name="content" value={form.content} onChange={onChange} required rows={6}
                  placeholder="Full blog post content (use blank lines to separate paragraphs)" className="input-field text-sm resize-none"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Tags (comma-separated)</label>
                <input name="tags" value={form.tags} onChange={onChange} placeholder="CPT Codes, Billing Tips, E&M" className="input-field text-sm"/>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="published" name="published" checked={form.published} onChange={onChange} className="w-4 h-4 accent-primary"/>
                <label htmlFor="published" className="text-sm text-gray-600 font-medium">Published (visible on website)</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center disabled:opacity-60">
                  {saving ? 'Saving…' : (editing ? 'Update Post' : 'Create Post')}
                </button>
                <button type="button" onClick={closeModal} className="btn-outline px-6">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
