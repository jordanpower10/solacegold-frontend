import { useState } from 'react'
import { motion } from 'framer-motion'

interface AddressStepProps {
  residence: string;
  onNext: (data: {
    address: string;
    city: string;
    postalCode: string;
  }) => void;
}

export default function AddressStep({ residence, onNext }: AddressStepProps) {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({
      address,
      city,
      postalCode
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <h2 className="text-2xl font-bold mb-6 text-white">Residential Address</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-400 mb-2">
              Residential Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#e0b44a] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-400 mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#e0b44a] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-400 mb-2">
              Postal Code (optional)
            </label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#e0b44a] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-400 mb-2">
              Country / Region
            </label>
            <div className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white">
              {residence}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <p className="text-sm text-gray-400 mb-4">
            By continuing, you agree that the above captured personal data is accurate and in line with your KYC documentation.
          </p>
          <button
            type="submit"
            disabled={!address || !city}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              address && city
                ? 'bg-[#e0b44a] text-black hover:bg-yellow-400'
                : 'bg-gray-600 text-gray-300 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </form>
    </motion.div>
  )
} 