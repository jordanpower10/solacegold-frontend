import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import GoldPriceChart from '../components/GoldPriceChart'

export default function Dashboard() {
  const [userName, setUserName] = useState('User')
  const [cashBalance, setCashBalance] = useState(0)
  const [goldBalance, setGoldBalance] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  let timeoutId: NodeJS.Timeout

  const goldPrice = 2922.01
  const dailyChangePercent = 1.42

  // Calculate full account value
  const accountValue = cashBalance + (goldBalance * goldPrice)

  // Handle menu toggle for mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Handle logout
  const handleLogout = async () => {
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
          {/* Logo and Mobile Menu */}
          <div className="flex items-center">
            <img
              src="https://i.postimg.cc/wBT6H1j9/Gold-solace-logo.png"
              alt="Solace Gold Logo"
              className="w-20 h-20"
            />
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="ml-4 p-2 rounded-lg hover:bg-gray-800 md:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-24 left-0 right-0 bg-gray-800 z-50 md:hidden">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-white hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}

          {/* Desktop Menu */}
          <div
            className="hidden md:block relative"
            onMouseEnter={() => {
              clearTimeout(timeoutId)
              setIsMenuOpen(true)
            }}
            onMouseLeave={() => {
              timeoutId = setTimeout(() => setIsMenuOpen(false), 200)
            }}
          >
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Top right account value */}
          <div className="absolute top-6 right-6 flex items-center space-x-1">
            <span className="text-[#e0b44a] font-semibold text-lg">€</span>
            <span className="text-[#e0b44a] font-semibold text-lg">{accountValue.toLocaleString('de-DE')}</span>
          </div>
        </div>

        // ... existing content ...

        {/* Gold Price Chart */}
        <div className="px-4 mb-10">
          <div className="h-[250px]">
            <GoldPriceChart />
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