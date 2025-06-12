import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { User } from '@supabase/supabase-js'

interface Profile {
  kyc_status: string;
}

export default function Deposit() {
  const router = useRouter()
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [kycStatus, setKycStatus] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkSession = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession()
          if (!session) {
            router.push('/login')
            return
          }
          setUser(session.user)
          
          // Fetch KYC status
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('kyc_status')
            .eq('id', session.user.id)
            .single()

          if (!profileError && profile) {
            const typedProfile = profile as Profile
            setKycStatus(typedProfile.kyc_status)
          }
        } catch (error) {
          console.error('Error checking session:', error)
        }
      }

      checkSession()
    }
  }, [])

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (!user) {
        throw new Error('Please log in to make a deposit')
      }

      if (!kycStatus || kycStatus !== 'approved') {
        throw new Error('Please complete KYC verification before making a deposit')
      }

      const depositAmount = parseFloat(amount)
      if (isNaN(depositAmount) || depositAmount <= 0) {
        throw new Error('Please enter a valid amount')
      }

      // Call your deposit function here
      // This is a placeholder for the actual deposit logic
      setSuccess('✅ Deposit successful!')
      setAmount('')
    } catch (error: any) {
      setError(error.message || 'An error occurred during the deposit')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Deposit - Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-[#0d0d0d] px-4 flex items-center justify-center font-sans">
        <div className="w-full max-w-md bg-[#121212] p-8 rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <a href="/dashboard">
              <img
                src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png"
                alt="Solace Gold Logo"
                className="w-32 h-auto hover:opacity-80 transition"
              />
            </a>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6 text-[#e0b44a]">
            Deposit Funds
          </h2>

          {!kycStatus || kycStatus !== 'approved' ? (
            <div className="text-center">
              <p className="text-red-500 mb-4">
                Please complete KYC verification before making a deposit
              </p>
              <a
                href="/kyc"
                className="text-[#e0b44a] hover:text-[#f0c45a] underline"
              >
                Complete KYC Verification
              </a>
            </div>
          ) : (
            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-2">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  min="0.01"
                  step="0.01"
                  className="w-full px-4 py-2 rounded bg-[#1c1c1c] text-white border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#e0b44a]"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e0b44a] text-black font-bold py-2 rounded hover:bg-yellow-400 transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Deposit'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <a
              href="/dashboard"
              className="text-sm text-gray-400 hover:text-[#e0b44a] transition"
            >
              Return to Dashboard
            </a>
          </div>
        </div>
      </div>
    </>
  )
}