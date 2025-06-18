import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

// Global statistics for gold holdings (approximate values)
const GLOBAL_STATS = {
  goldHolders: {
    '0.1': 99.9, // 0.1 oz puts you in top 99.9%
    '1': 99.0,   // 1 oz puts you in top 99%
    '5': 95.0,   // 5 oz puts you in top 95%
    '10': 90.0,  // 10 oz puts you in top 90%
    '50': 80.0,  // 50 oz puts you in top 80%
    '100': 70.0, // 100 oz puts you in top 70%
  }
}

interface Wallet {
  balance: number;
  wallet_type: string;
}

export default function GoldGlobe() {
  const router = useRouter()
  const [isGlobalView, setIsGlobalView] = useState(true)
  const [leaderboardRank, setLeaderboardRank] = useState(0)
  const [globalPercentile, setGlobalPercentile] = useState(0)
  const [goldBalance, setGoldBalance] = useState(0)
  const [hasSelected, setHasSelected] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  // Fetch user data and calculate rankings
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchUserData = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession()
          if (!session) return

          // Get user's gold balance
          const { data: wallet } = await supabase
            .from('wallets')
            .select('balance')
            .eq('user_id', session.user.id)
            .eq('wallet_type', 'gold')
            .single()

          if (wallet && typeof wallet.balance === 'number') {
            setGoldBalance(wallet.balance)
          }

          // Get user's leaderboard rank
          const { count } = await supabase
            .from('wallets')
            .select('*', { count: 'exact', head: true })
            .eq('wallet_type', 'gold')
            .gt('balance', wallet?.balance || 0)

          setLeaderboardRank((count || 0) + 1)
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }

      fetchUserData()
    }
  }, [])

  // Calculate global percentile
  useEffect(() => {
    let percentile = 0
    for (const [amount, pct] of Object.entries(GLOBAL_STATS.goldHolders)) {
      if (goldBalance >= parseFloat(amount)) {
        percentile = pct
      }
    }
    setGlobalPercentile(percentile)
  }, [goldBalance])

  const handleViewChange = (isGlobal: boolean) => {
    setIsGlobalView(isGlobal)
    setHasSelected(true)
    if (goldBalance > 0) {
      setShowMessage(false)
    }
  }

  const handleBuyGold = () => {
    router.push('/buy')
  }

  const handleMouseLeave = () => {
    // Remove this function as we want the message to stay
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Toggle Switch */}
      <div className="flex justify-center mb-8 w-full">
        <div className="bg-[#1a1a1a] p-1 rounded-xl flex flex-col sm:flex-row w-full sm:w-auto">
          <button
            onClick={() => handleViewChange(true)}
            className={`px-4 py-2 rounded-lg transition-all mb-2 sm:mb-0 sm:mr-2 ${
              isGlobalView
                ? 'bg-[#e0b44a] text-black font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Global Average
          </button>
          <button
            onClick={() => handleViewChange(false)}
            className={`px-4 py-2 rounded-lg transition-all ${
              !isGlobalView
                ? 'bg-[#e0b44a] text-black font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            SolaceGold Leaderboard
          </button>
        </div>
      </div>

      {/* Ranking Display */}
      <div 
        className="text-center bg-[#121212] rounded-2xl px-8 py-4"
      >
        {goldBalance === 0 ? (
          <div className="flex flex-col items-center bg-[#121212]/50 p-8 rounded-2xl backdrop-blur-sm border border-[#2a2a2a] hover:border-[#e0b44a] transition-all">
            <div className="mb-6">
              <div className="text-[#e0b44a] text-4xl mb-4">0.000 oz</div>
              <p className="text-base text-gray-400 max-w-md text-center">
                Start your journey into digital gold ownership. Join the {isGlobalView ? 'global elite' : 'SolaceGold community'} with your first purchase.
              </p>
            </div>
            <button
              onClick={handleBuyGold}
              className="group relative px-8 py-3 bg-gradient-to-r from-[#e0b44a] to-[#d4a43d] rounded-xl hover:from-[#e5bc5c] hover:to-[#deb154] transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
              <div className="flex items-center gap-3">
                <img src="https://i.postimg.cc/xTfNxywd/gold-bar-sign.png" alt="Gold Bar" className="w-5 h-5" />
                <span className="text-black font-semibold">Buy Your First Gold</span>
                <img src="https://i.postimg.cc/xTfNxywd/gold-bar-sign.png" alt="Gold Bar" className="w-5 h-5" />
              </div>
            </button>
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Secure storage • Instant transfers • No vault fees</span>
            </div>
          </div>
        ) : isGlobalView ? (
          <>
            <p className="text-3xl sm:text-4xl font-bold text-[#e0b44a] mb-4">
              Top {(100 - globalPercentile).toFixed(1)}%
            </p>
            <p className="text-sm sm:text-base text-gray-400">
              You are in the top {(100 - globalPercentile).toFixed(1)}% of global gold holders
            </p>
          </>
        ) : (
          <>
            <p className="text-3xl sm:text-4xl font-bold text-[#e0b44a] mb-4">
              #{leaderboardRank}
            </p>
            <p className="text-sm sm:text-base text-gray-400">
              Your rank on the SolaceGold leaderboard
            </p>
          </>
        )}
      </div>
    </div>
  )
} 