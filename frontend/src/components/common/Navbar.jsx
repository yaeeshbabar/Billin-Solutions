import { useState, useEffect } from 'react'
import { Link, NavLink }       from 'react-router-dom'
import { FiPhone, FiMail, FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import logo from '../../assets/logo.png'

const services = [
  { label: 'Revenue Cycle Management',   slug: 'revenue-cycle-management' },
  { label: 'Insurance Credentialing',    slug: 'insurance-credentialing' },
  { label: 'Front Office Management',    slug: 'front-office-management' },
  { label: 'Medical Billing Audit',      slug: 'medical-billing-audit' },
  { label: 'Eligibility Verification',   slug: 'eligibility-verification' },
  { label: 'Upfront Assistance',         slug: 'upfront-assistance' },
]
const specialties = [
  { label: 'Mental Health Billing',   slug: 'mental-health-billing' },
  { label: 'Urgent Care Billing',     slug: 'urgent-care-billing' },
  { label: 'Acupuncture Billing',     slug: 'acupuncture-billing' },
  { label: 'Cardiology Billing',      slug: 'cardiology-billing' },
  { label: 'Hospitalist Billing',     slug: 'hospitalist-billing' },
  { label: 'Internal Medicine Billing', slug: 'internal-medicine-billing' },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const toggle = name => setOpenDropdown(p => p === name ? null : name)
  const close  = ()   => { setMobileOpen(false); setOpenDropdown(null) }

  return (
    <header className="sticky top-0 z-50">
      {/* Topbar */}
      <div className="bg-primary-dark text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <a href="tel:+12249996997" className="flex items-center gap-1.5 hover:text-accent-light transition">
              <FiPhone size={12}/> +1 (224) 999-6997
            </a>
            <a href="mailto:info@billinsolutions.com" className="flex items-center gap-1.5 hover:text-accent-light transition">
              <FiMail size={12}/> info@billinsolutions.com
            </a>
          </div>
          <span className="text-green-300">Professional Medical Billing Services in USA</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`bg-white transition-all duration-300 ${scrolled ? 'shadow-green' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0">
           <img src={logo} alt="Billin Solutions Medical Billing" className="h-16 w-auto object-contain" style={{mixBlendMode:'multiply'}}/>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5 text-sm font-medium">
            {[['/', 'Home'], ['/about-us', 'About Us']].map(([to, label]) => (
              <li key={to}>
                <NavLink to={to} end className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition ${isActive ? 'text-primary bg-primary-light' : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`
                }>{label}</NavLink>
              </li>
            ))}

            <DropdownNav label="Services" id="services" items={services} basePath="/service"
              open={openDropdown === 'services'} toggle={() => toggle('services')} />
            <DropdownNav label="Specialities" id="specialties" items={specialties} basePath="/specialties"
              open={openDropdown === 'specialties'} toggle={() => toggle('specialties')}
              viewAllPath="/our-specialties" viewAllLabel="View All Specialities" />

            {[
              ['/our-states','States'],
              ['/medical-billing-prices','Pricing'],
              ['/blog','Blog'],
            ].map(([to, label]) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition ${isActive ? 'text-primary bg-primary-light' : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`
                }>{label}</NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact-us" className="text-sm font-semibold text-primary hover:underline">Contact</Link>
            <Link to="/request-free-demo" className="btn-primary text-sm py-2.5 px-5">Request Demo</Link>
          </div>

          <button className="lg:hidden p-2 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FiX size={24}/> : <FiMenu size={24}/>}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {[['/', 'Home'], ['/about-us', 'About Us'], ['/our-services','Services'],
              ['/our-specialties','Specialities'], ['/our-states','States'],
              ['/medical-billing-prices','Pricing'], ['/blog','Blog'], ['/contact-us','Contact Us']
            ].map(([to, label]) => (
              <NavLink key={to} to={to} onClick={close}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-sm font-medium ${isActive ? 'bg-primary-light text-primary' : 'text-gray-700 hover:bg-gray-50'}`
                }>{label}</NavLink>
            ))}
            <Link to="/request-free-demo" onClick={close}
              className="btn-primary w-full justify-center mt-3">Request Demo</Link>
          </div>
        )}
      </nav>
    </header>
  )
}

function DropdownNav({ label, items, basePath, open, toggle, viewAllPath, viewAllLabel }) {
  return (
    <li className="relative" onMouseLeave={() => {}}>
      <button onClick={toggle}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 transition">
        {label} <FiChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`}/>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-green-lg border border-gray-100 min-w-[240px] py-2 z-50">
          {items.map(it => (
            <Link key={it.slug} to={`${basePath}/${it.slug}`} onClick={toggle}
              className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-primary-light hover:text-primary transition">
              {it.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-1 pt-1">
            <Link to={viewAllPath || `/our-services`} onClick={toggle}
              className="block px-4 py-2.5 text-sm text-primary font-semibold hover:bg-primary-light">
              {viewAllLabel || 'View All Services'} →
            </Link>
          </div>
        </div>
      )}
    </li>
  )
}
