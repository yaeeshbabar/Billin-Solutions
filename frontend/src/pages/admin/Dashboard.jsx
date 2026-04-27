import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { FiMail, FiCalendar, FiFileText, FiBell, FiTrendingUp, FiUsers, FiEye, FiArrowRight } from 'react-icons/fi'
import api from '../../utils/api'

const COLORS = ['#1F6F5F', '#2FA084', '#6FCF97', '#c8a84b', '#ef4444']

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function Dashboard() {
  const [stats,  setStats]   = useState(null)
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    api.get('/stats')
      .then(r => setStats(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const monthlyData = stats?.monthlyTrend?.map(m => ({
    month: MONTHS[(m._id.month - 1)],
    contacts: m.count,
  })) || [
    { month:'Jan', contacts: 8 }, { month:'Feb', contacts: 12 },
    { month:'Mar', contacts: 18 }, { month:'Apr', contacts: 14 },
    { month:'May', contacts: 22 }, { month:'Jun', contacts: 28 },
  ]

  const statusData = stats?.contactsByStatus?.map(s => ({
    name: s._id, value: s.count
  })) || [
    { name:'new', value: 12 }, { name:'read', value: 8 },
    { name:'replied', value: 15 }, { name:'closed', value: 5 },
  ]

  const demoStatusData = stats?.demosByStatus?.map(s => ({
    name: s._id, value: s.count
  })) || [
    { name:'pending', value: 7 }, { name:'scheduled', value: 5 },
    { name:'completed', value: 12 }, { name:'cancelled', value: 2 },
  ]

  const kpiCards = [
    { label:'Total Contacts', value: stats?.totalContacts ?? 40, sub:`${stats?.newContacts ?? 5} new`, icon:<FiMail/>, color:'bg-blue-500', link:'/admin/contacts' },
    { label:'Demo Requests', value: stats?.totalDemos ?? 26, sub:`${stats?.pendingDemos ?? 7} pending`, icon:<FiCalendar/>, color:'bg-primary', link:'/admin/demos' },
    { label:'Blog Posts', value: stats?.totalBlogs ?? 6, sub:`${stats?.totalViews ?? 1300} total views`, icon:<FiFileText/>, color:'bg-purple-500', link:'/admin/blogs' },
    { label:'Active Popups', value: stats?.activePopups ?? 1, sub:'Running now', icon:<FiBell/>, color:'bg-gold', link:'/admin/popups' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-bold text-2xl text-dark">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back! Here's your Billin Solutions overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiCards.map(k => (
          <Link key={k.label} to={k.link} className="admin-card hover:shadow-green transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${k.color} rounded-xl flex items-center justify-center text-white text-xl`}>{k.icon}</div>
              <FiArrowRight className="text-gray-300 group-hover:text-primary transition" size={16} />
            </div>
            <div className="font-heading font-extrabold text-3xl text-dark mb-1">{k.value}</div>
            <div className="text-sm text-gray-500 font-medium">{k.label}</div>
            <div className="text-xs text-accent mt-1">{k.sub}</div>
          </Link>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Monthly trend */}
        <div className="admin-card lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-dark text-base">Monthly Contact Trend</h3>
            <FiTrendingUp className="text-accent" size={18} />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1F6F5F" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#1F6F5F" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="contacts" stroke="#1F6F5F" strokeWidth={2.5} fill="url(#colorContacts)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Contact status pie */}
        <div className="admin-card">
          <h3 className="font-heading font-bold text-dark text-base mb-5">Contact Status</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {statusData.map((s, i) => (
              <span key={s.name} className="flex items-center gap-1 text-xs text-gray-500">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }}/>
                {s.name} ({s.value})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Demo status + Recent */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Demo bar chart */}
        <div className="admin-card">
          <h3 className="font-heading font-bold text-dark text-base mb-5">Demo Requests by Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={demoStatusData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ borderRadius: 12 }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {demoStatusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent contacts */}
        <div className="admin-card lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-dark text-base">Recent Contacts</h3>
            <Link to="/admin/contacts" className="text-xs text-primary font-semibold hover:underline">View All →</Link>
          </div>
          <div className="space-y-3">
            {(stats?.recentContacts || [
              { name:'Dr. Smith', email:'smith@clinic.com', service:'Revenue Cycle Management', status:'new', createdAt: new Date() },
              { name:'Dr. Johnson', email:'johnson@care.com', service:'Insurance Credentialing', status:'read', createdAt: new Date() },
              { name:'Mary Wilson', email:'mwilson@health.com', service:'Medical Billing Audit', status:'replied', createdAt: new Date() },
            ]).map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-bg rounded-xl">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {c.name?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-dark text-sm truncate">{c.name}</p>
                  <p className="text-xs text-gray-400 truncate">{c.service}</p>
                </div>
                <span className={`badge badge-${c.status} flex-shrink-0`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent demos */}
      <div className="admin-card">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading font-bold text-dark text-base">Recent Demo Requests</h3>
          <Link to="/admin/demos" className="text-xs text-primary font-semibold hover:underline">View All →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100">
              {['Name','Email','Service','State','Specialty','Status','Date'].map(h => (
                <th key={h} className="text-left py-3 px-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {(stats?.recentDemos || [
                { name:'Dr. Chen', email:'chen@med.com', service:'RCM', state:'California', specialty:'Cardiology', status:'pending', createdAt: new Date() },
                { name:'Dr. Patel', email:'patel@care.com', service:'Credentialing', state:'Texas', specialty:'Internal Medicine', status:'scheduled', createdAt: new Date() },
              ]).map((d, i) => (
                <tr key={i} className="table-row">
                  <td className="py-3 px-2 font-medium text-dark">{d.name}</td>
                  <td className="py-3 px-2 text-gray-500 text-xs">{d.email}</td>
                  <td className="py-3 px-2 text-gray-600 text-xs">{d.service}</td>
                  <td className="py-3 px-2 text-gray-500 text-xs">{d.state}</td>
                  <td className="py-3 px-2 text-gray-500 text-xs">{d.specialty}</td>
                  <td className="py-3 px-2"><span className={`badge badge-${d.status}`}>{d.status}</span></td>
                  <td className="py-3 px-2 text-gray-400 text-xs">{new Date(d.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
