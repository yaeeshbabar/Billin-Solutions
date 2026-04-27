import { useParams, Link } from 'react-router-dom'
import { FiCheck, FiArrowRight, FiPhone, FiCheckCircle } from 'react-icons/fi'
import PageHero   from '../../components/common/PageHero'
import ContactForm from '../../components/common/ContactForm'
import CTABanner  from '../../components/common/CTABanner'
const DATA = {
  'revenue-cycle-management': {
    icon:'💰', title:'Revenue Cycle Management Services',
    sub:'End-to-end RCM solutions that maximize revenue and minimize administrative burden.',
    desc:`Revenue Cycle Management (RCM) is the financial process that healthcare facilities use to track patient care episodes from registration and appointment scheduling to the final payment. At Billin Solutions, we provide comprehensive RCM services ensuring every step is optimized for maximum revenue.\n\nOur expert team handles everything from verifying patient insurance eligibility before appointments to submitting clean claims, posting payments, managing denials, and following up on unpaid accounts. We leverage advanced technology and deep industry expertise to keep your revenue cycle running efficiently.`,
    features:['Patient Registration & Eligibility Verification','Charge Capture & Coding Review','Clean Claims Submission','Payment Posting & Reconciliation','Denial Management & Appeals','Accounts Receivable Follow-up','Patient Statement Processing','Financial Reporting & Analytics'],
    benefits:['Reduce claim denials by up to 90%','Accelerate payment cycles significantly','Improve cash flow predictability','Reduce administrative overhead costs','Ensure full regulatory compliance','Increase net collections across the board'],
  },
  'insurance-credentialing': {
    icon:'🏥', title:'Insurance Credentialing Services',
    sub:'Expand your payer network and start treating more patients faster.',
    desc:`Insurance credentialing is the process of verifying and validating a healthcare provider's qualifications with insurance companies, allowing them to be listed as an in-network provider. This process is critical for practices to receive reimbursements from insurance payers.\n\nAt Billin Solutions, we manage the entire credentialing process from start to finish, including gathering necessary documentation, completing applications, following up with payers, and maintaining your credentials through revalidations.`,
    features:['Initial Provider Enrollment','CAQH Profile Setup & Maintenance','Payer Application Management','Status Tracking & Follow-up','Re-credentialing & Revalidations','Group Practice Enrollment','NPI Registration','Contract Negotiation Support'],
    benefits:['Expand your payer network','Increase patient volume substantially','Reduce time to first reimbursement','Avoid costly credentialing lapses','Streamline provider onboarding','Maximize in-network revenue'],
  },
  'front-office-management': {
    icon:'📅', title:'Front Office Management Services',
    sub:'Streamline your front desk operations and dramatically improve patient experience.',
    desc:`Effective front office management is the backbone of a successful medical practice. From scheduling appointments to verifying insurance and checking patients in, these processes directly impact patient satisfaction, staff efficiency, and your bottom line.\n\nOur front office management services take the administrative burden off your staff, allowing them to focus on patient care. We use proven workflows and advanced scheduling software to optimize your practice's operations.`,
    features:['Appointment Scheduling','Automated Patient Reminders','Insurance Eligibility Checks','Patient Registration','Prior Authorization','Referral Management','Patient Communication','No-Show Management'],
    benefits:['Reduce no-shows by up to 40%','Improve patient satisfaction scores','Decrease wait times effectively','Increase daily patient volume','Reduce front desk workload','Improve revenue capture rates'],
  },
  'medical-billing-audit': {
    icon:'🔍', title:'Medical Billing Audit Services',
    sub:'Identify revenue leakage and compliance risks before they cost your practice.',
    desc:`A medical billing audit is a systematic review of your billing practices, coding accuracy, and claim submission processes. Regular audits are essential for identifying revenue leakage, compliance risks, and opportunities for process improvement.\n\nBillin Solutions' audit services provide a comprehensive analysis of your billing operations — from coding accuracy and claim submission rates to denial patterns and payment posting accuracy.`,
    features:['Coding Accuracy Review','Claims Submission Analysis','Denial Pattern Analysis','Underpayment Identification','Compliance Assessment','Process Gap Analysis','Revenue Leakage Detection','Corrective Action Planning'],
    benefits:['Recover significant lost revenue','Reduce compliance risks immediately','Improve coding accuracy across the board','Identify systemic billing errors','Optimize billing processes','Protect against payer audits'],
  },
  'eligibility-verification': {
    icon:'✅', title:'Eligibility Verification Services',
    sub:'Verify patient coverage before every visit to prevent denials at the source.',
    desc:`Patient insurance eligibility verification is one of the most critical steps in the revenue cycle. Verifying a patient's coverage before their appointment prevents claim denials, reduces patient billing disputes, and improves your practice's cash flow significantly.\n\nOur eligibility verification team checks patient coverage for every scheduled appointment, providing detailed benefit breakdowns including deductibles, copays, and coverage limitations.`,
    features:['Real-time Eligibility Checks','Detailed Benefits Breakdown','Copay & Deductible Verification','Coverage Limitation Review','Prior Authorization Management','Secondary Insurance Verification','Coverage Expiration Monitoring','Denial Prevention Alerts'],
    benefits:['Reduce eligibility-related denials','Collect accurate copays upfront','Set proper patient expectations','Improve first-pass claim rates','Reduce billing disputes','Accelerate payment cycles'],
  },
  'upfront-assistance': {
    icon:'🤝', title:'Upfront Assistance Services',
    sub:'Help patients understand their financial responsibility before care is delivered.',
    desc:`Upfront assistance services bridge the gap between insurance coverage and patient financial responsibility. By educating patients about their costs before receiving care, practices can collect more at the point of service and reduce bad debt significantly.\n\nOur upfront assistance specialists work with patients to explain their benefits, estimate out-of-pocket costs, set up payment plans, and explore financial assistance options — improving both collections and patient satisfaction.`,
    features:['Pre-service Cost Estimation','Patient Financial Counseling','Payment Plan Setup','Financial Assistance Screening','Benefits Explanation','Point-of-Service Collections','Payment Portal Setup','Financial Hardship Programs'],
    benefits:['Increase point-of-service collections','Reduce bad debt write-offs substantially','Improve patient satisfaction scores','Decrease billing disputes','Strengthen patient relationships','Improve financial transparency'],
  },
}

