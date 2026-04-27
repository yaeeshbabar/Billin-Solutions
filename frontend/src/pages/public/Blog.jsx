import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiSearch, FiClock, FiCalendar, FiUser } from 'react-icons/fi'
import PageHero from '../../components/common/PageHero'
import CTABanner from '../../components/common/CTABanner'
import api from '../../utils/api'

const CATS = ['All', 'Medical Billing', 'Medical Coding', 'Revenue Cycle', 'Denial Management', 'Compliance']

// Unsplash images — free, no attribution required for demo
const BLOG_IMAGES = {
  'cpt-code-99204-billing-guidelines':       'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
  'modifier-95-telehealth-billing-guide':    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80',
  'cpt-code-99213-complete-guide':           'https://images.unsplash.com/photo-1631248055158-edec7a3c072b?w=600&q=80',
  'top-10-claim-denial-reasons-prevention':  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
  'hipaa-compliance-medical-billing':        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80',
  'revenue-cycle-management-complete-guide': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  'medical-billing-mistakes-costing-revenue':'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=600&q=80',
  'insurance-credentialing-guide':           'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&q=80',
}

export const FALLBACK_BLOGS = [
  {
    slug: 'cpt-code-99204-billing-guidelines',
    category: 'Medical Billing',
    title: 'CPT Code 99204: Complete Billing Guidelines & Documentation Requirements',
    excerpt: 'CPT code 99204 is one of the most billed — and most audited — new-patient office visit codes. Learn exact documentation thresholds, medical decision-making criteria, and how to avoid costly downcoding.',
    author: 'Billin Solutions Team',
    readTime: '8 min read',
    createdAt: '2025-04-10',
    tags: ['CPT 99204', 'E/M Coding', 'Office Visits', 'Medical Billing'],
  },
  {
    slug: 'modifier-95-telehealth-billing-guide',
    category: 'Medical Coding',
    title: 'Modifier 95 for Telehealth: The Ultimate Billing Guide for 2025',
    excerpt: 'Telehealth billing errors cost practices thousands in annual revenue. Master Modifier 95 — when to use it, when to use GT instead, and how to append it correctly to avoid claim denials.',
    author: 'Billin Solutions Team',
    readTime: '6 min read',
    createdAt: '2025-03-26',
    tags: ['Modifier 95', 'Telehealth', 'Remote Services', 'Medical Coding'],
  },
  {
    slug: 'cpt-code-99213-complete-guide',
    category: 'Medical Billing',
    title: 'CPT Code 99213: A Complete 2025 Billing & Documentation Guide',
    excerpt: 'CPT 99213 is the single most-used E/M code in outpatient medicine — and the most frequently audited. Get the documentation checklist, MDM requirements, and time-based billing rules.',
    author: 'Billin Solutions Team',
    readTime: '7 min read',
    createdAt: '2025-03-18',
    tags: ['CPT 99213', 'E/M Coding', 'Established Patients', 'Office Visits'],
  },
  {
    slug: 'top-10-claim-denial-reasons-prevention',
    category: 'Denial Management',
    title: 'Top 10 Reasons for Medical Claim Denials — and How to Prevent Each One',
    excerpt: 'Claim denials cost U.S. practices over $262 billion annually. Discover the 10 most common denial triggers in 2025, how to identify them in your revenue cycle, and concrete prevention strategies.',
    author: 'Billin Solutions Team',
    readTime: '10 min read',
    createdAt: '2025-02-20',
    tags: ['Claim Denials', 'Denial Management', 'Revenue Cycle', 'Billing Errors'],
  },
  {
    slug: 'hipaa-compliance-medical-billing',
    category: 'Compliance',
    title: 'HIPAA Compliance in Medical Billing: Everything Your Practice Needs to Know',
    excerpt: 'HIPAA violations can result in fines up to $1.9 million per violation category. This guide covers the Privacy Rule, Security Rule, and the specific billing workflows where practices are most at risk.',
    author: 'Billin Solutions Team',
    readTime: '9 min read',
    createdAt: '2025-01-15',
    tags: ['HIPAA', 'Compliance', 'PHI', 'Data Security'],
  },
  {
    slug: 'revenue-cycle-management-complete-guide',
    category: 'Revenue Cycle',
    title: 'Revenue Cycle Management in 2025: The Complete A-to-Z Guide',
    excerpt: 'RCM is the financial backbone of every healthcare practice. This comprehensive guide walks through all 10 stages — from patient registration to payment posting — with KPIs and benchmarks.',
    author: 'Billin Solutions Team',
    readTime: '12 min read',
    createdAt: '2025-01-05',
    tags: ['RCM', 'Revenue Cycle', 'Practice Management', 'Collections'],
  },
  {
    slug: 'medical-billing-mistakes-costing-revenue',
    category: 'Medical Billing',
    title: '7 Medical Billing Mistakes That Are Quietly Draining Your Practice Revenue',
    excerpt: 'Most billing leaks are invisible until a practice loses 15–30% of collectible revenue. Learn the 7 silent killers of billing efficiency and the simple fixes that recover lost dollars fast.',
    author: 'Billin Solutions Team',
    readTime: '7 min read',
    createdAt: '2024-12-10',
    tags: ['Billing Mistakes', 'Revenue Leakage', 'Practice Efficiency', 'Collections'],
  },
  {
    slug: 'insurance-credentialing-guide',
    category: 'Compliance',
    title: 'Insurance Credentialing: Step-by-Step Guide to Getting In-Network Faster',
    excerpt: 'Credentialing delays cost new providers $10,000–$30,000 in missed revenue. This guide gives you a provider credentialing checklist, typical timelines by payer, and tips to accelerate approval.',
    author: 'Billin Solutions Team',
    readTime: '8 min read',
    createdAt: '2024-11-20',
    tags: ['Credentialing', 'In-Network', 'Insurance', 'Provider Enrollment'],
  },
]

