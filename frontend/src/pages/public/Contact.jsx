import { useState } from 'react'
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi'
import toast from 'react-hot-toast'
import PageHero from '../../components/common/PageHero'
import api from '../../utils/api'

const SERVICES = ['Revenue Cycle Management','Insurance Credentialing','Front Office Management','Medical Billing Audit','Eligibility Verification','Upfront Assistance']

export default function Contact() {
  const [form, setForm]     = useState({ name:'',phone:'',email:'',service:'',message:'',source:'contact-page' })
  const [loading,setLoading]= useState(false)
  const onChange = e => setForm(p=>({...p,[e.target.name]:e.target.value}))
  const onSubmit = async e => {
    e.preventDefault(); setLoading(true)
    try { await api.post('/contact', form); toast.success('Thank you! We will respond within 24 hours.'); setForm({name:'',phone:'',email:'',service:'',message:'',source:'contact-page'}) }
    catch { toast.error('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }
  return (
    <>
      <PageHero title="Contact Us" subtitle="Get in touch with our billing experts. We're here to help your practice succeed." breadcrumbs={[{label:'Contact Us'}]}/>
      <section className="py-20 px-4 bg-gradient-to-br from-dark to-primary-dark">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          <div className="text-white">
            <h2 className="text-3xl font-heading font-bold mb-4">Get In Touch</h2>
            <p className="text-green-200 text-sm leading-relaxed mb-8">Ready to optimize your medical billing? Our experts are standing by to help you maximize revenue.</p>
            <div className="space-y-5">
              {[
                { icon:<FiPhone className="text-accent"/>, title:'Phone', lines:[{text:'+1(443) 687-7049',href:'tel:+(4436877049'}] },
                { icon:<FiMail className="text-accent"/>,  title:'Email', lines:[{text:' billinsolutions@gmail.com',href:'mailto: billinsolutions@gmail.com'}] },
                { icon:<FiMapPin className="text-accent"/>, title:'Address', lines:[{text:'US Address: 1000 Main St Suite 2300,'},{text:'Houston, TX 77002, United States'}] },
                { icon:<FiClock className="text-accent"/>,  title:'Hours',   lines:[{text:'Mon–Fri: 9AM–6PM CST'},{text:'Saturday: 10AM–2PM CST'}] },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg">{item.icon}</div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                    {item.lines.map((l,i) => l.href
                      ? <a key={i} href={l.href} className="block text-green-200 text-sm hover:text-accent-light transition">{l.text}</a>
                      : <p key={i} className="text-green-200 text-sm">{l.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white/10 rounded-2xl p-5 border border-white/10">
              <h4 className="text-white font-bold text-sm mb-3">Why Contact Billin Solutions?</h4>
              <ul className="space-y-2">
                {['Free consultation — no obligation','Response within 24 hours','Rates as low as 2.49%','No upfront costs or contracts','Dedicated account manager assigned'].map(f=>(
                  <li key={f} className="text-green-200 text-xs flex items-center gap-2"><span className="text-accent-light">✓</span>{f}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-green-lg">
            <h3 className="font-heading font-bold text-xl text-dark mb-6">Send Us a Message</h3>
            <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-5">
              <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Full Name *</label><input name="name" value={form.name} onChange={onChange} required placeholder="Dr. John Smith" className="input-field"/></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Phone *</label><input name="phone" value={form.phone} onChange={onChange} required placeholder="+1 (xxx) xxx-xxxx" className="input-field"/></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email *</label><input name="email" type="email" value={form.email} onChange={onChange} required placeholder="you@practice.com" className="input-field"/></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Service *</label>
                <select name="service" value={form.service} onChange={onChange} required className="input-field">
                  <option value="">Choose a Service</option>
                  {SERVICES.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="md:col-span-2"><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Message</label><textarea name="message" value={form.message} onChange={onChange} rows={4} placeholder="Tell us about your practice and how we can help..." className="input-field resize-none"/></div>
              <div className="md:col-span-2">
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-60"><FiSend size={15}/>{loading?'Sending…':'Send Message'}</button>
                <p className="text-xs text-gray-400 text-center mt-2">By submitting, you consent to receive communications from Billin Solutions Medical Billing.</p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
