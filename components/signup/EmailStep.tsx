import { useState } from 'react'
import { motion } from 'framer-motion'

interface EmailStepProps {
  onNext: (email: string) => void;
}

export default function EmailStep({ onNext }: EmailStepProps) {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (agreed) {
      onNext(email)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <h2 className="text-2xl font-bold mb-6">Verify your email</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#e0b44a] transition-colors"
          />
        </div>
        
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 mr-3"
          />
          <label htmlFor="terms" className="text-sm text-gray-400">
            By creating an account, I agree to SolaceGold's terms and KYC requirements.
          </label>
        </div>

        <button
          type="submit"
          disabled={!agreed || !email}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            agreed && email
              ? 'bg-[#e0b44a] text-black hover:bg-yellow-400'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </form>
    </motion.div>
  )
} 