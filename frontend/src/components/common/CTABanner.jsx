import { Link } from 'react-router-dom'

export default function CTABanner({ title, sub, btn = 'Book a Free Demo' }) {
  return (
    <section className="bg-gradient-to-r from-primary-dark via-primary to-accent py-16 px-4">
      <div className="max-w-5xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
          {title || 'Boost Your Revenue with Billin Solutions'}
        </h2>
        <p className="text-green-100 text-lg font-semibold mb-2">{sub || 'at Rates as Low as 2.49%'}</p>
        <div className="flex flex-wrap justify-center gap-6 my-6 text-sm text-green-100">
          {['No Upfront Cost', 'Reduce Billing Errors', 'Timely Billing Solutions', 'Dedicated Account Manager', 'Denial Management'].map(f => (
            <span key={f} className="flex items-center gap-1.5">
              <span className="text-accent-light font-bold">✓</span> {f}
            </span>
          ))}
        </div>
        <Link to="/request-free-demo" className="btn-white text-base py-3 px-8">{btn}</Link>
      </div>
    </section>
  )
}
