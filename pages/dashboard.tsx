import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import GoldPriceChart from '../components/GoldPriceChart'
import GoldGlobe from '../components/GoldGlobe'

export default function Dashboard() {
  const [userName, setUserName] = useState('User')
  const [firstName, setFirstName] = useState('User')
  const [cashBalance, setCashBalance] = useState(0)
  const [goldBalance, setGoldBalance] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [transactions, setTransactions] = useState<any[]>([])
  const router = useRouter()
  let timeoutId: NodeJS.Timeout

  const goldPrice = 2375.00
  const dailyChangePercent = 1.42

  // Calculate full account value
  const accountValue = cashBalance + (goldBalance * goldPrice)

  // Handle menu toggle for mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Handle logout
  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

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
        .select('first_name, last_name')
        .eq('id', userId)
        .single()

      setUserName(profileData?.first_name || 'User')
      if (profileData?.first_name) {
        setFirstName(profileData.first_name)
      }

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

      // Fetch transactions
      const { data: txs } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      setTransactions(txs || [])
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
        {/* Main Content */}
        <div className="flex flex-col items-center text-center py-10 px-4">
          {/* Logo with Logout */}
          <div 
            className="relative mb-8 group"
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
              className="w-32 h-32 cursor-pointer"
            />
            
            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
                <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#e0b44a] to-transparent mb-2" />
                <button
                  onClick={signOut}
                  className="text-sm text-[#e0b44a] hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">Hi {firstName}</h1>
          <p className="text-gray-400 mb-8 text-lg">Your Balance</p>

          {/* Balances */}
          <div className="flex flex-col md:flex-row gap-8 mb-10 w-full max-w-2xl justify-center items-center">
            <div className="bg-[#121212] border border-[#2a2a2a] flex flex-col items-center justify-center"
              style={{ width: 160, height: 160, borderRadius: '50%' }}>
              <div className="text-2xl font-bold mb-1">${cashBalance.toLocaleString('en-US')}</div>
              <div className="text-sm text-gray-400">Cash Balance</div>
            </div>
            <div className="bg-[#121212] border border-[#2a2a2a] flex flex-col items-center justify-center"
              style={{ width: 160, height: 160, borderRadius: '50%' }}>
              <div className="text-2xl font-bold mb-1">{goldBalance.toFixed(2)} oz</div>
              <div className="text-sm text-gray-400">Gold Balance</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 w-full max-w-2xl">
            <button 
              onClick={() => router.push('/deposit')}
              className="bg-[#121212] border border-[#2a2a2a] hover:border-[#e0b44a] rounded-2xl p-4 flex flex-col items-center transition-colors duration-200 cursor-pointer"
            >
              <img src="https://i.postimg.cc/L87SP2kp/gold-euro-sign.png" alt="Deposit Icon" className="w-8 h-8 mb-2" />
              <span className="text-sm">Deposit</span>
            </button>
            <button 
              onClick={() => router.push('/withdraw')}
              className="bg-[#121212] border border-[#2a2a2a] hover:border-[#e0b44a] rounded-2xl p-4 flex flex-col items-center transition-colors duration-200 cursor-pointer"
            >
              <img src="https://i.postimg.cc/L4TY11M8/Chat-GPT-Image-May-26-2025-11-07-50-PM.png" alt="Withdraw Icon" className="w-8 h-8 mb-2" />
              <span className="text-sm">Withdraw</span>
            </button>
            <button 
              onClick={() => router.push('/buy')}
              className="bg-[#121212] border border-[#2a2a2a] hover:border-[#e0b44a] rounded-2xl p-4 flex flex-col items-center transition-colors duration-200 cursor-pointer"
            >
              <img src="https://i.postimg.cc/xTfNxywd/gold-bar-sign.png" alt="Buy Gold Icon" className="w-8 h-8 mb-2" />
              <span className="text-sm">Buy Gold</span>
            </button>
            <button 
              onClick={() => router.push('/sell')}
              className="bg-[#121212] border border-[#2a2a2a] hover:border-[#e0b44a] rounded-2xl p-4 flex flex-col items-center transition-colors duration-200 cursor-pointer"
            >
              <img src="https://i.postimg.cc/L5vWLQqb/gold-coins.png" alt="Sell Gold Icon" className="w-8 h-8 mb-2" />
              <span className="text-sm">Sell Gold</span>
            </button>
          </div>

          {/* Rankings */}
          <div className="w-full max-w-2xl mb-10">
            <GoldGlobe />
          </div>

          {/* Recent Transactions */}
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-2xl mb-10">
            <h2 className="text-xl font-semibold mb-4 text-left">Recent Transactions</h2>
            {transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} {tx.amount ? `$${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : ''}</span>
                    <span className="text-[#e0b44a]">{new Date(tx.created_at).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-center">No recent transactions.</div>
            )}
          </div>

          {/* Gold Price Chart */}
          <div className="w-full max-w-2xl mb-20">
            <div className="h-[250px] mb-8">
              <GoldPriceChart />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-600 py-6">
          © 2025 SolaceGold. All rights reserved.
        </footer>
      </div>
    </>
  )
}