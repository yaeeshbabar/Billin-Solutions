import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

const WA_NUMBER = '923100786960'
const WA_MESSAGE = encodeURIComponent('Hello! I am interested in Billin Solutions Medical Billing services. Please assist me.')

export default function WhatsApp() {
  const [tooltip, setTooltip] = useState(true)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip bubble */}
      {tooltip && (
        <div className="bg-white rounded-2xl shadow-green-lg px-4 py-3 text-sm max-w-[200px] relative border border-green-100 animate-fade-in">
          <button onClick={() => setTooltip(false)}
            className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-0.5 hover:bg-gray-300 transition">
            <FiX size={10}/>
          </button>
          <p className="font-semibold text-dark text-xs mb-0.5">Chat with us!</p>
          <p className="text-gray-500 text-xs">Get a free consultation on WhatsApp 👇</p>
        </div>
      )}

      {/* WhatsApp button */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
        target="_blank" rel="noreferrer"
        className="wa-btn w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#20ba5a] transition-colors"
        aria-label="Chat on WhatsApp"
        onClick={() => setTooltip(false)}
      >
        <FaWhatsapp size={30}/>
      </a>
    </div>
  )
}
