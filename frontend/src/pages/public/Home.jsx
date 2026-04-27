import { Link } from 'react-router-dom'
import {
  FiDollarSign, FiShield, FiCalendar, FiSearch, FiCheckCircle, FiUsers,
  FiBarChart2, FiAlertCircle, FiActivity, FiZap, FiHeart, FiHome,
  FiBriefcase, FiArrowRight, FiCheck, FiPhoneCall, FiStar
} from 'react-icons/fi'

import ContactForm from '../../components/common/ContactForm'
import StatCounter from '../../components/common/StatCounter'
import CTABanner from '../../components/common/CTABanner'

const SERVICES = [
  { Icon: FiDollarSign,  slug:'revenue-cycle-management', title:'Revenue Cycle Management',  desc:'End-to-end RCM services from patient registration to final payment collection and denial management.' },
  { Icon: FiShield,      slug:'insurance-credentialing',  title:'Insurance Credentialing',    desc:'Expand your payer network, grow your patient base and protect your market share nationwide.' },
  { Icon: FiCalendar,    slug:'front-office-management',  title:'Front Office Management',    desc:'Streamlined scheduling, eligibility checks, reminders and patient communication solutions.' },
  { Icon: FiSearch,      slug:'medical-billing-audit',    title:'Medical Billing Audit',      desc:'Identify errors, optimize processes and ensure regulatory compliance with detailed audit reports.' },
  { Icon: FiCheckCircle, slug:'eligibility-verification', title:'Eligibility Verification',   desc:'Real-time insurance verification before every visit to eliminate denials at the source.' },
  { Icon: FiUsers,       slug:'upfront-assistance',       title:'Upfront Assistance',         desc:'Patient financial counseling, cost estimates and payment plans to maximize point-of-service collections.' },
  { Icon: FiBarChart2,   slug:'accounts-receivable',      title:'AR Management',              desc:'Aggressive follow-up on unpaid claims and outstanding balances to accelerate cash flow.' },
  { Icon: FiAlertCircle, slug:'denial-management',        title:'Denial Management',          desc:'Proactive denial prevention and expert appeal handling to recover every dollar owed.' },
]

const SPECIALTIES = [
  { Icon: FiActivity,  slug:'mental-health-billing',    title:'Mental Health Billing' },
  { Icon: FiZap,       slug:'urgent-care-billing',      title:'Urgent Care Billing' },
  { Icon: FiHeart,     slug:'acupuncture-billing',      title:'Acupuncture Billing' },
  { Icon: FiActivity,  slug:'cardiology-billing',       title:'Cardiology Billing' },
  { Icon: FiHome,      slug:'hospitalist-billing',      title:'Hospitalist Billing' },
  { Icon: FiBriefcase, slug:'internal-medicine-billing', title:'Internal Medicine Billing' },
]

const TESTIMONIALS = [
  { name:'Dr. Zhenyu Zhou',      initials:'ZZ', text:'Very happy with the service. Reasonable rates, dedicated billing support, and proactive communication whenever issues arise. Highly recommend.' },
  { name:'Kevin Goeta-Kreisler', initials:'KG', text:'Excellent company to work with. The employees take a personal interest in doing the best job possible. Very pleased with their work.' },
  { name:'Tony Scroggins',       initials:'TS', text:'This is by far the best billing company I have used. Claims are filed promptly, communication is excellent, and fees are very reasonable.' },
  { name:'Wei S.',               initials:'WS', text:'Claims processed quickly, denials dropped significantly, and reimbursements come in faster than ever. Highly recommend for any provider.' },
  { name:'Peter Pajarito',       initials:'PP', text:'Absolute game-changer for our medical supply business. Excellent attention to detail, knowledge of DME billing codes, and insurance claims.' },
  { name:'Angela Brock',         initials:'AB', text:'My practice has been with Billin Solutions since 2023. They are wonderful to work with and always willing to help with any billing questions.' },
  { name:'Dr. Shasta Ericson',   initials:'SE', text:'Excellent billing company. Smart and competent staff. They keep us compliant and our collections have improved significantly since joining.' },
  { name:'Cobi Goldman',         initials:'CG', text:'Very knowledgeable, helpful and great communicators. Always on top of things and I never have to chase them for updates on my accounts.' },
]

