import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

export default function BuyGold() {
  const [amount, setAmount] = useState('')
  const [cashBalance, setCashBalance] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const goldPrice = 2375.00 // This should match your dashboard price

  useEffect(() => {
    const fetchBalance = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login')
        return
      }

      const { data: wallets } = await supabase
        .from('wallets')
        .select('wallet_type, balance')
        .eq('user_id', session.user.id)

      const cashWallet = wallets?.find(w => w.wallet_type === 'cash')
      if (cashWallet) {
        setCashBalance(cashWallet.balance)
      }
    }

    fetchBalance()
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

      <div className="min-h-screen flex flex-col bg-black text-white font-sans">
        {/* Top Navigation */}
        <div className="flex justify-between items-center p-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-[#e0b44a] hover:text-yellow-500 transition"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center flex-grow px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <img
                src="https://i.postimg.cc/xTfNxywd/gold-bar-sign.png"
                alt="Buy Gold"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold mb-2">Buy Gold</h1>
              <p className="text-gray-400">Current Price: ${goldPrice.toLocaleString('en-US')}/oz</p>
              <p className="text-gray-400">Cash Balance: ${cashBalance.toLocaleString('en-US')}</p>
              <p className="text-gray-400">Max Purchase: {maxAmount.toFixed(2)} oz</p>
            </div>

            <form onSubmit={handleBuyGold} className="space-y-6">
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
                  className="w-full px-4 py-3 bg-[#121212] border border-[#2a2a2a] rounded-xl text-white focus:outline-none focus:border-[#e0b44a] transition"
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
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !amount || parseFloat(amount) * goldPrice > cashBalance}
                className={`w-full py-3 rounded-xl text-black font-semibold transition
                  ${loading || !amount || parseFloat(amount) * goldPrice > cashBalance
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-[#e0b44a] hover:bg-yellow-400'}`}
              >
                {loading ? 'Processing...' : 'Buy Gold'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
} 