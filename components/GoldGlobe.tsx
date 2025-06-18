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

interface Wallet {
  balance: number;
  wallet_type: string;
}

export default function GoldGlobe() {
  const [goldBalance, setGoldBalance] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchUserData = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession()
          if (!session) return

          const { data: wallet } = await supabase
            .from('wallets')
            .select('balance')
            .eq('user_id', session.user.id)
            .eq('wallet_type', 'gold')
            .single()

          if (wallet && typeof wallet.balance === 'number') {
            setGoldBalance(wallet.balance)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }

      fetchUserData()
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] animate-pulse"></div>
      <div 
        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#e0b44a]/20 to-transparent"
        style={{
          clipPath: `circle(${Math.min(100, goldBalance * 10)}% at center)`
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="https://i.postimg.cc/xTfNxywd/gold-bar-sign.png"
          alt="Gold Icon"
          className="w-8 h-8 opacity-80"
        />
      </div>
    </div>
  )
} 