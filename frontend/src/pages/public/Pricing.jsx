import { Link } from 'react-router-dom'
import { FiCheck, FiX } from 'react-icons/fi'
import PageHero  from '../../components/common/PageHero'
import CTABanner from '../../components/common/CTABanner'

const PLANS = [
  { name:'Starter', rate:'2.49%', sub:'of monthly collections', desc:'Perfect for small practices outsourcing billing for the first time.', highlight:false,
    features:[['Claims Submission',true],['Payment Posting',true],['Basic Denial Management',true],['Monthly Reports',true],['Email Support',true],['Dedicated Account Manager',false],['Prior Authorization',false],['Insurance Credentialing',false]] },
  { name:'Professional', rate:'3.9%', sub:'of monthly collections', desc:'Most popular — comprehensive billing for growing practices.', highlight:true, badge:'Most Popular',
    features:[['Claims Submission',true],['Payment Posting',true],['Full Denial Management',true],['Weekly & Monthly Reports',true],['Phone & Email Support',true],['Dedicated Account Manager',true],['Prior Authorization',true],['Insurance Credentialing',false]] },
  { name:'Enterprise', rate:'Custom', sub:'tailored to your practice', desc:'Full-service RCM for large practices and multi-location groups.', highlight:false,
    features:[['Claims Submission',true],['Payment Posting',true],['Full Denial Management',true],['Custom Analytics Dashboard',true],['24/7 Priority Support',true],['Dedicated Account Manager',true],['Prior Authorization',true],['Insurance Credentialing',true]] },
]

const FAQS = [
  ['What is included in the billing rate?','Our rate covers the entire billing process — from claim creation and submission to payment posting, denial management, and AR follow-up. There are no hidden fees.'],
  ['Is there a setup fee or contract?','No upfront cost or setup fee. We offer month-to-month agreements with no long-term contracts — we earn your business every month.'],
  ['How do you calculate your percentage?','Our percentage is calculated on actual monthly collections received, not claims billed. This aligns our incentives with yours — we only succeed when you get paid.'],
  ['Can I switch plans later?','Yes, you can upgrade or change your plan at any time as your practice grows or your needs change.'],
  ['How quickly will I see results?','Most clients see measurable improvements within the first 30–60 days. Our onboarding is fast and we begin submitting claims immediately after setup.'],
  ['Do you offer a free consultation?','Yes! We offer a completely free consultation and demo so you can see exactly how we work before making any commitment.'],
]

export default function Pricing() {
  return (
    <>
      <PageHero title="Simple, Transparent Pricing" subtitle="No hidden fees. No upfront costs. Results-driven medical billing starting at 2.49%." breadcrumbs={[{label:'Pricing'}]}/>
      <section className="py-20 px-4 bg-gray-bg">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {PLANS.map(p => (
              <div key={p.name} className={`relative rounded-2xl p-8 flex flex-col ${p.highlight ? 'bg-gradient-to-br from-primary to-accent text-white shadow-green-lg scale-105' : 'bg-white shadow-sm border border-gray-100'}`}>
                {p.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-xs font-bold px-4 py-1 rounded-full">{p.badge}</span>}
                <div className={`font-heading font-bold text-xl mb-1 ${p.highlight?'text-white':'text-dark'}`}>{p.name}</div>
                <div className={`text-4xl font-heading font-extrabold ${p.highlight?'text-white':'text-primary'}`}>{p.rate}</div>
                <div className={`text-sm mb-2 ${p.highlight?'text-green-100':'text-gray-400'}`}>{p.sub}</div>
                <div className={`text-sm mb-6 pb-6 border-b ${p.highlight?'text-green-100 border-white/20':'text-gray-500 border-gray-100'}`}>{p.desc}</div>
                <ul className="space-y-3 flex-1 mb-8">
                  {p.features.map(([label, inc]) => (
                    <li key={label} className={`flex items-center gap-2 text-sm ${!inc?(p.highlight?'text-green-200/50':'text-gray-300'):''}`}>
                      {inc ? <FiCheck className={p.highlight?'text-green-200':'text-accent'} size={15}/> : <FiX className={p.highlight?'text-green-200/50':'text-gray-300'} size={15}/>}
                      {label}
                    </li>
                  ))}
                </ul>
                <Link to="/request-free-demo" className={`text-center py-3 rounded-xl font-bold transition text-sm ${p.highlight?'bg-white text-primary hover:bg-green-50':'bg-primary text-white hover:bg-primary-dark'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs mb-16">All plans include no upfront cost and no long-term contracts. Pricing based on actual collections received.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[['🚫','No Upfront Cost','Start immediately with zero setup fees'],['📉','Reduce Billing Errors','99% clean claim submission rate'],['⏱️','Timely Submission','Claims submitted within 24 hours'],['👤','Dedicated Manager','Personal account manager for your practice']].map(([ic,t,d])=>(
              <div key={t} className="text-center">
                <div className="text-4xl mb-2">{ic}</div>
                <h4 className="font-heading font-bold text-dark text-sm mb-1">{t}</h4>
                <p className="text-xs text-gray-500">{d}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-dark text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQS.map(([q,a]) => (
                <details key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="px-6 py-4 font-semibold text-dark cursor-pointer text-sm flex justify-between items-center list-none">
                    {q}<span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTABanner title="Start Saving on Medical Billing Today" sub="Rates as Low as 2.49% — No Upfront Cost" btn="Request Your Free Demo"/>
    </>
  )
}
