import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

export default function AdminPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [siteValue, setSiteValue] = useState(0)
  const router = useRouter()
  let timeoutId: NodeJS.Timeout

  const goldPrice = 2922.01 // Current gold price (can be dynamic later)

  useEffect(() => {
    const fetchAdminData = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (!session || sessionError) {
        router.push('/login')
        return
      }

      // Fetch the current user's role
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (profileError || profileData?.role !== 'admin') {
        router.push('/dashboard') // Redirect non-admins
        return
      }

      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name')

      if (profilesError) {
        console.error('❌ Error fetching profiles:', profilesError)
        return
      }

      // Fetch all wallets
      const { data: wallets, error: walletsError } = await supabase
        .from('wallets')
        .select('user_id, wallet_type, balance')

      if (walletsError) {
        console.error('❌ Error fetching wallets:', walletsError)
        return
      }

      // Match balances to users
      const userData = profiles.map((profile) => {
        const userWallets = wallets.filter(w => w.user_id === profile.id)

        const cashWallet = userWallets.find(w => w.wallet_type === 'cash')
        const goldWallet = userWallets.find(w => w.wallet_type === 'gold')

        const cashBalance = cashWallet ? cashWallet.balance : 0
        const goldBalance = goldWallet ? goldWallet.balance : 0
        const totalBalance = cashBalance + (goldBalance * goldPrice)

        return {
          id: profile.id,
          full_name: profile.full_name,
          cashBalance,
          goldBalance,
          totalBalance,
        }
      })

      setUsers(userData)

      // Calculate site total
      const totalSiteValue = userData.reduce((sum, user) => sum + user.totalBalance, 0)
      setSiteValue(totalSiteValue)
    }

    fetchAdminData()
  }, [router])

  return (
    <>
      <Head>
        <title>Admin Dashboard – Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f5f5f5] font-sans relative">
        {/* Dropdown */}
        <div
          className="absolute top-4 right-6 z-50"
          onMouseEnter={() => {
            clearTimeout(timeoutId)
            setIsMenuOpen(true)
          }}
          onMouseLeave={() => {
            timeoutId = setTimeout(() => setIsMenuOpen(false), 200)
          }}
        >
          <button className="bg-[#e0b44a] text-black font-semibold px-5 py-3 rounded-md shadow-gold hover:bg-yellow-400 transition text-sm">
            Menu
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg">
              <a href="/dashboard" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">Dashboard</a>
              <button
                onClick={async () => {
                  await supabase.auth.signOut()
                  router.push('/login')
                }}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col items-center px-4 py-10 mt-20">
          <a href="/" className="mb-6">
            <img
              src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png"
              alt="Solace Gold Logo"
              className="w-20 h-20"
            />
          </a>

          <h1 className="text-3xl font-bold mb-4 text-[#e0b44a]">Admin Panel</h1>

          {/* Total Site Holdings */}
          <div className="text-2xl font-semibold text-white mb-8">
            Total Site Holdings: <span className="text-[#e0b44a]">€{siteValue.toLocaleString('de-DE')}</span>
          </div>

          {/* User Table */}
          <div className="w-full max-w-6xl bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
            {users.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-[#333]">
                    <th className="py-2 px-3">Name</th>
                    <th className="py-2 px-3">Cash (€)</th>
                    <th className="py-2 px-3">Gold (oz)</th>
                    <th className="py-2 px-3">Total Value (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-[#2a2a2a] hover:bg-[#1d1d1d]">
                      <td className="py-3 px-3">{user.full_name}</td>
                      <td className="py-3 px-3">€{user.cashBalance.toLocaleString('de-DE')}</td>
                      <td className="py-3 px-3">{user.goldBalance.toFixed(2)} oz</td>
                      <td className="py-3 px-3 text-[#e0b44a]">€{user.totalBalance.toLocaleString('de-DE')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-400">No users found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
