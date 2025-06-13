import { useState } from 'react'
import { motion } from 'framer-motion'

interface VerificationStepProps {
  email: string;
  onNext: (code: string) => void;
  onResend: () => void;
}

export default function VerificationStep({ email, onNext, onResend }: VerificationStepProps) {
  const [code, setCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(code)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <h2 className="text-2xl font-bold mb-6">Verify your email</h2>
      <p className="text-gray-400 mb-6">
        A 6-digit code has been sent to {email}. Please enter it within the next 30 minutes.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-400 mb-2">
            Verification Code
          </label>
          <input
            type="text"
            id="code"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            required
            pattern="\d{6}"
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#e0b44a] transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={code.length !== 6}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            code.length === 6
              ? 'bg-[#e0b44a] text-black hover:bg-yellow-400'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
        >
          Next
        </button>

        <button
          type="button"
          onClick={onResend}
          className="w-full text-[#e0b44a] text-sm hover:underline"
        >
          Didn't receive the code?
        </button>
      </form>
    </motion.div>
  )
} 