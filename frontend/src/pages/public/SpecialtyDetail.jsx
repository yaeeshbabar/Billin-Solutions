import { useParams, Link } from 'react-router-dom'
import { FiCheck, FiArrowRight, FiPhone, FiActivity } from 'react-icons/fi'
import PageHero   from '../../components/common/PageHero'
import ContactForm from '../../components/common/ContactForm'
import CTABanner  from '../../components/common/CTABanner'

const DATA = {
  'acupuncture-billing':{ icon:'🧘', title:'Acupuncture Billing Services', sub:'Streamlined billing for acupuncture practices to ensure timely and accurate reimbursements.', desc:'Acupuncture billing comes with unique challenges — from navigating payer-specific coverage policies to correctly applying acupuncture CPT codes. Many insurers have strict criteria for coverage, and even small errors can result in denied claims.\n\nAt Billin Solutions, our specialists are well-versed in acupuncture-specific billing requirements, helping your practice maximize reimbursements while staying fully compliant with all payer guidelines.', features:['Acupuncture CPT Code Expertise','Payer Policy Management','Prior Authorization Handling','Denial Management & Appeals','Eligibility Verification','HIPAA-Compliant Processes','Documentation Review','Appeals Processing'], benefits:['Reduce claim denials significantly','Faster insurance reimbursements','Increased net collections','Less administrative burden','Stay payer-policy compliant','Focus on patient care'] },
  'mental-health-billing':{ icon:'🧠', title:'Mental Health Billing Services', sub:'Comprehensive billing tailored for mental health professionals to maximize revenue.', desc:'Mental health billing involves complex coding for psychotherapy sessions, psychiatric evaluations, and medication management. With the rise of telehealth and changing parity laws, mental health providers face an increasingly complex billing environment.\n\nOur team understands the nuances of mental health billing including session time-based coding, place of service requirements, and telehealth billing rules — ensuring accurate claim submission and proactive denial management.', features:['Psychotherapy Code Expertise','Telehealth Billing','Time-Based Coding','Mental Health Parity Compliance','Prior Authorization','Eligibility Verification','Denial Management','Session Documentation Support'], benefits:['Maximize insurance reimbursements','Reduce billing errors','Telehealth billing expertise','Faster payment cycles','Parity law compliance','Reduced administrative load'] },
  'urgent-care-billing':{ icon:'🚑', title:'Urgent Care Billing Services', sub:'Efficient billing management for urgent care centers to optimize cash flow.', desc:'Urgent care centers see high patient volumes with a wide variety of conditions and procedures, making billing complex and time-sensitive. Accurate coding of E&M levels, procedures, and ancillary services is critical to capturing full revenue.\n\nOur urgent care billing specialists are experienced in high-volume billing environments and understand the specific coding and documentation requirements of urgent care settings.', features:['E&M Level Coding','High-Volume Processing','Rapid Claim Submission','Procedure Code Accuracy','Lab & X-ray Billing','Denial Prevention','AR Management','Real-time Reporting'], benefits:['Optimize cash flow','Minimize claim denials','Faster reimbursements','Accurate E&M coding','Handle high patient volumes','Improved AR days'] },
  'cardiology-billing':{ icon:'❤️', title:'Cardiology Billing Services', sub:'Expert cardiology billing solutions for complex procedures and proper reimbursement.', desc:'Cardiology is one of the most complex specialties in medical billing. From interpreting EKGs and echocardiograms to billing for interventional procedures and cardiac catheterizations, the coding requirements are intricate and highly specific.\n\nOur cardiology billing team has deep expertise in cardiovascular CPT codes, global periods, component billing, and bundling rules — ensuring every service is captured and coded correctly.', features:['Cardiovascular CPT Expertise','Interventional Procedure Billing','EKG & Echo Billing','Global Period Management','Component Billing','Prior Authorization','Modifier Application','Cardiac Rehab Billing'], benefits:['Accurate complex procedure coding','Maximize procedure reimbursements','Reduce underpayments','Global period compliance','Bundling rule expertise','Faster payment cycles'] },
  'hospitalist-billing':{ icon:'🏨', title:'Hospitalist Billing Services', sub:'Reliable billing support for hospitalists improving financial performance.', desc:'Hospitalist billing requires expertise in inpatient evaluation and management coding, critical care services, and discharge services. With multiple daily visits and complex medical decision-making, accurate documentation and coding are essential.\n\nOur hospitalist billing team understands the daily workflow of hospital medicine including initial hospital care, subsequent visits, consultations, and discharge day management.', features:['Inpatient E&M Coding','Critical Care Billing','Discharge Day Management','Consultation Coding','Procedure Billing','MDM Documentation Review','Compliance Monitoring','Denial Management'], benefits:['Capture all billable services','Accurate MDM coding','Critical care expertise','Reduce compliance risks','Faster collections','Improved AR management'] },
  'internal-medicine-billing':{ icon:'💊', title:'Internal Medicine Billing Services', sub:'Specialized billing to enhance accuracy and expedite payment cycles.', desc:'Internal medicine practices manage complex, chronic conditions requiring detailed documentation and accurate E&M level selection. From annual wellness visits to chronic disease management, every service must be properly coded.\n\nOur internal medicine billing specialists understand the breadth of services provided in primary care settings and ensure comprehensive charge capture, accurate coding, and timely claim submission.', features:['E&M Level Selection','Chronic Care Management Billing','Annual Wellness Visit Coding','Preventive Services Billing','Transitional Care Management','Telehealth Billing','Quality Measure Reporting','Compliance Monitoring'], benefits:['Maximize E&M reimbursements','Capture preventive service revenue','Chronic care management billing','Telehealth billing expertise','Reduce coding errors','Improve collection rates'] },
}