const SOFTWARES = ['AdvancedMD','eClinicalWorks','Jane App','Kareo','Office Ally','Open PM','Practice Fusion','Therapy Notes','DrChrono','Athenahealth']

const STEPS = [
  { n:1, title:'Onboarding',   desc:'We gather your EHR access, payer credentials and practice details to begin quickly.' },
  { n:2, title:'Verification', desc:'Patient eligibility verified before every appointment to prevent denials.' },
  { n:3, title:'Coding',       desc:'Expert coders assign accurate ICD-10 and CPT codes to every encounter.' },
  { n:4, title:'Submission',   desc:'Clean claims submitted within 24 hours to all insurance payers.' },
  { n:5, title:'Collections',  desc:'Payments posted, denials appealed, and AR followed up aggressively.' },
]

const BLOG_IMGS = {
  'cpt-code-99204-billing-guidelines':       'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=75',
  'modifier-95-telehealth-billing-guide':    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=75',
  'cpt-code-99213-complete-guide':           'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75',
}

const BLOGS = [
  { slug:'cpt-code-99204-billing-guidelines',    cat:'Medical Billing', date:'Apr 10', title:'CPT Code 99204: Billing Guidelines and Best Practices',       excerpt:'CPT code 99204 is one of the most important new-patient office visit codes. Learn the correct documentation requirements.' },
  { slug:'modifier-95-telehealth-billing-guide', cat:'Medical Coding',  date:'Mar 26', title:'Modifier 95 Ultimate Guide: Description, Usage & Examples',   excerpt:'Telehealth billing requires the correct modifier. Master Modifier 95 and avoid costly claim denials.' },
  { slug:'cpt-code-99213-complete-guide',        cat:'Medical Billing', date:'Mar 18', title:'CPT Code 99213: A Complete Billing Guide',                    excerpt:'CPT code 99213 is one of the most frequently audited codes. This guide covers all documentation requirements.' },
]

const CLD = 'https://res.cloudinary.com/dmehhvk8y/image/upload/v1777241034'

