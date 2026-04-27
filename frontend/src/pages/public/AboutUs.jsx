import { FiTarget, FiLock, FiUsers, FiTrendingUp, FiZap, FiGlobe } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { FiCheck, FiArrowRight, FiPhoneCall } from 'react-icons/fi'
import PageHero   from '../../components/common/PageHero'
import StatCounter from '../../components/common/StatCounter'
import CTABanner  from '../../components/common/CTABanner'


const VALUES = [
  { Icon: FiTarget,     title:'Accuracy First',    desc:'99% clean claim submission rate — minimizing denials and maximizing collections.' },
  { Icon: FiLock,       title:'HIPAA Compliance',  desc:'100% compliant processes to protect patient data and your practice reputation.' },
  { Icon: FiUsers,      title:'Dedicated Support', desc:'Every client gets a personal account manager who knows your practice inside-out.' },
  { Icon: FiTrendingUp, title:'Revenue Growth',    desc:'Clients see an average 30% revenue increase within the first 90 days.' },
  { Icon: FiZap,        title:'Fast Turnaround',   desc:'Claims submitted within 24 hours. Faster submission means faster payment.' },
  { Icon: FiGlobe,      title:'Nationwide Reach',  desc:'We serve healthcare providers across all 50 states with local payer expertise.' },
]
const TEAM = [
  { name:'Austin Williams', role:'Lead Billing Specialist',  initials:'AW' },
  { name:'Sarah Johnson',   role:'RCM Director',             initials:'SJ' },
  { name:'Michael Chen',    role:'Insurance Credentialing',  initials:'MC' },
  { name:'Lisa Rodriguez',  role:'Compliance & Audit Lead',  initials:'LR' },
]

export default function AboutUs() {
  return (
    <>
      <PageHero
        title="About Billin Solutions"
        subtitle="A trusted medical billing partner for healthcare providers across the USA — dedicated to optimizing your revenue cycle."
        breadcrumbs={[{ label:'About Us' }]}
      />

      {/* Mission */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="section-tag">Who We Are</span>
            <h2 className="section-title">Your Trusted Medical Billing Partner</h2>
            <p className="text-gray-500 leading-relaxed mb-4">Billin Solutions Medical Billing was founded with a clear mission: remove the administrative burden of billing from healthcare providers so they can focus entirely on patient care.</p>
            <p className="text-gray-500 leading-relaxed mb-6">With over 10 years of Revenue Cycle Management experience, our expert team understands the complexities of healthcare billing. We serve providers across the USA with customized solutions tailored to each specialty and practice size.</p>
            <ul className="space-y-3 mb-8">
              {['Expert team with 10+ years of RCM experience','Serving 500+ healthcare providers nationwide','Supporting 20+ medical specialties','Coverage across all 50 US states','100% HIPAA-compliant technology and processes','No upfront cost — no long-term contracts'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <FiCheck className="text-accent flex-shrink-0" size={16}/> {f}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 flex-wrap">
              <Link to="/request-free-demo" className="btn-primary">Get a Free Demo <FiArrowRight/></Link>
              <a href="tel:+12249996997" className="btn-outline"><FiPhoneCall/> Call Us</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {VALUES.map(v => (
              <div key={v.title} className="card border border-green-50 hover:border-accent/20">
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center mb-3">
  <v.Icon size={18} className="text-primary"/>
</div>
                <h4 className="font-heading font-bold text-dark mb-1 text-sm">{v.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter end={500} suffix="+" label="Active Clients"/>
          <StatCounter end={100} suffix="%" label="Customer Satisfaction"/>
          <StatCounter end={30}  suffix="%" label="Revenue Increased"/>
          <StatCounter end={10}  suffix="+" label="Years Experience"/>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-gray-bg">
        <div className="max-w-7xl mx-auto text-center">
          <span className="section-tag">Our People</span>
          <h2 className="section-title">Meet Our Expert Team</h2>
          <p className="section-sub mx-auto">Our specialists bring deep expertise in medical billing, coding, and compliance.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map(m => (
              <div key={m.name} className="card text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-heading font-bold text-2xl mx-auto mb-4">{m.initials}</div>
                <h4 className="font-heading font-bold text-dark">{m.name}</h4>
                <p className="text-sm text-accent mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title="Ready to Partner with Billin Solutions?" sub="Free consultation — no commitment required"/>
    </>
  )
}
