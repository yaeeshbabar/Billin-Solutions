import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

export default function StatCounter({ end, suffix = '', label, prefix = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-1">
        {prefix}{inView ? <CountUp end={end} duration={2.5} suffix={suffix}/> : `0${suffix}`}
      </div>
      <p className="text-green-200 text-sm font-medium">{label}</p>
    </div>
  )
}
