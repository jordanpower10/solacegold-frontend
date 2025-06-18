import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { User } from '@supabase/supabase-js'
import MobileNumberWheel from '../components/MobileNumberWheel'
import { isMobileApp } from '../utils/mobileUtils'

interface Wallet {
  balance: number;
  wallet_type: string;
}

export default function Withdraw() {
  const router = useRouter()
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [currentBalance, setCurrentBalance] = useState(0)

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
          await fetchBalance(session.user.id)
        } catch (error) {
          console.error('Error checking session:', error)
        }
      }

      checkSession()
    }
  }, [])

  const fetchBalance = async (userId: string) => {
    try {
      const { data: wallet } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', userId)
        .eq('wallet_type', 'cash')
        .single()

      if (wallet && typeof wallet.balance === 'number') {
        setCurrentBalance(wallet.balance)
      }
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (!user) {
        throw new Error('Please log in to make a withdrawal')
      }

      const withdrawAmount = parseFloat(amount)
      if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        throw new Error('Please enter a valid amount')
      }

      if (withdrawAmount > currentBalance) {
        throw new Error('Insufficient balance')
      }

      // Call your withdrawal function here
      // This is a placeholder for the actual withdrawal logic
      setSuccess('✅ Withdrawal successful!')
      setAmount('')
      await fetchBalance(user.id) // Refresh balance
    } catch (error: any) {
      setError(error.message || 'An error occurred during the withdrawal')
    } finally {
      setLoading(false)
    }
  }

  const formatUsdAmount = (value: number) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  return (
    <>
      <Head>
        <title>Withdraw - Solace Gold</title>
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
            Withdraw Funds
          </h2>

          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm">Available Balance</p>
            <p className="text-xl text-white">${currentBalance.toLocaleString('en-US')}</p>
          </div>

          <form onSubmit={handleWithdraw} className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-2">
                Amount (USD)
              </label>
              <MobileNumberWheel
                min={10}
                max={currentBalance}
                step={10}
                value={Number(amount) || 0}
                onChange={(value) => setAmount(value.toString())}
                formatValue={formatUsdAmount}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              type="submit"
              disabled={loading || !amount || parseFloat(amount) > currentBalance}
              className="w-full bg-[#e0b44a] text-black font-bold py-2 rounded hover:bg-yellow-400 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Withdraw'}
            </button>
          </form>

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