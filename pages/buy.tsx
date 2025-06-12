import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

interface Wallet {
  wallet_type: string;
  balance: number;
}

export default function BuyGold() {
  const [amount, setAmount] = useState('')
  const [cashBalance, setCashBalance] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const goldPrice = 2375.00 // This should match your dashboard price

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchBalance = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession()

          if (!session) {
            router.push('/login')
            return
          }

          const { data: wallets } = await supabase
            .from('wallets')
            .select('wallet_type, balance')
            .eq('user_id', session.user.id)

          if (wallets) {
            const typedWallets = wallets as Wallet[]
            const cashWallet = typedWallets.find(w => w.wallet_type === 'cash')
            if (cashWallet) {
              setCashBalance(cashWallet.balance)
            }
          }
        } catch (error) {
          console.error('Error fetching balance:', error)
        }
      }

      fetchBalance()
    }
  }, [router])

  const handleBuyGold = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const goldAmount = parseFloat(amount)
      if (isNaN(goldAmount) || goldAmount <= 0) {
        throw new Error('Please enter a valid amount')
      }

      const totalCost = goldAmount * goldPrice
      if (totalCost > cashBalance) {
        throw new Error('Insufficient cash balance')
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      // Start a Supabase transaction
      const { data: transaction, error: transactionError } = await supabase
        .rpc('buy_gold', {
          p_user_id: session.user.id,
          p_gold_amount: goldAmount,
          p_gold_price: goldPrice
        })

      if (transactionError) {
        throw new Error(transactionError.message)
      }

      // Redirect to dashboard on success
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const maxAmount = Math.floor((cashBalance / goldPrice) * 100) / 100

  return (
    <>
      <Head>
        <title>Buy Gold - Solace Gold</title>
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
              Buy Gold
            </h2>
            <div className="text-center space-y-2">
              <p className="text-gray-400 text-sm">Current Gold Price</p>
              <p className="text-xl text-white">${goldPrice.toLocaleString('en-US')}/oz</p>
              <p className="text-gray-400 text-sm mt-4">Available Cash Balance</p>
              <p className="text-xl text-white">${cashBalance.toLocaleString('en-US')}</p>
              <p className="text-gray-400 text-sm mt-4">Maximum Purchase</p>
              <p className="text-xl text-white">{maxAmount.toFixed(2)} oz</p>
            </div>
          </div>

          <form onSubmit={handleBuyGold} className="mt-8 space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-2">
                Amount (oz)
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                max={maxAmount}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a] focus:border-transparent transition-all"
                placeholder="0.00"
                required
              />
              {amount && !isNaN(parseFloat(amount)) && (
                <p className="mt-2 text-sm text-gray-400">
                  Total Cost: ${(parseFloat(amount) * goldPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-900 rounded-lg">
                <p className="text-red-500 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !amount || parseFloat(amount) * goldPrice > cashBalance}
              className={`w-full py-3 rounded-lg text-black font-bold transition-all duration-200
                ${loading || !amount || parseFloat(amount) * goldPrice > cashBalance
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#e0b44a] to-[#c4963c] hover:from-[#e5bc5c] hover:to-[#cca04a]'}`}
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
                'Buy Gold'
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