const DEFAULT = { icon:'🏥', title:'Specialty Billing Services', sub:'Expert billing solutions tailored to your medical specialty.', desc:'At Billin Solutions Medical Billing, we provide specialized billing services for your specialty. Our experienced team understands the unique coding and compliance requirements, ensuring accurate claim submission and maximum reimbursements.\n\nWe handle all aspects of the billing process, from eligibility verification and charge capture to claim submission, payment posting, and denial management.', features:['Specialty-Specific Coding','Prior Authorization','Eligibility Verification','Claim Submission','Payment Posting','Denial Management','AR Follow-up','Compliance Monitoring'], benefits:['Maximize specialty reimbursements','Reduce claim denials','Faster payment cycles','Specialty compliance expertise','Reduce administrative burden','Dedicated account manager'] }

export default function SpecialtyDetail() {
  const { slug } = useParams()
  const s = DATA[slug] || { ...DEFAULT, title: slug?.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()) + ' Billing Services' }

  return (
    <>
      <PageHero title={s.title} subtitle={s.sub} breadcrumbs={[{ label:'Specialities', to:'/our-specialties' }, { label:s.title }]}/>
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
      <div className="inline-flex items-center gap-2 bg-primary-light text-primary text-sm font-bold px-4 py-2 rounded-xl mb-6">
  <FiActivity size={16}/> {s.title}
</div>
            {s.desc.split('\n\n').map((p,i) => <p key={i} className="text-gray-500 leading-relaxed mb-4 text-sm">{p}</p>)}
            <div className="grid md:grid-cols-2 gap-6 mt-8 mb-10">
              <div className="bg-gray-bg rounded-2xl p-6">
                <h3 className="font-heading font-bold text-dark mb-4 text-base">Our Services Include</h3>
                <ul className="space-y-2.5">
                  {s.features.map(f => <li key={f} className="flex items-start gap-2 text-sm text-gray-600"><FiCheck className="text-accent mt-0.5 flex-shrink-0" size={14}/>{f}</li>)}
                </ul>
              </div>
              <div className="bg-primary-light rounded-2xl p-6">
                <h3 className="font-heading font-bold text-dark mb-4 text-base">Key Benefits</h3>
                <ul className="space-y-2.5">
                  {s.benefits.map(b => <li key={b} className="flex items-start gap-2 text-sm text-gray-600"><span className="text-primary mt-0.5 flex-shrink-0">→</span>{b}</li>)}
                </ul>
              </div>
            </div>
            <Link to="/request-free-demo" className="btn-primary">Get Started Today <FiArrowRight/></Link>
          </div>
          <div className="space-y-6">
            <ContactForm title="Request a Callback" source="specialty-page"/>
            <div className="bg-dark rounded-2xl p-6 text-white text-center">
              <p className="text-green-300 text-xs mb-1 font-semibold uppercase tracking-wide">Call Us Directly</p>
              <a href="tel:+12249996997" className="font-heading font-bold text-xl hover:text-accent transition flex items-center justify-center gap-2"><FiPhone/>+1 (224) 999-6997</a>
            </div>
          </div>
        </div>
      </section>
      <CTABanner/>
    </>
  )
}
