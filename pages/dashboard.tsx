import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard() {
  const [userName, setUserName] = useState('User')
  const [cashBalance, setCashBalance] = useState(0)
  const [goldBalance, setGoldBalance] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  let timeoutId: NodeJS.Timeout

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
        <div className="flex justify-between items-center p-4 bg-black relative">
          {/* Logo with hover dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              clearTimeout(timeoutId)
              setIsMenuOpen(true)
            }}
            onMouseLeave={() => {
              timeoutId = setTimeout(() => setIsMenuOpen(false), 200)
            }}
          >
            <img
              src="https://i.postimg.cc/wBT6H1j9/Gold-solace-logo.png"
              alt="Solace Gold Logo"
              className="w-20 h-20 cursor-pointer"
            />
            {isMenuOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-50">
                <button
                  onClick={async () => {
                    await supabase.auth.signOut()
                    router.push('/login')
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Balance top right (fixed) */}
          <div className="absolute top-6 right-6 flex items-center space-x-1">
            <span className="text-[#e0b44a] font-semibold text-lg">€</span>
            <span className="text-[#e0b44a] font-semibold text-lg">{goldPrice.toLocaleString('de-DE')}</span>
            <span className="text-gray-400 text-sm">/oz</span>
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

          {/* Action Buttons with Gold Icons */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <button className="bg-black border border-[#2a2a2a] hover:bg-[#e0b44a] hover:text-black rounded-2xl p-6 w-40 flex flex-col items-center">
              <img src="https://i.postimg.cc/L87SP2kp/gold-euro-sign.png" alt="Deposit Icon" className="w-8 h-8 mb-2" />
              <span>Deposit Funds</span>
            </button>
            <button className="bg-black border border-[#2a2a2a] hover:bg-[#e0b44a] hover:text-black rounded-2xl p-6 w-40 flex flex-col items-center">
              <img src="https://i.postimg.cc/y8hhg8CJ/gold-transparent-bank-withdrawal.png" alt="Withdraw Icon" className="w-8 h-8 mb-2 mix-blend-multiply" />
              <span>Withdraw Funds</span>
            </button>
            <button className="bg-black border border-[#2a2a2a] hover:bg-[#e0b44a] hover:text-black rounded-2xl p-6 w-40 flex flex-col items-center">
              <img src="https://i.postimg.cc/xTfNxywd/gold-bar-sign.png" alt="Buy Gold Icon" className="w-8 h-8 mb-2" />
              <span>Buy Gold</span>
            </button>
            <button className="bg-black border border-[#2a2a2a] hover:bg-[#e0b44a] hover:text-black rounded-2xl p-6 w-40 flex flex-col items-center">
              <img src="https://i.postimg.cc/wvFg7J0W/gold-withdrawal-sign.png" alt="Sell Gold Icon" className="w-8 h-8 mb-2 mix-blend-multiply" />
              <span>Sell Gold</span>
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
