import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-[#2a2a2a] p-4 z-50">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img 
            src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" 
            alt="Solace Gold Logo" 
            className="w-8 h-auto mix-blend-lighten" 
          />
          <p className="text-gray-300 text-sm">
            We use cookies on our website to operate our site, enhance your experience, analyze traffic and conduct analytics and advertising. For more information view our{' '}
            <Link href="/cookie-policy" className="text-[#e0b44a] hover:underline">
              cookies policy
            </Link>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-[#e0b44a] text-black font-semibold rounded hover:bg-yellow-400 transition text-sm"
          >
            Accept non-essential cookies
          </button>
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-transparent text-[#e0b44a] border border-[#e0b44a] font-semibold rounded hover:bg-[#e0b44a] hover:text-black transition text-sm"
          >
            Reject non-essential cookies
          </button>
        </div>
      </div>
    </div>
  )
} 