const DEFAULT = {
  icon:'🏥', title:'Medical Billing Service',
  sub:'Expert medical billing solutions tailored to your practice.',
  desc:'At Billin Solutions Medical Billing, we provide specialized billing services designed to maximize your revenue cycle. Our experienced team handles all aspects of billing, from eligibility verification to denial management and collections.',
  features:['Claim Submission','Eligibility Verification','Payment Posting','Denial Management','AR Follow-up','Compliance Monitoring'],
  benefits:['Maximize reimbursements','Reduce claim denials','Faster payment cycles','Reduce administrative burden'],
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = DATA[slug] || { ...DEFAULT, title: slug?.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase()) }

  return (
    <>
      <PageHero
        title={s.title}
        subtitle={s.sub}
        breadcrumbs={[{ label:'Services', to:'/our-services' }, { label:s.title }]}
      />
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
          <div className="inline-flex items-center gap-2 bg-primary-light text-primary text-sm font-bold px-4 py-2 rounded-xl mb-6">
  <FiCheckCircle size={16}/> {s.title}
</div>
            {s.desc.split('\n\n').map((p,i) => (
              <p key={i} className="text-gray-500 leading-relaxed mb-4 text-sm">{p}</p>
            ))}
            <div className="grid md:grid-cols-2 gap-6 mt-8 mb-10">
              <div className="bg-gray-bg rounded-2xl p-6">
                <h3 className="font-heading font-bold text-dark mb-4 text-base">What We Do</h3>
                <ul className="space-y-2.5">
                  {s.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <FiCheck className="text-accent mt-0.5 flex-shrink-0" size={14}/> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-primary-light rounded-2xl p-6">
                <h3 className="font-heading font-bold text-dark mb-4 text-base">Key Benefits</h3>
                <ul className="space-y-2.5">
                  {s.benefits.map(b => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-primary mt-0.5 flex-shrink-0">→</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link to="/request-free-demo" className="btn-primary">Get Started Today <FiArrowRight/></Link>
          </div>
          <div className="space-y-6">
            <ContactForm title="Request a Callback" source="service-page"/>
            <div className="bg-dark rounded-2xl p-6 text-white text-center">
              <p className="text-green-300 text-xs mb-1 font-semibold uppercase tracking-wide">Call Us Directly</p>
              <a href="tel:+12249996997" className="font-heading font-bold text-xl hover:text-accent transition flex items-center justify-center gap-2">
                <FiPhone/> +1 (224) 999-6997
              </a>
            </div>
          </div>
        </div>
      </section>
      <CTABanner/>
    </>
  )
}
