import { FiDollarSign, FiShield, FiCalendar, FiSearch, FiCheckCircle, FiUsers, FiArrowRight, FiCheck } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import PageHero from '../../components/common/PageHero'
import CTABanner from '../../components/common/CTABanner'

const SERVICES = [
  {
    Icon: FiDollarSign,
    slug: 'revenue-cycle-management',
    title: 'Revenue Cycle Management Services',
    desc: 'Revolutionize your revenue cycle with Billin Solutions. A successful RCM system is essential for the financial viability of your practice. We handle everything from patient registration to denial management.',
    features: [
      'Patient Registration & Eligibility',
      'Charge Capture & Coding Review',
      'Clean Claims Submission',
      'Payment Posting & Reconciliation',
      'Denial Management & Appeals',
      'AR Follow-up & Collections',
    ],
    benefits: [
      'Reduce denials by up to 90%',
      'Accelerate payment cycles',
      'Improve cash flow predictability',
      'Ensure regulatory compliance',
    ],
  },
  {
    Icon: FiShield,
    slug: 'insurance-credentialing',
    title: 'Insurance Credentialing Services',
    desc: 'Medical provider credentialing is essential for any healthcare facility. Billin Solutions helps you increase your credentialed payers, grow your patient base, and protect your market share.',
    features: [
      'Initial Provider Enrollment',
      'CAQH Profile Management',
      'Payer Application Management',
      'Status Tracking & Follow-up',
      'Re-credentialing & Revalidations',
      'Group Practice Enrollment',
    ],
    benefits: [
      'Expand your payer network',
      'Increase patient volume',
      'Reduce time to first payment',
      'Avoid credentialing lapses',
    ],
  },
  {
    Icon: FiCalendar,
    slug: 'front-office-management',
    title: 'Front Office Management Services',
    desc: 'Medical practices must maintain an effective scheduling process to maximize patient care time. Our solutions ensure smooth operations from appointment booking to patient check-in.',
    features: [
      'Appointment Scheduling',
      'Automated Reminders',
      'Insurance Eligibility Checks',
      'Patient Registration',
      'Prior Authorization',
      'Referral Management',
    ],
    benefits: [
      'Reduce no-shows by 40%',
      'Improve patient satisfaction',
      'Increase daily patient volume',
      'Decrease front desk workload',
    ],
  },
  {
    Icon: FiSearch,
    slug: 'medical-billing-audit',
    title: 'Medical Billing Audit Services',
    desc: 'Our Medical Billing Audit Services help healthcare providers identify errors, optimize processes, and ensure regulatory compliance, enhancing revenue and operational efficiency.',
    features: [
      'Coding Accuracy Review',
      'Claims Submission Analysis',
      'Denial Pattern Analysis',
      'Underpayment Identification',
      'Compliance Assessment',
      'Revenue Leakage Detection',
    ],
    benefits: [
      'Recover lost revenue',
      'Reduce compliance risks',
      'Improve coding accuracy',
      'Protect against payer audits',
    ],
  },
  {
    Icon: FiCheckCircle,
    slug: 'eligibility-verification',
    title: 'Eligibility Verification Services',
    desc: 'Our real-time eligibility verification ensures patient insurance is accurately verified before services are rendered, reducing claim denials and improving cash flow significantly.',
    features: [
      'Real-time Eligibility Checks',
      'Detailed Benefits Breakdown',
      'Copay & Deductible Verification',
      'Coverage Limitation Review',
      'Prior Authorization',
      'Denial Prevention Alerts',
    ],
    benefits: [
      'Reduce eligibility-related denials',
      'Collect accurate copays upfront',
      'Improve first-pass claim rates',
      'Accelerate payment cycles',
    ],
  },
  {
    Icon: FiUsers,
    slug: 'upfront-assistance',
    title: 'Upfront Assistance Services',
    desc: 'Help patients understand their financial responsibilities before receiving care, improving collections and patient satisfaction while reducing bad debt for your practice.',
    features: [
      'Pre-service Cost Estimation',
      'Patient Financial Counseling',
      'Payment Plan Setup',
      'Financial Assistance Screening',
      'Point-of-Service Collections',
      'Financial Hardship Programs',
    ],
    benefits: [
      'Increase point-of-service collections',
      'Reduce bad debt write-offs',
      'Improve patient satisfaction',
      'Strengthen patient relationships',
    ],
  },
]

export default function Services() {
  return (
    <>
      <PageHero
        title="Our Medical Billing Services"
        subtitle="Comprehensive billing and revenue cycle solutions tailored to your healthcare practice's unique needs."
        breadcrumbs={[{ label: 'Services' }]}
      />

      <section className="py-20 px-4 bg-gray-bg">
        <div className="max-w-7xl mx-auto space-y-8">
          {SERVICES.map((s, i) => (
            <div
              key={s.slug}
              className={`card flex flex-col lg:flex-row gap-8 items-start ${
                i % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Left Content */}
              <div className="lg:w-1/2">
                <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-4">
                  <s.Icon size={26} className="text-primary" />
                </div>

                <h2 className="text-2xl font-heading font-bold text-dark mb-3">
                  {s.title}
                </h2>

                <p className="text-gray-500 leading-relaxed mb-5 text-sm">
                  {s.desc}
                </p>

                <div className="mb-5">
                  <h4 className="font-semibold text-dark text-sm mb-3">
                    Key Benefits:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {s.benefits.map((b) => (
                      <div
                        key={b}
                        className="flex items-center gap-2 text-xs text-gray-600"
                      >
                        <FiCheck
                          className="text-accent flex-shrink-0"
                          size={13}
                        />
                        {b}
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/service/${s.slug}`}
                  className="btn-primary text-sm py-2.5 flex items-center gap-2 w-fit"
                >
                  Learn More <FiArrowRight />
                </Link>
              </div>

              {/* Right Content */}
              <div className="lg:w-1/2 bg-gray-bg rounded-2xl p-6 w-full">
                <h4 className="font-heading font-bold text-dark mb-4 text-sm">
                  What We Do
                </h4>
                <ul className="space-y-2.5">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  )
}