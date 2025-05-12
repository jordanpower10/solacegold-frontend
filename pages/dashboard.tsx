import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard() {
  const [userName, setUserName] = useState('User')
  const [cashBalance, setCashBalance] = useState(0)
  const [goldBalance, setGoldBalance] = useState(0)
  const router = useRouter()

  const goldPrice = 2922.01
  const dailyChangePercent = 1.42

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login')
        return
      }

      const userId = session.user.id

      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', userId)
        .single()

      setUserName(profileData?.full_name || 'User')

      const { data: wallets } = await supabase
        .from('wallets')
        .select('wallet_type, balance')
        .eq('user_id', userId)

      wallets?.forEach((wallet) => {
        if (wallet.wallet_type === 'cash') {
          setCashBalance(wallet.balance)
        } else if (wallet.wallet_type === 'gold') {
          setGoldBalance(wallet.balance)
        }
      })
    }

    fetchData()
  }, [router])

  return (
    <>
      <Head>
        <title>Dashboard - Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen flex flex-col bg-black text-white font-sans relative">

        {/* Top Navigation */}
        <div className="flex justify-between items-center p-4 bg-black">
          <img src="https://i.postimg.cc/wBT6H1j9/Gold-solace-logo.png" alt="Solace Gold Logo" className="w-10 h-10" />
          <div className="text-[#e0b44a] font-semibold text-lg">
            €{goldPrice.toLocaleString('de-DE')}/oz
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center text-center py-10 px-4">
          <h1 className="text-3xl font-bold mb-2">Hi {userName},</h1>
          <p className="text-gray-400 mb-6 text-lg">Your Balance</p>

          {/* Balances */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="bg-black border border-[#2a2a2a] rounded-2xl p-6 w-40 flex flex-col items-center">
              <div className="text-2xl font-bold mb-1">€{cashBalance.toLocaleString('de-DE')}</div>
              <div className="text-sm text-gray-400">Cash Balance</div>
            </div>
            <div className="bg-black border border-[#2a2a2a] rounded-2xl p-6 w-40 flex flex-col items-center">
              <div className="text-2xl font-bold mb-1">{goldBalance.toFixed(2)} oz</div>
              <div className="text-sm text-gray-400">Gold</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <button className="bg-black border border-[#2a2a2a] hover:bg-[#e0b44a] hover:text-black rounded-2xl p-6 w-40">
              Deposit Funds
            </button>
            <button className="bg-black border border-[#2a2a2a] hover:bg-[#e0b44a] hover:text-black rounded-2xl p-6 w-40">
              Withdraw Funds
            </button>
            <button className="bg-black border border-[#2a2a2a] hover:bg-[#e0b44a] hover:text-black rounded-2xl p-6 w-40">
              Buy Gold
            </button>
            <button className="bg-black border border-[#2a2a2a] hover:bg-[#e0b44a] hover:text-black rounded-2xl p-6 w-40">
              Sell Gold
            </button>
          </div>

          {/* Gold Holdings */}
          <div className="bg-black border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-md mb-10 flex items-center justify-between">
            {/* Text Side */}
            <div className="text-left">
              <h2 className="text-md font-semibold mb-2">Gold Holdings</h2>
              <p className="text-sm text-gray-400">
                {goldBalance.toFixed(2)} oz (worth <span className="text-[#e0b44a]">€{(goldBalance * goldPrice).toLocaleString('de-DE')}</span>)
              </p>
              <p className={`mt-2 ${dailyChangePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {dailyChangePercent >= 0 ? '+' : ''}{dailyChangePercent}% Today
              </p>
            </div>

            {/* Image Side */}
            <img src="https://i.postimg.cc/YSKtGdRq/gold-bars.png" alt="Gold Bars" className="w-20 ml-4" />
          </div>

          {/* Recent Transactions */}
          <div className="bg-black border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-md font-semibold mb-4">Recent Transactions</h2>
            <div className="text-sm text-gray-400 mb-2">Bought 0.1 oz – €290.20</div>
            <div className="text-sm text-gray-400">Deposited €500</div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-600 mt-auto mb-4">
          © 2025 SolaceGold. All rights reserved.
        </footer>

      </div>
    </>
  )
}
