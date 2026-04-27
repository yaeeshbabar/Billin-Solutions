import { Link } from 'react-router-dom'
import PageHero from '../../components/common/PageHero'
import CTABanner from '../../components/common/CTABanner'

const CLD = 'https://res.cloudinary.com/dmehhvk8y/image/upload/v1777241034'

const STATES = [
  { name: 'Illinois',     sub: 'Chicago & Statewide',          img: `${CLD}/state-illinois.jpg` },
  { name: 'Indiana',      sub: 'Indianapolis & Statewide',     img: `${CLD}/state-indiana.jpg` },
  { name: 'California',   sub: 'LA, SF & Statewide',           img: `${CLD}/state-california.jpg` },
  { name: 'Kentucky',     sub: 'Louisville & Statewide',       img: `${CLD}/state-kentucky.jpg` },
  { name: 'New York',     sub: 'NYC & Statewide',              img: `${CLD}/state-newyork.jpg` },
  { name: 'Washington',   sub: 'Seattle & Statewide',          img: `${CLD}/state-washington.jpg` },
  { name: 'Georgia',      sub: 'Atlanta & Statewide',          img: `${CLD}/state-georgia.jpg` },
  { name: 'Alabama',      sub: 'Birmingham & Statewide',       img: `${CLD}/state-alabama.jpg` },
  { name: 'Texas',        sub: 'Dallas, Houston & Statewide',  img: `${CLD}/state-texas.jpg` },
  { name: 'Florida',      sub: 'Miami, Orlando & Statewide',   img: `${CLD}/state-florida.jpg` },
  { name: 'Ohio',         sub: 'Columbus & Statewide',         img: `${CLD}/state-ohio.jpg` },
  { name: 'Michigan',     sub: 'Detroit & Statewide',          img: `${CLD}/state-michigan.jpg` },
  { name: 'Pennsylvania', sub: 'Philadelphia & Statewide',     img: `${CLD}/state-pennsylvania.jpg` },
  { name: 'Arizona',      sub: 'Phoenix & Statewide',          img: `${CLD}/state-arizona.jpg` },
  { name: 'Colorado',     sub: 'Denver & Statewide',           img: `${CLD}/state-colorado.jpg` },
  { name: 'Virginia',     sub: 'Richmond & Statewide',         img: `${CLD}/state-virginia.jpg` },
]
export default function States() {
  return (
    <>
      <PageHero
        title="States We Serve"
        subtitle="Billin Solutions provides comprehensive medical billing services to healthcare providers across all 50 United States."
        breadcrumbs={[{ label: 'States' }]}
      />
      <section className="py-20 px-4 bg-gray-bg">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
            {STATES.map(s => (
              <div key={s.name}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-green-lg border border-transparent hover:border-accent/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-heading font-bold text-white text-sm leading-tight">{s.name}</h3>
                    <p className="text-white/75 text-xs mt-0.5">{s.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-heading font-bold text-dark mb-3">Don't See Your State?</h3>
            <p className="text-gray-500 max-w-xl mx-auto mb-6 text-sm">
              We serve healthcare providers across all 50 states. Contact us to learn how we can support your practice, no matter where you're located.
            </p>
            <Link to="/contact-us" className="btn-primary">Contact Us Today</Link>
          </div>

        </div>
      </section>
      <CTABanner />
    </>
  )
}