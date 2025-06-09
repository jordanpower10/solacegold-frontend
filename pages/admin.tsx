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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f5f5f5] font-sans relative">
        {/* Mobile-friendly menu */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d] border-b border-[#2a2a2a] px-4 py-3 flex justify-between items-center">
          <a href="/" className="flex items-center">
            <img
              src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png"
              alt="Solace Gold Logo"
              className="w-10 h-10"
            />
          </a>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-[#e0b44a] text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-400 transition text-sm"
          >
            Menu
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="fixed top-16 right-0 left-0 z-40 bg-gray-800 border-b border-[#2a2a2a] shadow-lg animate-fade-in">
            <a href="/dashboard" className="block px-6 py-3 text-sm text-white hover:bg-gray-700 border-b border-gray-700">
              Dashboard
            </a>
            <button
              onClick={async () => {
                await supabase.auth.signOut()
                router.push('/login')
              }}
              className="w-full text-left px-6 py-3 text-sm text-white hover:bg-gray-700"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col items-center px-4 py-6 mt-16">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#e0b44a]">Admin Panel</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl mb-6">
            {/* Site Holdings */}
            <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-2">Total Site Holdings</h2>
              <p className="text-xl md:text-2xl font-bold text-[#e0b44a]">
                ${siteValue.toLocaleString('en-US')}
              </p>
            </div>

            {/* Total Page Views */}
            <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-2">Total Page Views (7 Days)</h2>
              <p className="text-xl md:text-2xl font-bold text-[#e0b44a]">
                {totalViews.toLocaleString('en-US')}
              </p>
            </div>
          </div>

          {/* Page Views Table */}
          <div className="w-full max-w-6xl bg-[#121212] border border-[#2a2a2a] rounded-xl p-4 md:p-6 mb-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Page Views by Path</h2>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="min-w-[600px] md:w-full px-4 md:px-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-[#333]">
                      <th className="py-2 px-3 w-1/2 md:w-auto">Path</th>
                      <th className="py-2 px-3 w-1/4 md:w-auto">Total Views</th>
                      <th className="py-2 px-3">Last 7 Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(groupedPageViews).map((pageView) => (
                      <tr key={pageView.path} className="border-b border-[#2a2a2a] hover:bg-[#1d1d1d]">
                        <td className="py-3 px-3 max-w-[150px] md:max-w-[200px] truncate">{pageView.path}</td>
                        <td className="py-3 px-3 whitespace-nowrap">{pageView.total.toLocaleString('en-US')}</td>
                        <td className="py-3 px-3">
                          <div className="flex gap-1.5 flex-wrap">
                            {pageView.dailyViews.map((daily) => (
                              <span
                                key={daily.date}
                                className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#2a2a2a] text-xs whitespace-nowrap"
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
          </div>

          {/* User Table */}
          <div className="w-full max-w-6xl bg-[#121212] border border-[#2a2a2a] rounded-xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Registered Users</h2>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="min-w-[600px] md:w-full px-4 md:px-0">
                {users.length > 0 ? (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left border-b border-[#333]">
                        <th className="py-2 px-3 w-1/3 md:w-auto">Email</th>
                        <th className="py-2 px-3 w-1/6 md:w-auto">Cash ($)</th>
                        <th className="py-2 px-3 w-1/6 md:w-auto">Gold (oz)</th>
                        <th className="py-2 px-3 w-1/6 md:w-auto">Total Value ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-[#2a2a2a] hover:bg-[#1d1d1d]">
                          <td className="py-3 px-3 max-w-[150px] md:max-w-[200px] truncate">{user.email}</td>
                          <td className="py-3 px-3 whitespace-nowrap">${user.cashBalance.toLocaleString('en-US')}</td>
                          <td className="py-3 px-3 whitespace-nowrap">{user.goldBalance.toFixed(2)} oz</td>
                          <td className="py-3 px-3 whitespace-nowrap text-[#e0b44a]">${user.totalValue.toLocaleString('en-US')}</td>
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
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-600 py-6 mt-auto">
          © 2025 SolaceGold. All rights reserved.
        </footer>
      </div>
    </>
  )
}
