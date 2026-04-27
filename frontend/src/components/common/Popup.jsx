import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiX, FiArrowRight, FiPhone } from 'react-icons/fi'
import api from '../../utils/api'

export default function Popup() {
  const [popup,   setPopup]   = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    api.get('/popup/active')
      .then(r => {
        const p = r.data.data
        if (!p) return
        // Respect showOnce
        const key = `bs_popup_${p._id}`
        if (p.showOnce && sessionStorage.getItem(key)) return
        setPopup(p)
        const timer = setTimeout(() => {
          setVisible(true)
          if (p._id) api.post(`/popup/${p._id}/impression`).catch(() => {})
          if (p.showOnce) sessionStorage.setItem(key, '1')
        }, (p.delay || 5) * 1000)
        return () => clearTimeout(timer)
      })
      .catch(() => {
        // Fallback static popup if backend is down
        const key = 'bs_popup_static'
        if (sessionStorage.getItem(key)) return
        setTimeout(() => {
          setPopup({
            _id: 'static',
            title: '🎉 Get 30 Days FREE Billing!',
            subtitle: 'Limited Time Offer for New Practices',
            body: 'Join 500+ healthcare providers who trust Billin Solutions. Start with zero upfront cost and see results in 30 days.',
            ctaText: 'Claim Free Trial Now',
            type: 'offer',
          })
          setVisible(true)
          sessionStorage.setItem(key, '1')
        }, 6000)
      })
  }, [])

  const close = () => setVisible(false)

  const handleCTA = () => {
    if (popup?._id && popup._id !== 'static') {
      api.post(`/popup/${popup._id}/conversion`).catch(() => {})
    }
    close()
  }

  if (!visible || !popup) return null

  return (
    <div className="popup-overlay fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) close() }}>
      <div className="popup-box bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl">
        {/* Header banner */}
        <div className="bg-gradient-to-r from-primary-dark via-primary to-accent p-6 text-white relative">
          <button onClick={close}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition">
            <FiX size={16}/>
          </button>
          <div className="text-4xl mb-2">🏥</div>
          <h3 className="font-heading font-bold text-2xl leading-tight">{popup.title}</h3>
          {popup.subtitle && <p className="text-green-100 text-sm mt-1">{popup.subtitle}</p>}
        </div>

        {/* Body */}
        <div className="p-6">
          {popup.body && <p className="text-gray-600 text-sm leading-relaxed mb-5">{popup.body}</p>}

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {['No Upfront Cost', 'Rates from 2.49%', '99% Clean Claims', 'Free Consultation'].map(f => (
              <div key={f} className="flex items-center gap-2 text-xs text-gray-600 bg-primary-light rounded-lg px-3 py-2">
                <span className="text-accent font-bold">✓</span> {f}
              </div>
            ))}
          </div>

          <Link to="/request-free-demo" onClick={handleCTA}
            className="btn-primary w-full justify-center py-3 text-base mb-3">
            {popup.ctaText || 'Get Free Demo'} <FiArrowRight/>
          </Link>

          <a href="tel:+12249996997" onClick={close}
            className="flex items-center justify-center gap-2 text-sm text-primary font-semibold hover:underline py-1">
            <FiPhone size={14}/> Or call: +1 (224) 999-6997
          </a>

          <p className="text-center text-xs text-gray-400 mt-3">No commitment required • Cancel anytime</p>
        </div>
      </div>
    </div>
  )
}
