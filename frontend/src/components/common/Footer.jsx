import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTwitter } from 'react-icons/fa'
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi'
import logo from '../../assets/logo.png'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-dark text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <img src={logo} alt="Billin Solutions" className="h-16 w-auto mb-4 brightness-90"/>
          <p className="text-sm leading-relaxed mb-5">
            Billin Solutions Medical Billing provides comprehensive and customized medical billing services that enhance your practice's financial performance across the USA.
          </p>
          <div className="flex gap-2 flex-wrap">
            {[
              { icon: <FaFacebookF/>,  href: 'https://www.facebook.com/share/17HWFAYNFN/?mibextid=wwXIfr' },
              { icon: <FaInstagram/>,  href: 'https://www.instagram.com/billinsolutions?igsh=MTZwdWxpbXhyZ2xmOQ==' },
              { icon: <FaLinkedinIn/>, href: '#' },
              { icon: <FaYoutube/>,    href: '#' },
              { icon: <FaTwitter/>,    href: '#' },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center text-sm hover:bg-primary hover:text-white transition">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-heading font-bold mb-5 text-base">Our Services</h4>
          <ul className="space-y-2 text-sm">
            {[
              ['Revenue Cycle Management', '/service/revenue-cycle-management'],
              ['Insurance Credentialing',  '/service/insurance-credentialing'],
              ['Medical Billing Audit',    '/service/medical-billing-audit'],
              ['Front Office Management',  '/service/front-office-management'],
              ['Eligibility Verification', '/service/eligibility-verification'],
              ['Upfront Assistance',       '/service/upfront-assistance'],
            ].map(([l, t]) => (
              <li key={t}><Link to={t} className="hover:text-accent-light transition flex items-center gap-1.5"><span className="text-accent text-xs">›</span>{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Specialties */}
        <div>
          <h4 className="text-white font-heading font-bold mb-5 text-base">Specialities</h4>
          <ul className="space-y-2 text-sm mb-6">
            {[
              ['Acupuncture Billing',       '/specialties/acupuncture-billing'],
              ['Mental Health Billing',     '/specialties/mental-health-billing'],
              ['Urgent Care Billing',       '/specialties/urgent-care-billing'],
              ['Internal Medicine Billing', '/specialties/internal-medicine-billing'],
              ['Cardiology Billing',        '/specialties/cardiology-billing'],
              ['Hospitalist Billing',       '/specialties/hospitalist-billing'],
            ].map(([l, t]) => (
              <li key={t}><Link to={t} className="hover:text-accent-light transition flex items-center gap-1.5"><span className="text-accent text-xs">›</span>{l}</Link></li>
            ))}
          </ul>
          <h4 className="text-white font-heading font-bold mb-3 text-base">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[['/about-us','About Us'],['/contact-us','Contact Us'],['/blog','Blogs'],['/medical-billing-prices','Pricing']].map(([t,l]) => (
              <li key={t}><Link to={t} className="hover:text-accent-light transition flex items-center gap-1.5"><span className="text-accent text-xs">›</span>{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-heading font-bold mb-5 text-base">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            {[
              { icon: <FiPhone className="text-accent flex-shrink-0 mt-0.5"/>, content: <a href="tel:+14436877049" className="hover:text-accent-light transition">+1(443) 687-7049</a> },
              { icon: <FiMail className="text-accent flex-shrink-0 mt-0.5"/>,  content: <a href="mailto:billinsolutions@gmail.com" className="hover:text-accent-light transition">billinsolutions@gmail.com</a> },
              { icon: <FiMapPin className="text-accent flex-shrink-0 mt-0.5"/>,content: <span>US Address: 1000 Main St Suite 2300,<br/>Houston, TX 77002, United States</span> },
              { icon: <FiClock className="text-accent flex-shrink-0 mt-0.5"/>, content: <span>Mon–Fri: 9AM–6PM CST<br/>Sat: 10AM–2PM CST</span> },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">{item.icon}{item.content}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© {year} Billin Solutions Medical Billing. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-accent-light transition">Privacy Policy</a>
            <a href="#" className="hover:text-accent-light transition">Terms of Service</a>
            <Link to="/admin" className="hover:text-accent-light transition">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
