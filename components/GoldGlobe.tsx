import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

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

export default function GoldGlobe() {
  const [isGlobalView, setIsGlobalView] = useState(true)
  const [leaderboardRank, setLeaderboardRank] = useState(0)
  const [globalPercentile, setGlobalPercentile] = useState(0)
  const [goldBalance, setGoldBalance] = useState(0)
  const [hasSelected, setHasSelected] = useState(false)

  // Fetch user data and calculate rankings
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      // Get user's gold balance
      const { data: wallets } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', session.user.id)
        .eq('wallet_type', 'gold')
        .single()

      if (wallets) {
        setGoldBalance(wallets.balance || 0)
      }

      // Get user's leaderboard rank
      const { count } = await supabase
        .from('wallets')
        .select('*', { count: 'exact', head: true })
        .eq('wallet_type', 'gold')
        .gt('balance', wallets?.balance || 0)

      setLeaderboardRank((count || 0) + 1)
    }

    fetchUserData()
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
      {hasSelected && (
        <div className="text-center bg-[#121212] rounded-2xl px-8 py-4">
          {goldBalance === 0 ? (
            <p className="text-sm sm:text-base text-gray-400">
              {isGlobalView 
                ? "You haven't bought any gold yet, join the global average when you make your first purchase"
                : "You haven't bought any gold yet, join the leaderboard when you make your first purchase"
              }
            </p>
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
      )}
    </div>
  )
} 