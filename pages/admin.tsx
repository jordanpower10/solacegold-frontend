import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

interface PageView {
  path: string
  view_count: number
  view_date: string
  created_at: string
  updated_at: string
}

interface GroupedPageView {
  path: string
  total: number
  dailyViews: Array<{
    date: string
    count: number
  }>
}

interface User {
  id: string
  email: string
  cashBalance: number
  goldBalance: number
  totalValue: number
}

export default function AdminPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [siteValue, setSiteValue] = useState(0)
  const [loading, setLoading] = useState(true)
  const [pageViews, setPageViews] = useState<PageView[]>([])
  const [totalViews, setTotalViews] = useState(0)
  const router = useRouter()
  let timeoutId: NodeJS.Timeout

  const goldPrice = 2375.00 // Example USD price, update as needed

  useEffect(() => {
    const fetchAdminData = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login')
        return
      }

      // Fetch the current user's role
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (profileError || !profileData || profileData.role !== 'admin') {
        router.push('/dashboard')
        return
      }

      // Fetch all users from profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email')

      if (profilesError) {
        console.error('❌ Error fetching profiles:', profilesError)
        return
      }

      // Fetch wallets
      const { data: wallets, error: walletsError } = await supabase
        .from('wallets')
        .select('user_id, wallet_type, balance')

      if (walletsError) {
        console.error('❌ Error fetching wallets:', walletsError)
        return
      }

      // Fetch page views for the last 7 days
      const { data: views, error: viewsError } = await supabase
        .from('page_views')
        .select('*')
        .gte('view_date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('view_date', { ascending: false })

      if (viewsError) {
        console.error('❌ Error fetching page views:', viewsError)
      } else {
        setPageViews(views || [])
        setTotalViews(views ? views.reduce((sum, view) => sum + view.view_count, 0) : 0)
      }

      // Match user balances
      const userData = profiles.map((profile) => {
        const userWallets = wallets.filter(w => w.user_id === profile.id)

        const cashWallet = userWallets.find(w => w.wallet_type === 'cash')
        const goldWallet = userWallets.find(w => w.wallet_type === 'gold')

        const cashBalance = cashWallet ? cashWallet.balance : 0
        const goldBalance = goldWallet ? goldWallet.balance : 0
        const totalValue = cashBalance + (goldBalance * goldPrice)

        return {
          id: profile.id,
          email: profile.email,
          cashBalance,
          goldBalance,
          totalValue
        }
      })

      setUsers(userData)

      const totalSiteValue = userData.reduce((sum, user) => sum + user.totalValue, 0)
      setSiteValue(totalSiteValue)

      setLoading(false)
    }

    fetchAdminData()
  }, [router])

  // Group page views by path
  const groupedPageViews = pageViews.reduce<Record<string, GroupedPageView>>((acc, view) => {
    const path = view.path
    if (!acc[path]) {
      acc[path] = {
        path,
        total: 0,
        dailyViews: []
      }
    }
    acc[path].total += view.view_count
    acc[path].dailyViews.push({
      date: view.view_date,
      count: view.view_count
    })
    return acc
  }, {})

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    )
  }

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
          <button className="bg-[#e0b44a] text-black font-semibold px-5 py-3 rounded-md hover:bg-yellow-400 transition text-sm">
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

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mb-8">
            {/* Site Holdings */}
            <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-2">Total Site Holdings</h2>
              <p className="text-2xl font-bold text-[#e0b44a]">
                ${siteValue.toLocaleString('en-US')}
              </p>
            </div>

            {/* Total Page Views */}
            <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-2">Total Page Views (7 Days)</h2>
              <p className="text-2xl font-bold text-[#e0b44a]">
                {totalViews.toLocaleString('en-US')}
              </p>
            </div>
          </div>

          {/* Page Views Table */}
          <div className="w-full max-w-6xl bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Page Views by Path</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-[#333]">
                    <th className="py-2 px-3">Path</th>
                    <th className="py-2 px-3">Total Views</th>
                    <th className="py-2 px-3">Last 7 Days</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(groupedPageViews).map((pageView) => (
                    <tr key={pageView.path} className="border-b border-[#2a2a2a] hover:bg-[#1d1d1d]">
                      <td className="py-3 px-3">{pageView.path}</td>
                      <td className="py-3 px-3">{pageView.total.toLocaleString('en-US')}</td>
                      <td className="py-3 px-3">
                        <div className="flex gap-2 flex-wrap">
                          {pageView.dailyViews.map((daily) => (
                            <span
                              key={daily.date}
                              className="inline-flex items-center px-2 py-1 rounded bg-[#2a2a2a] text-xs"
                              title={new Date(daily.date).toLocaleDateString()}
                            >
                              {daily.count}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Table */}
          <div className="w-full max-w-6xl bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
            {users.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-[#333]">
                    <th className="py-2 px-3">Email</th>
                    <th className="py-2 px-3">Cash ($)</th>
                    <th className="py-2 px-3">Gold (oz)</th>
                    <th className="py-2 px-3">Total Value ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-[#2a2a2a] hover:bg-[#1d1d1d]">
                      <td className="py-3 px-3">{user.email}</td>
                      <td className="py-3 px-3">${user.cashBalance.toLocaleString('en-US')}</td>
                      <td className="py-3 px-3">{user.goldBalance.toFixed(2)} oz</td>
                      <td className="py-3 px-3 text-[#e0b44a]">${user.totalValue.toLocaleString('en-US')}</td>
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