function BlogCard({ blog, featured = false }) {
  const img = BLOG_IMAGES[blog.slug] || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80'
  const fmtDate = d => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  if (featured) {
    return (
      <Link to={`/blog/${blog.slug}`}
        className="group relative overflow-hidden rounded-3xl shadow-green-lg block mb-12 hover:-translate-y-1 transition-transform duration-300">
        <div className="relative h-[420px] md:h-[480px] w-full overflow-hidden">
          <img src={img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{blog.category}</span>
            <span className="text-white/70 text-xs flex items-center gap-1"><FiClock size={11}/>{blog.readTime}</span>
          </div>
          <h2 className="text-white font-heading font-bold text-2xl md:text-3xl leading-tight mb-3 group-hover:text-accent-light transition-colors">{blog.title}</h2>
          <p className="text-white/75 text-sm leading-relaxed mb-4 max-w-2xl line-clamp-2">{blog.excerpt}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">B</div>
              <span className="text-white/80 text-xs">{blog.author}</span>
            </div>
            <span className="text-white/50 text-xs flex items-center gap-1"><FiCalendar size={11}/>{fmtDate(blog.createdAt)}</span>
            <span className="ml-auto text-accent-light text-sm font-semibold flex items-center gap-1">Read Article <FiArrowRight size={13}/></span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/blog/${blog.slug}`}
      className="group bg-white rounded-2xl shadow-md hover:shadow-green-lg border border-transparent hover:border-accent/20 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden">
        <img src={img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow">{blog.category}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1"><FiCalendar size={11}/>{fmtDate(blog.createdAt)}</span>
          <span className="flex items-center gap-1"><FiClock size={11}/>{blog.readTime}</span>
        </div>
        <h3 className="font-heading font-bold text-dark text-base leading-snug mb-2 group-hover:text-primary transition-colors flex-1">{blog.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-3 mb-4">{blog.excerpt}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-light rounded-full flex items-center justify-center text-primary text-xs font-bold">B</div>
            <span className="text-xs text-gray-400">{blog.author}</span>
          </div>
          <span className="text-primary text-xs font-semibold flex items-center gap-1">Read More <FiArrowRight size={11}/></span>
        </div>
      </div>
    </Link>
  )
}

export default function Blog() {
  const [blogs, setBlogs] = useState(FALLBACK_BLOGS)
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/blog').then(r => { if (r.data?.data?.length) setBlogs(r.data.data) }).catch(() => {})
  }, [])

  const filtered = blogs.filter(b =>
    (cat === 'All' || b.category === cat) &&
    (b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase()))
  )

  const [featured, ...rest] = filtered

  return (
    <>
      <PageHero
        title="Medical Billing Blog"
        subtitle="Expert insights, coding guides, compliance updates, and revenue cycle strategies to help your practice collect every dollar it's owed."
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <section className="py-16 px-4 bg-gray-bg">
        <div className="max-w-7xl mx-auto">

          {/* Search + Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {CATS.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${cat === c ? 'bg-primary text-white shadow-green' : 'bg-white text-gray-600 border border-gray-100 hover:border-primary/40 hover:text-primary'}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles…"
                className="input-field pl-9 w-64 text-xs py-2.5" />
            </div>
          </div>

          {/* Featured Post */}
          {featured && cat === 'All' && !search && <BlogCard blog={featured} featured />}

          {/* Blog Grid */}
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {(cat === 'All' && !search ? rest : filtered).map(b => (
                <BlogCard key={b.slug} blog={b} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-400 text-sm">No articles found. Try a different search or category.</p>
              <button onClick={() => { setCat('All'); setSearch('') }} className="btn-primary text-sm mt-4">Clear Filters</button>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">
            <span className="section-tag">Stay Informed</span>
            <h3 className="text-2xl font-heading font-bold text-dark mb-2">Get Billing Updates in Your Inbox</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">CPT code changes, payer policy updates, and expert billing tips — delivered free, every month.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
              <input type="email" placeholder="your@email.com" className="input-field text-sm py-3" />
              <button className="btn-primary text-sm py-3 whitespace-nowrap">Subscribe Free</button>
            </div>
            <p className="text-xs text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
          </div>

        </div>
      </section>
      <CTABanner />
    </>
  )
}