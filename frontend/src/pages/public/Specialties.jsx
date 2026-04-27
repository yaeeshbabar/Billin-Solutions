import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiDollarSign,
  FiShield,
  FiCalendar,
  FiSearch,
  FiCheckCircle,
  FiUsers,
  FiBarChart2,
  FiAlertCircle,
  FiActivity,
  FiZap,
  FiHeart,
  FiHome,
  FiBriefcase,
  FiEye,
  FiUser,
  FiTrendingUp,
  FiDroplet,
  FiSun
} from 'react-icons/fi'

import PageHero from '../../components/common/PageHero'
import CTABanner from '../../components/common/CTABanner'

const SPECIALTIES = [
  { Icon: FiZap,        slug:'acupuncture-billing',       title:'Acupuncture Billing Services',    desc:'Streamlined billing for acupuncture practices navigating complex payer-specific coverage policies and CPT codes.' },

  { Icon: FiActivity,   slug:'mental-health-billing',     title:'Mental Health Billing Services',  desc:'Comprehensive billing for psychotherapy, telehealth, medication management and psychiatric evaluations.' },

  { Icon: FiTrendingUp, slug:'urgent-care-billing',       title:'Urgent Care Billing Services',    desc:'High-volume billing covering E&M coding, procedures, labs and ancillary services for urgent care centers.' },

  { Icon: FiBriefcase,  slug:'internal-medicine-billing', title:'Internal Medicine Billing',       desc:'Billing for E&M, chronic care management, preventive services and transitional care management.' },

  { Icon: FiHeart,      slug:'cardiology-billing',        title:'Cardiology Billing Services',     desc:'Expert billing for complex cardiovascular procedures, EKGs, echocardiograms and interventional cardiology.' },

  { Icon: FiHome,       slug:'hospitalist-billing',       title:'Hospitalist Billing Services',    desc:'Accurate inpatient E&M coding, critical care billing and discharge day management for hospitalists.' },

  { Icon: FiBriefcase,  slug:'orthopedic-billing',        title:'Orthopedic Billing Services',     desc:'Precise billing for orthopedic practices handling complex surgical and procedural codes.' },

  { Icon: FiSun,        slug:'dermatology-billing',       title:'Dermatology Billing Services',    desc:'Comprehensive billing for medical and cosmetic dermatology procedures and services.' },

  { Icon: FiEye,        slug:'ophthalmology-billing',     title:'Ophthalmology Billing Services',  desc:'Specialized billing for eye care providers covering routine exams and complex surgical procedures.' },

  { Icon: FiUser,       slug:'pediatric-billing',         title:'Pediatric Billing Services',      desc:'Dedicated billing support for pediatric practices ensuring accurate coding and timely payments.' },

  { Icon: FiDroplet,    slug:'physical-therapy-billing',  title:'Physical Therapy Billing',        desc:'Efficient billing for physical therapy providers to streamline claims and improve cash flow.' },

  { Icon: FiActivity,   slug:'oncology-billing',          title:'Oncology Billing Services',       desc:'Specialized billing covering complex chemotherapy, radiation therapy and infusion codes.' },
]

export default function Specialties() {
  return (
    <>
      <PageHero
        title="Our Medical Specialities"
        subtitle="Expert billing solutions for every medical specialty — tailored to your unique coding and compliance requirements."
        breadcrumbs={[{ label:'Specialities' }]}
      />

      <section className="py-20 px-4 bg-gray-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gray-500 max-w-3xl mx-auto">
              Our team has extensive experience with the complexities of different specialties, ensuring accurate and fast billing processes across all medical disciplines.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALTIES.map(({ Icon, slug, title, desc }) => (
              <Link
                key={slug}
                to={`/specialties/${slug}`}
                className="card group hover:-translate-y-1 duration-300 text-left flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors mt-1">
                  <Icon size={20} className="text-primary group-hover:text-white transition-colors"/>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-dark mb-1 group-hover:text-primary transition text-base">
                    {title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {desc}
                  </p>

                  <span className="text-primary text-sm font-semibold flex items-center gap-1">
                    Learn More <FiArrowRight size={13}/>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Don't See Your Specialty?"
        sub="We support 20+ specialties nationwide — contact us to learn more"
      />
    </>
  )
}