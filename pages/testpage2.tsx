import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import dynamic from 'next/dynamic'
import * as d3 from 'd3'

// Dynamically import the Globe component with SSR disabled
const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-[#0d0d0d]">
      <div className="text-[#e0b44a]">Loading Globe...</div>
    </div>
  )
})

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

// Major gold producing/holding locations (approximate coordinates)
const GOLD_LOCATIONS = [
  { lat: 37.7749, lng: -122.4194, name: 'San Francisco', size: 0.8 }, // COMEX
  { lat: 51.5074, lng: -0.1278, name: 'London', size: 1 }, // LBMA
  { lat: 35.6762, lng: 139.6503, name: 'Tokyo', size: 0.7 }, // Japan
  { lat: -33.8688, lng: 151.2093, name: 'Sydney', size: 0.6 }, // Australia
  { lat: 47.3769, lng: 8.5417, name: 'Zurich', size: 0.9 }, // Switzerland
  { lat: 40.7128, lng: -74.0060, name: 'New York', size: 0.8 }, // NYSE
  { lat: 26.2285, lng: 50.5860, name: 'Dubai', size: 0.7 }, // UAE
  { lat: -26.2041, lng: 28.0473, name: 'Johannesburg', size: 0.8 }, // South Africa
  { lat: 39.9042, lng: 116.4074, name: 'Beijing', size: 0.9 }, // China
  { lat: 19.0760, lng: 72.8777, name: 'Mumbai', size: 0.7 }, // India
];

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
    // Only initialize globe data in browser environment
    if (typeof window !== 'undefined') {
      initGlobeData()
    }
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
    const points = GOLD_LOCATIONS.map(location => ({
      lat: location.lat,
      lng: location.lng,
      size: location.size,
      color: '#ffd700',
      name: location.name
    }));

    setGlobeData({ 
      points,
      arcs: [] // We're not using arcs anymore
    });
  }

  return (
    <>
      <Head>
        <title>Gold Rankings - Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white font-sans">
        {/* Globe Container - Now smaller and positioned above the box */}
        <div className="w-full flex justify-center mb-8">
          <div className="w-[300px] h-[300px] relative">
            {typeof window !== 'undefined' && (
              <Globe
                ref={globeRef}
                width={300}
                height={300}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                pointsData={globeData.points}
                pointColor="color"
                pointAltitude={0.1}
                pointRadius="size"
                pointsMerge={true}
                pointLabel="name"
                backgroundColor="rgba(0,0,0,0)"
                atmosphereColor="#ffd70030"
                atmosphereAltitude={0.25}
              />
            )}
          </div>
        </div>

        {/* Rankings Widget */}
        <div className="max-w-2xl mx-auto p-8">
          <div className="bg-[#121212] rounded-2xl border border-[#2a2a2a] p-8 shadow-xl">
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
          </div>
        </div>
      </div>
    </>
  )
}
