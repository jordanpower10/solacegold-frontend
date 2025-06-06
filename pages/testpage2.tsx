import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import Globe from 'react-globe.gl'
import * as d3 from 'd3'

// Global statistics for gold holdings (approximate values)
const GLOBAL_STATS = {
  totalPopulation: 8000000000, // ~8 billion people
  goldHolders: {
    '0.1': 99.9, // 0.1 oz puts you in top 99.9%
    '1': 99.0,   // 1 oz puts you in top 99%
    '5': 95.0,   // 5 oz puts you in top 95%
    '10': 90.0,  // 10 oz puts you in top 90%
    '50': 80.0,  // 50 oz puts you in top 80%
    '100': 70.0, // 100 oz puts you in top 70%
  }
}

interface GlobePoint {
  lat: number
  lng: number
  size: number
  color: string
}

interface GlobeArc {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  color: string
}

interface GlobeData {
  points: GlobePoint[]
  arcs: GlobeArc[]
}

export default function TestPage2() {
  const [goldBalance, setGoldBalance] = useState(0)
  const [isGlobalView, setIsGlobalView] = useState(true)
  const [leaderboardRank, setLeaderboardRank] = useState(0)
  const [globalPercentile, setGlobalPercentile] = useState(0)
  const globeRef = useRef<any>(null)
  const router = useRouter()

  // Globe data
  const [globeData, setGlobeData] = useState<GlobeData>({
    points: [],
    arcs: []
  })

  useEffect(() => {
    // Fetch user's gold balance and rank
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

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
    initGlobeData()
  }, [router])

  // Calculate global percentile based on gold balance
  useEffect(() => {
    let percentile = 0
    for (const [amount, pct] of Object.entries(GLOBAL_STATS.goldHolders)) {
      if (goldBalance >= parseFloat(amount)) {
        percentile = pct
      }
    }
    setGlobalPercentile(percentile)
  }, [goldBalance])

  // Initialize globe data
  const initGlobeData = () => {
    // Create random points around the globe
    const points: GlobePoint[] = Array.from({ length: 100 }, () => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: Math.random() / 3,
      color: '#e0b44a'
    }))

    // Create arcs connecting points
    const arcs: GlobeArc[] = Array.from({ length: 50 }, () => {
      const startPoint = points[Math.floor(Math.random() * points.length)]
      const endPoint = points[Math.floor(Math.random() * points.length)]
      return {
        startLat: startPoint.lat,
        startLng: startPoint.lng,
        endLat: endPoint.lat,
        endLng: endPoint.lng,
        color: '#e0b44a'
      }
    })

    setGlobeData({ points, arcs })
  }

  return (
    <>
      <Head>
        <title>Gold Rankings - Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white font-sans">
        {/* Globe Container */}
        <div className="w-full h-[400px] relative">
          <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            pointsData={globeData.points}
            pointColor="color"
            pointAltitude={0.1}
            pointRadius="size"
            arcsData={globeData.arcs}
            arcColor="color"
            arcDashLength={1}
            arcDashGap={0.5}
            arcDashAnimateTime={2000}
            backgroundColor="rgba(0,0,0,0)"
          />
        </div>

        {/* Rankings Widget */}
        <div className="max-w-2xl mx-auto p-8">
          <div className="bg-[#121212] rounded-2xl border border-[#2a2a2a] p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#e0b44a] mb-2">Your Gold Holdings</h2>
              <p className="text-2xl font-semibold">{goldBalance.toFixed(2)} oz</p>
            </div>

            {/* Toggle Switch */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#1a1a1a] p-1 rounded-xl">
                <button
                  onClick={() => setIsGlobalView(true)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    isGlobalView
                      ? 'bg-[#e0b44a] text-black font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Global Average
                </button>
                <button
                  onClick={() => setIsGlobalView(false)}
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
            <div className="text-center">
              {isGlobalView ? (
                <>
                  <p className="text-4xl font-bold text-[#e0b44a] mb-4">
                    Top {(100 - globalPercentile).toFixed(1)}%
                  </p>
                  <p className="text-gray-400">
                    You are in the top {(100 - globalPercentile).toFixed(1)}% of global gold holders
                  </p>
                </>
              ) : (
                <>
                  <p className="text-4xl font-bold text-[#e0b44a] mb-4">
                    #{leaderboardRank}
                  </p>
                  <p className="text-gray-400">
                    Your rank on the SolaceGold leaderboard
                  </p>
                </>
              )}
            </div>

            {/* Additional Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a]">
                <p className="text-sm text-gray-400 mb-1">Value in USD</p>
                <p className="text-xl font-semibold">
                  ${(goldBalance * 2375).toLocaleString('en-US')}
                </p>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a]">
                <p className="text-sm text-gray-400 mb-1">Weight in Grams</p>
                <p className="text-xl font-semibold">
                  {(goldBalance * 31.1035).toFixed(2)}g
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