const STATE_IMGS = [
  { name: 'Illinois',   img: `${CLD}/state-illinois.jpg` },
  { name: 'Indiana',    img: `${CLD}/state-indiana.jpg` },
  { name: 'California', img: `${CLD}/state-california.jpg` },
  { name: 'Kentucky',   img: `${CLD}/state-kentucky.jpg` },
  { name: 'New York',   img: `${CLD}/state-newyork.jpg` },
  { name: 'Washington', img: `${CLD}/state-washington.jpg` },
  { name: 'Georgia',    img: `${CLD}/state-georgia.jpg` },
  { name: 'Texas',      img: `${CLD}/state-texas.jpg` },
]

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary-dark to-primary text-white">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%"><pattern id="dots" width="36" height="36" patternUnits="userSpaceOnUse"><circle cx="18" cy="18" r="1.5" fill="white"/></pattern><rect width="100%" height="100%" fill="url(#dots)"/></svg>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl"/>
        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 grid md:grid-cols-2 gap-14 items-center relative z-10">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-green-200 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              <FiShield size={13}/> Trusted Medical Billing Company in USA
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-[1.1] mb-6">
              Professional<br/><span className="text-accent-light">Medical Billing</span><br/>Services in USA
            </h1>
            <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-xl">
              At Billin Solutions Medical Billing, we specialize in comprehensive, customized billing services that enhance your practice's financial performance and operational efficiency.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/request-free-demo" className="bg-white text-primary font-bold px-7 py-3 rounded-xl hover:bg-green-50 transition shadow-lg flex items-center gap-2">
                Talk To An Expert <FiArrowRight/>
              </Link>
              <Link to="/our-services" className="border border-white/30 text-white px-7 py-3 rounded-xl hover:bg-white/10 transition flex items-center gap-2">
                View Services
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[['99%','Clean Submission'],['100%','HIPAA Compliance'],['30%','Revenue Increase'],['100%','Client Satisfaction']].map(([v,l]) => (
                <div key={l} className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-heading font-extrabold text-accent-light">{v}</div>
                  <div className="text-xs text-green-200 mt-1 leading-tight">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div><ContactForm title="Request a Call Back" source="hero-form"/></div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 px-4 bg-gray-bg">
        <div className="max-w-7xl mx-auto text-center">
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title">Our Medical Billing Services</h2>
          <p className="section-sub mx-auto">We develop bespoke solutions tailored to every healthcare practice — from financial performance to streamlined operations.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {SERVICES.map(({ Icon, slug, title, desc }) => (
              <Link key={slug} to={`/service/${slug}`}
                className="card text-left group hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <Icon size={22} className="text-primary group-hover:text-white transition-colors"/>
                </div>
                <h3 className="font-heading font-bold text-dark mb-2 group-hover:text-primary transition text-base">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{desc}</p>
                <span className="text-primary text-xs font-semibold flex items-center gap-1">Learn More <FiArrowRight size={12}/></span>
              </Link>
            ))}
          </div>
          <Link to="/our-services" className="btn-outline">View All Services <FiArrowRight/></Link>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <CTABanner/>

      {/* ── SPECIALTIES ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="section-tag">Our Expertise</span>
          <h2 className="section-title">Our Specialities</h2>
          <p className="section-sub mx-auto">Our team has extensive experience across different medical specialties, ensuring accurate, fast, and compliant billing processes.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {SPECIALTIES.map(({ Icon, slug, title }) => (
              <Link key={slug} to={`/specialties/${slug}`}
                className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:border-accent/30 hover:shadow-green transition-all duration-300 group text-left">
                <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <Icon size={20} className="text-primary group-hover:text-white transition-colors"/>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-dark group-hover:text-primary transition text-sm">{title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Expert billing solutions →</p>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/our-specialties" className="btn-outline">View All Specialities <FiArrowRight/></Link>
        </div>
      </section>

      {/* ── STATES ── */}
      <section className="py-20 px-4 bg-gray-bg">
        <div className="max-w-7xl mx-auto text-center">
          <span className="section-tag">Nationwide Coverage</span>
          <h2 className="section-title">States We Serve</h2>
          <p className="section-sub mx-auto">Billin Solutions serves healthcare providers across all 50 US states with state-specific payer expertise.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
            {STATE_IMGS.map(s => (
              <Link key={s.name} to="/our-states"
                className="group relative overflow-hidden rounded-xl border border-gray-100 hover:border-accent/30 hover:shadow-green transition-all duration-300">
                <div className="h-20 overflow-hidden">
                  <img src={s.img} alt={s.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                </div>
                <div className="p-2 bg-white">
                  <span className="text-xs font-semibold text-dark block truncate">{s.name}</span>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/our-states" className="btn-outline">View All States <FiArrowRight/></Link>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter end={500} suffix="+" label="Active Clients"/>
          <StatCounter end={100} suffix="%" label="Client Satisfaction"/>
          <StatCounter end={30}  suffix="%" label="Revenue Increased"/>
          <StatCounter end={10}  suffix="+" label="Years Experience"/>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="section-tag">About Billin Solutions</span>
            <h2 className="section-title">RCM Medical Billing Company in USA</h2>
            <p className="text-gray-500 leading-relaxed mb-5">At Billin Solutions Medical Billing, we specialize in providing comprehensive Revenue Cycle Management (RCM) services to healthcare providers across the USA. Our goal is to streamline your billing processes, ensure regulatory compliance, and optimize revenue — letting you focus entirely on patient care.</p>
            <ul className="space-y-3 mb-8">
              {['Enhance Your Profitability through optimized billing workflows','Full-Service Medical Billing from registration to final payment','100% HIPAA Compliant processes and secure technology','Dedicated Account Manager for every single client','Expert Denial Management and Appeals handling'].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <FiCheck className="text-accent mt-0.5 flex-shrink-0" size={16}/> {f}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 flex-wrap">
              <Link to="/about-us" className="btn-primary">Learn More <FiArrowRight/></Link>
              <a href="tel:+12249996997" className="btn-outline"><FiPhoneCall/> Call Now</a>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary-light to-green-50 rounded-3xl p-8">
            <div className="grid grid-cols-2 gap-4">
              {[['99%','Clean Claim Rate'],['30%','Revenue Increase'],['24h','Claim Turnaround'],['500+','Happy Clients'],['100%','HIPAA Compliance'],['20+','Specialties Covered']].map(([v,l]) => (
                <div key={l} className="bg-white rounded-xl p-5 text-center shadow-sm border border-green-50">
                  <div className="text-2xl font-heading font-extrabold text-primary">{v}</div>
                  <div className="text-xs text-gray-500 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 px-4 bg-gray-bg">
        <div className="max-w-7xl mx-auto text-center">
          <span className="section-tag">How It Works</span>
          <h2 className="section-title">Our Simple 5-Step Process</h2>
          <p className="section-sub mx-auto">We make medical billing effortless with a streamlined, transparent process designed for your practice.</p>
          <div className="relative grid grid-cols-1 sm:grid-cols-5 gap-6 mt-12">
            <div className="hidden sm:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-accent-light to-primary"/>
            {STEPS.map((s,i) => (
              <div key={i} className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-heading font-extrabold text-xl border-4 border-white shadow-green z-10 relative">
                  {s.n}
                </div>
                <h4 className="font-heading font-bold text-dark mb-2 text-sm">{s.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOFTWARE TICKER ── */}
      <section className="py-14 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <span className="section-tag">Technology</span>
          <h2 className="section-title">Software We Use</h2>
        </div>
        <div className="flex overflow-hidden">
          <div className="ticker-track flex gap-6 whitespace-nowrap">
            {[...SOFTWARES, ...SOFTWARES].map((name, i) => (
              <div key={i} className="inline-flex items-center justify-center bg-white border border-gray-100 rounded-xl px-8 py-4 min-w-[160px] shadow-sm">
                <span className="font-heading font-bold text-dark text-sm">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4 bg-gray-bg">
        <div className="max-w-7xl mx-auto text-center">
          <span className="section-tag">Client Reviews</span>
          <h2 className="section-title">Our Clients Achieve Amazing Results</h2>
          <p className="section-sub mx-auto">Join 500+ healthcare providers who trust Billin Solutions Medical Billing.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="card text-left group">
                <div className="flex text-yellow-400 gap-0.5 mb-3">
                  {[...Array(5)].map((_,i) => <FiStar key={i} size={14} fill="currentColor"/>)}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-2 border-t border-gray-50 pt-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{t.initials}</div>
                  <span className="font-semibold text-dark text-xs">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="section-tag">Knowledge Hub</span>
          <h2 className="section-title">Our Latest Blogs</h2>
          <p className="section-sub mx-auto">Expert insights, coding guides and industry updates to help your practice thrive.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {BLOGS.map(b => (
              <Link key={b.slug} to={`/blog/${b.slug}`}
                className="card text-left group hover:-translate-y-1 duration-300 overflow-hidden p-0">
                <div className="relative h-44 overflow-hidden">
                  <img src={BLOG_IMGS[b.slug]} alt={b.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{b.cat}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-dark mb-2 text-sm leading-tight group-hover:text-primary transition">{b.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{b.excerpt}</p>
                  <span className="text-xs text-gray-400">{b.date}</span>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/blog" className="btn-outline">View More Blogs <FiArrowRight/></Link>
        </div>
      </section>

      <CTABanner title="Ready to Maximize Your Revenue?" sub="No Upfront Cost — Start Today" btn="Get a Free Demo"/>
    </>
  )
}