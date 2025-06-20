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

// Major gold regions (approximate coordinates with area coverage)
const GOLD_REGIONS = [
  {
    // North America (COMEX/NYSE region)
    coordinates: [
      [45, -130], [45, -70],
      [30, -70], [30, -130]
    ],
    name: 'North America'
  },
  {
    // Western Europe (London/Zurich)
    coordinates: [
      [55, -10], [55, 10],
      [45, 10], [45, -10]
    ],
    name: 'Western Europe'
  },
  {
    // East Asia (Tokyo/Shanghai)
    coordinates: [
      [45, 115], [45, 145],
      [30, 145], [30, 115]
    ],
    name: 'East Asia'
  },
  {
    // Middle East (Dubai)
    coordinates: [
      [30, 45], [30, 60],
      [20, 60], [20, 45]
    ],
    name: 'Middle East'
  },
  {
    // South Africa
    coordinates: [
      [-20, 15], [-20, 35],
      [-30, 35], [-30, 15]
    ],
    name: 'South Africa'
  },
  {
    // Australia
    coordinates: [
      [-25, 115], [-25, 155],
      [-35, 155], [-35, 115]
    ],
    name: 'Australia'
  }
];

interface GlobePolygon {
  coordinates: number[][];
  name: string;
}

interface GlobeData {
  polygons: GlobePolygon[];
}

interface Wallet {
  wallet_type: string;
  balance: number;
}

export default function TestPage2() {
  const [goldBalance, setGoldBalance] = useState(0)
  const [isGlobalView, setIsGlobalView] = useState(true)
  const [leaderboardRank, setLeaderboardRank] = useState(0)
  const [globalPercentile, setGlobalPercentile] = useState(0)
  const [globeSize, setGlobeSize] = useState(300)
  const globeRef = useRef<any>(null)
  const router = useRouter()

  // Globe data
  const [globeData, setGlobeData] = useState<GlobeData>({
    polygons: []
  })

  // Handle window resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setGlobeSize(window.innerWidth < 640 ? 280 : 300)
      }
      handleResize() // Set initial size
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

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
    setGlobeData({ 
      polygons: GOLD_REGIONS
    });
  }

  return (
    <>
      <Head>
        <title>Gold Rankings - Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white font-sans py-8">
        {/* Globe Container */}
        <div className="w-full flex justify-center mb-8">
          <div className={`w-[${globeSize}px] h-[${globeSize}px] relative`}>
            {typeof window !== 'undefined' && (
              <Globe
                ref={globeRef}
                width={globeSize}
                height={globeSize}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                hexPolygonsData={globeData.polygons}
                hexPolygonResolution={3}
                hexPolygonMargin={0.3}
                hexPolygonColor={() => `rgba(255, 215, 0, 0.15)`}
                hexPolygonLabel={(d: any) => (d as GlobePolygon).name}
                backgroundColor="rgba(0,0,0,0)"
                atmosphereColor="#ffd70030"
                atmosphereAltitude={0.25}
              />
            )}
          </div>
        </div>

        {/* Rankings Widget */}
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-[#121212] rounded-2xl border border-[#2a2a2a] p-4 sm:p-8 shadow-xl">
            {/* Toggle Switch */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#1a1a1a] p-1 rounded-xl flex flex-col sm:flex-row w-full sm:w-auto">
                <button
                  onClick={() => setIsGlobalView(true)}
                  className={`px-4 py-2 rounded-lg transition-all mb-2 sm:mb-0 sm:mr-2 ${
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
        </div>
      </div>
    </>
  )
}
