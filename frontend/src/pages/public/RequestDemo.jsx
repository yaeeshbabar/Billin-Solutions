import { useState, useEffect } from 'react' // CHANGE: added useEffect for rotating comments
import { FiCheck, FiSend, FiPhone } from 'react-icons/fi'
import toast from 'react-hot-toast'
import PageHero from '../../components/common/PageHero'
import api from '../../utils/api'

const SERVICES  = ['Revenue Cycle Management','Insurance Credentialing','Upfront Assistance Services','Front Office Management','Medical Billing Audit','Eligibility Verification']
const US_STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
const SPECS     = ['Acupuncture','Cardiology','Dermatology','Family Medicine','Gastroenterology','General Surgery','Hospitalist','Internal Medicine','Mental Health','Neurology','OB/GYN','Ophthalmology','Orthopedics','Pediatrics','Physical Therapy','Psychiatry','Pulmonology','Radiology','Urology','Urgent Care','Other']

// CHANGE: testimonial comments that rotate
const COMMENTS = [
  {
    text: "Working with Billin Solutions has been an absolute game-changer for our practice. Their billing accuracy improved our collections dramatically.",
    author: "— Peter Pajarito, Healthcare Provider"
  },
  {
    text: "Our claim denials dropped significantly after partnering with Billin Solutions. Their team truly understands medical billing.",
    author: "— Dr. Melissa Carter"
  },
  {
    text: "We finally have predictable cash flow. The reporting and support from their team is outstanding.",
    author: "— Dr. Andrew Lee"
  },
  {
    text: "Their credentialing and billing services saved us countless hours every week.",
    author: "— Dr. Sarah Thompson"
  },
  {
    text: "Professional, responsive, and extremely knowledgeable about insurance processes.",
    author: "— Dr. Michael Rivera"
  }
]

export default function RequestDemo() {
  const [form,setForm]       = useState({name:'',phone:'',email:'',service:'',state:'',specialty:''})
  const [submitted,setSubmit]= useState(false)
  const [loading,setLoading] = useState(false)

  // CHANGE: state to track current comment
  const [commentIndex,setCommentIndex] = useState(0)

  // CHANGE: rotate comment every 2 seconds
  useEffect(()=>{
    const interval = setInterval(()=>{
      setCommentIndex(prev => (prev + 1) % COMMENTS.length)
    },2000)
    return ()=> clearInterval(interval)
  },[])

  const onChange = e => setForm(p=>({...p,[e.target.name]:e.target.value}))
  const onSubmit = async e => {
    e.preventDefault(); setLoading(true)
    try { await api.post('/demo', form); setSubmit(true) }
    catch { toast.error('Something went wrong. Please call us directly.') }
    finally { setLoading(false) }
  }

  return (
    <>
      <PageHero title="Request a Free Demo" subtitle="See how Billin Solutions can transform your practice's revenue cycle. No obligation, no upfront cost." breadcrumbs={[{label:'Request Demo'}]}/>
      <section className="py-20 px-4 bg-gray-bg">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="section-tag">Why Book a Demo?</span>
            <h2 className="section-title">Discover How We Boost Your Revenue</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">During your free demo, our billing experts will walk you through our processes, answer your questions, and show you exactly how we can improve your practice's financial performance — with no pressure and no commitment.</p>

            <div className="space-y-4 mb-8">
              {[
                ['🎯','Personalized Walkthrough','See our platform and processes tailored to your specialty and practice size.'],
                ['📊','Revenue Analysis',"We'll identify opportunities to increase collections and reduce denials immediately."],
                ['❓','Q&A with Experts','Ask our billing specialists anything about your current challenges and pain points.'],
                ['💡','Custom Proposal',"You'll receive a customized pricing proposal specific to your practice's needs."],
              ].map(([ic,t,d])=>(
                <div key={t} className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <span className="text-2xl">{ic}</span>
                  <div>
                    <h4 className="font-semibold text-dark text-sm">{t}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CHANGE: rotating testimonial with smooth transition */}
            <div className="bg-dark rounded-2xl p-6 text-white">
              <div className="flex text-yellow-400 gap-0.5 mb-3">{'★★★★★'}</div>

              <p
                key={commentIndex}
                className="text-green-100 text-sm italic leading-relaxed mb-3 transition-opacity duration-700 ease-in-out"
              >
                "{COMMENTS[commentIndex].text}"
              </p>

              <p className="text-white font-semibold text-sm">
                {COMMENTS[commentIndex].author}
              </p>
            </div>

          </div>

          <div>
            {submitted ? (
              <div className="bg-white rounded-3xl shadow-green-lg p-10 text-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheck className="text-accent" size={40}/>
                </div>
                <h3 className="text-2xl font-heading font-bold text-dark mb-3">Demo Request Submitted!</h3>
                <p className="text-gray-500 text-sm mb-2">Thank you for your interest in Billin Solutions Medical Billing.</p>
                <p className="text-gray-500 text-sm">One of our billing experts will contact you within <strong>24 hours</strong> to schedule your personalized demo.</p>

                <div className="mt-8 p-4 bg-gray-bg rounded-xl">
                  <p className="font-semibold text-dark text-sm mb-1">Need immediate assistance?</p>
                  <a href="tel:+12249996997" className="text-primary font-bold hover:underline flex items-center justify-center gap-2">
                    <FiPhone/>+1 (224) 999-6997
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-green-lg p-8">
                <h3 className="font-heading font-bold text-xl text-dark mb-2">Schedule Your Free Consultation</h3>
                <p className="text-gray-400 text-sm mb-6">Fill out the form and we'll be in touch within 24 hours.</p>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Full Name *</label>
                      <input name="name" value={form.name} onChange={onChange} required placeholder="Dr. Jane Doe" className="input-field text-sm"/>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Phone *</label>
                      <input name="phone" value={form.phone} onChange={onChange} required placeholder="+1 (xxx) xxx-xxxx" className="input-field text-sm"/>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="you@practice.com" className="input-field text-sm"/>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Service *</label>
                    <select name="service" value={form.service} onChange={onChange} required className="input-field text-sm">
                      <option value="">Select a Service</option>
                      {SERVICES.map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">State</label>
                      <select name="state" value={form.state} onChange={onChange} className="input-field text-sm">
                        <option value="">Select State</option>
                        {US_STATES.map(s=><option key={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Specialty</label>
                      <select name="specialty" value={form.specialty} onChange={onChange} className="input-field text-sm">
                        <option value="">Select Specialty</option>
                        {SPECS.map(s=><option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-60 text-sm">
                    <FiSend size={15}/>{loading?'Submitting…':'Request Free Demo'}
                  </button>

                  <p className="text-xs text-gray-400 text-center">No obligation. No upfront cost. Cancel anytime.</p>
                </form>

              </div>
            )}
          </div>

        </div>
      </section>
    </>
  )
}