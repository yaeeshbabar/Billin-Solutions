import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

export default function PageHero({ title, subtitle, breadcrumbs = [], children }) {
  return (
    <section className="relative bg-gradient-to-br from-dark via-primary-dark to-primary text-white py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/3"/>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-light rounded-full translate-y-1/2 -translate-x-1/3"/>
      </div>
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {breadcrumbs.length > 0 && (
          <nav className="flex justify-center items-center gap-1 text-xs text-green-300 mb-4">
            <Link to="/" className="hover:text-white transition">Home</Link>
            {breadcrumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                <FiChevronRight size={12}/>
                {c.to
                  ? <Link to={c.to} className="hover:text-white transition">{c.label}</Link>
                  : <span className="text-white">{c.label}</span>
                }
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 animate-fade-up">{title}</h1>
        {subtitle && <p className="text-lg text-green-100 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>}
        {children}
      </div>
    </section>
  )
}
