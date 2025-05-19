import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { User } from '@supabase/supabase-js'

export default function Deposit() {
  const router = useRouter()
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
      }
    })
  }, [])

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const numAmount = parseFloat(amount)
      if (isNaN(numAmount) || numAmount <= 0) {
        throw new Error('Please enter a valid amount')
      }

      if (!user) {
        throw new Error('No user found')
      }

      // Get the user's cash wallet
      const { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .eq('wallet_type', 'cash')
        .single()

      if (walletError) throw walletError

      // Update wallet balance
      const newBalance = (wallet.usd_balance || 0) + numAmount
      const { error: updateError } = await supabase
        .from('wallets')
        .update({ 
          usd_balance: newBalance, 
          balance: newBalance 
        })
        .eq('user_id', user.id)
        .eq('wallet_type', 'cash')

      if (updateError) throw updateError

      // Record transaction
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert([{
          user_id: user.id,
          type: 'deposit',
          amount: numAmount,
          wallet_type: 'cash',
          status: 'completed'
        }])

      if (transactionError) throw transactionError

      setSuccess(`$${numAmount.toFixed(2)} has been deposited successfully`)
      setAmount('')
    } catch (error: any) { // Type annotation for error
      console.error('❌ Deposit failed:', error)
      setError(error.message || 'Failed to process deposit')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Deposit – Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] px-4 flex items-center justify-center font-sans">
        <div className="w-full max-w-md bg-[#121212] p-8 rounded-2xl shadow-xl border border-[#2a2a2a]">
          <div className="flex justify-center mb-8">
            <a href="/dashboard">
              <img 
                src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" 
                alt="Solace Gold Logo" 
                className="w-32 h-auto hover:opacity-90 transition-opacity" 
              />
            </a>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-[#e0b44a]">
              Deposit Funds
            </h2>
            <p className="text-center text-gray-400 text-sm">
              Enter the amount you wish to deposit to your cash wallet
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleDeposit}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-400">$</span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full pl-8 pr-4 py-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e0b44a] focus:border-transparent transition-all"
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-900 rounded-lg">
                <p className="text-red-500 text-sm text-center">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-900/20 border border-green-900 rounded-lg">
                <p className="text-green-500 text-sm text-center">{success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#e0b44a] to-[#c4963c] text-black font-bold py-3 px-4 rounded-lg shadow-lg hover:from-[#e5bc5c] hover:to-[#cca04a] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Deposit Funds'
              )}
            </button>

            <div className="flex justify-center">
              <a 
                href="/dashboard" 
                className="text-sm text-gray-400 hover:text-[#e0b44a] transition-colors"
              >
                Return to Dashboard
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}