import React from 'react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import GoldPriceChart from '../components/GoldPriceChart'
import GoldGlobe from '../components/GoldGlobe'
import InvestmentAlgorithm from '../components/InvestmentAlgorithm'
import MirrorAIReport from '../components/MirrorAIReport'
import Footer from '../components/Footer'
import AppLayout from '../components/AppLayout'
import { motion } from 'framer-motion'
import { isMobileApp } from '../utils/mobileUtils'
import {
  ArrowRightOnRectangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { useVibration } from '../hooks/useVibration'

interface Profile {
  first_name: string;
  last_name: string;
}

interface Wallet {
  wallet_type: string;
  balance: number;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  created_at: string;
}

export default function Dashboard() {
  const [userName, setUserName] = useState('User')
  const [firstName, setFirstName] = useState('User')
  const [cashBalance, setCashBalance] = useState(0)
  const [goldBalance, setGoldBalance] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const [timeframe, setTimeframe] = useState('1M')
  const [goldPrice, setGoldPrice] = useState(0)
  const [dailyChangePercent, setDailyChangePercent] = useState(0)
  const [portfolioChange, setPortfolioChange] = useState({ percent: 0, direction: 'neutral' as 'up' | 'down' | 'neutral' })
  const [globalPercentile, setGlobalPercentile] = useState(0)
  const [isGlobalView, setIsGlobalView] = useState(true)
  const [leaderboardRank, setLeaderboardRank] = useState(0)
  const [reportCount, setReportCount] = useState(0)

  const accountValue = cashBalance + (goldBalance * goldPrice)

  // Handle logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      // Clear any local storage or session storage
      localStorage.clear()
      sessionStorage.clear()
      // Force a hard redirect to the index page
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleLogoutWithVibration = useVibration(handleLogout)
  const handleBuyWithVibration = useVibration(() => router.push('/buy'))
  const handleSellWithVibration = useVibration(() => router.push('/sell'))
  const handleDepositWithVibration = useVibration(() => router.push('/deposit'))
  const handleWithdrawWithVibration = useVibration(() => router.push('/withdraw'))

  const handleViewReports = () => {
    // TODO: Implement view reports functionality
    console.log('View reports clicked')
  }

  const handleGenerateNew = () => {
    // TODO: Implement generate new report functionality
    console.log('Generate new clicked')
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchData = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession()

          if (!session) {
            router.push('/login')
            return
          }

          const userId = session.user.id

          const { data: profileData } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', userId)
            .single()

          if (profileData) {
            const typedProfile = profileData as Profile
            setUserName(typedProfile.first_name || 'User')
            setFirstName(typedProfile.first_name || 'User')
          }

          const { data: wallets } = await supabase
            .from('wallets')
            .select('wallet_type, balance')
            .eq('user_id', userId)

          if (wallets) {
            const typedWallets = wallets as Wallet[]
            typedWallets.forEach((wallet) => {
              if (wallet.wallet_type === 'cash') {
                setCashBalance(wallet.balance)
              } else if (wallet.wallet_type === 'gold') {
                setGoldBalance(wallet.balance)
              }
            })
          }

          const { data: txs } = await supabase
            .from('transactions')
            .select('id, type, amount, created_at')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(5)

          if (txs) {
            setTransactions(txs as Transaction[])
          }
        } catch (error) {
          console.error('Error fetching data:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [router])

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch('/api/gold-price')
        const data = await response.json()
        setGoldPrice(data.price)
        setDailyChangePercent(data.change24h)
      } catch (error) {
        console.error('Error fetching gold price:', error)
      }
    }
    fetchGoldPrice()
    const interval = setInterval(fetchGoldPrice, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchPortfolioChange = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user?.id) return

      try {
        const { data: transactions } = await supabase
          .from('transactions')
          .select('amount, created_at, type')
          .eq('user_id', session.user.id)
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
          .order('created_at', { ascending: true })

        if (transactions && transactions.length > 0) {
          const startBalance = Number(transactions[0].amount)
          const endBalance = accountValue
          const changePercent = ((endBalance - startBalance) / startBalance) * 100
          setPortfolioChange({
            percent: Math.abs(changePercent),
            direction: changePercent >= 0 ? 'up' : 'down'
          })
        }
      } catch (error) {
        console.error('Error fetching portfolio change:', error)
      }
    }
    
    fetchPortfolioChange()
  }, [accountValue])

  useEffect(() => {
    const fetchGlobalPercentile = async () => {
      try {
        const response = await fetch('/api/global-percentile')
        const data = await response.json()
        setGlobalPercentile(data.percentile)
      } catch (error) {
        console.error('Error fetching global percentile:', error)
      }
    }
    fetchGlobalPercentile()
  }, [])

  useEffect(() => {
    const fetchLeaderboardRank = async () => {
      try {
        const response = await fetch('/api/leaderboard-rank')
        const data = await response.json()
        setLeaderboardRank(data.rank)
      } catch (error) {
        console.error('Error fetching leaderboard rank:', error)
      }
    }
    fetchLeaderboardRank()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <motion.img
            src="https://i.postimg.cc/wBT6H1j9/Gold-solace-logo.png"
            alt="Solace Gold Logo"
            className="w-16 h-16 mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <div className="bg-[#1a1a1a] rounded-lg px-4 py-2 shadow-lg">
            <span className="text-[#e0b44a] text-sm font-medium">Loading...</span>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <AppLayout>
      <Head>
        <title>Dashboard - Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-black text-white font-sans">
        {/* Top Navigation - Only show on non-mobile app */}
        {!isMobileApp() && (
          <nav className="flex justify-between items-center px-4 sm:px-6 py-4 bg-[#121212]/50 backdrop-blur-lg border-b border-[#2a2a2a]">
            <div className="flex items-center gap-4">
              <img
                src="https://i.postimg.cc/wBT6H1j9/Gold-solace-logo.png"
                alt="Solace Gold Logo"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <span className="text-base sm:text-lg font-semibold">SolaceGold</span>
            </div>
            <button
              onClick={handleLogoutWithVibration}
              onTouchStart={handleLogoutWithVibration}
              className="flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors px-4 py-2.5 rounded-lg hover:bg-[#2a2a2a] min-w-[44px] min-h-[44px] active:bg-[#3a3a3a] touch-manipulation"
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </nav>
        )}

        {/* Mobile App Header */}
        {isMobileApp() && (
          <div className="px-4 pt-6 pb-2">
            <img
              src="https://i.postimg.cc/wBT6H1j9/Gold-solace-logo.png"
              alt="Solace Gold Logo"
              className="w-10 h-10"
            />
          </div>
        )}

        {/* Main Content */}
        <div className={`max-w-7xl mx-auto px-4 py-8 ${isMobileApp() ? 'pt-2' : ''}`}>
          {/* Welcome Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold mb-2">Welcome back, {firstName}</h1>
            <p className="text-gray-400">Here's your financial overview</p>
          </motion.div>

          {/* Account Overview */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {/* Total Value Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a] hover:border-[#e0b44a] transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Total Value</p>
                  <h2 className="text-2xl font-bold">${accountValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                </div>
                <div className="bg-[#e0b44a]/10 p-2 rounded-lg">
                  <CurrencyDollarIcon className="w-5 h-5 text-[#e0b44a]" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {accountValue > 0 ? (
                  <>
                    <span className={portfolioChange.direction === 'up' ? 'text-green-400' : 'text-red-400'}>
                      {portfolioChange.direction === 'up' ? '+' : '-'}{portfolioChange.percent.toFixed(2)}%
                    </span>
                    <span className="text-gray-400">This month</span>
                  </>
                ) : (
                  <span className="text-gray-400">No balance history</span>
                )}
              </div>
            </motion.div>

            {/* Cash Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a] hover:border-[#e0b44a] transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Cash Balance</p>
                  <h2 className="text-2xl font-bold">${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                </div>
                <div className="bg-blue-500/10 p-2 rounded-lg">
                  <ArrowUpIcon className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Available for trading</span>
              </div>
            </motion.div>

            {/* Gold Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a] hover:border-[#e0b44a] transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Gold Balance</p>
                  <h2 className="text-2xl font-bold">{goldBalance.toFixed(3)} oz</h2>
                </div>
                <div className="bg-[#e0b44a]/10 p-2 rounded-lg">
                  <ChartBarIcon className="w-5 h-5 text-[#e0b44a]" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#e0b44a]">${(goldBalance * goldPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                <span className="text-gray-400">Current value</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDepositWithVibration}
              onTouchStart={handleDepositWithVibration}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a] hover:border-[#e0b44a] transition-all text-center"
            >
              <div className="bg-blue-500/10 p-3 rounded-xl mx-auto mb-3 w-fit">
                <ArrowDownIcon className="w-6 h-6 text-blue-500" />
              </div>
              <span className="text-sm font-medium">Deposit</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWithdrawWithVibration}
              onTouchStart={handleWithdrawWithVibration}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a] hover:border-[#e0b44a] transition-all text-center"
            >
              <div className="bg-purple-500/10 p-3 rounded-xl mx-auto mb-3 w-fit">
                <ArrowUpIcon className="w-6 h-6 text-purple-500" />
              </div>
              <span className="text-sm font-medium">Withdraw</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBuyWithVibration}
              onTouchStart={handleBuyWithVibration}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a] hover:border-[#e0b44a] transition-all text-center"
            >
              <div className="bg-green-500/10 p-3 rounded-xl mx-auto mb-3 w-fit">
                <ChartBarIcon className="w-6 h-6 text-green-500" />
              </div>
              <span className="text-sm font-medium">Buy Gold</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSellWithVibration}
              onTouchStart={handleSellWithVibration}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a] hover:border-[#e0b44a] transition-all text-center"
            >
              <div className="bg-red-500/10 p-3 rounded-xl mx-auto mb-3 w-fit">
                <CurrencyDollarIcon className="w-6 h-6 text-red-500" />
              </div>
              <span className="text-sm font-medium">Sell Gold</span>
            </motion.button>
          </motion.div>

          {/* Charts and Activity Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            {/* Price Chart */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-[#2a2a2a] p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold">Gold Price</h2>
                  <span className="text-[#e0b44a] font-medium">${goldPrice.toLocaleString('en-US')}</span>
                  <span className="text-green-400">+{dailyChangePercent}%</span>
                </div>
                <div className="flex gap-2">
                  {['1M', '3M', '6M', '1Y'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimeframe(period)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                        timeframe === period
                          ? 'bg-[#e0b44a] text-black'
                          : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-[240px]">
                <GoldPriceChart timeframe={timeframe} />
              </div>
            </div>

            {/* Market Signal and Mirror AI Report */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full space-y-6"
            >
              <InvestmentAlgorithm />
              <MirrorAIReport 
                onViewReports={handleViewReports}
                onGenerateNew={handleGenerateNew}
                reportCount={reportCount}
              />
            </motion.div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-[#2a2a2a] p-6 mb-8"
          >
            <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-[#121212]/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        tx.type === 'deposit' ? 'bg-green-500/10 text-green-500' :
                        tx.type === 'withdraw' ? 'bg-red-500/10 text-red-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}>
                        {tx.type === 'deposit' ? <ArrowDownIcon className="w-5 h-5" /> :
                         tx.type === 'withdraw' ? <ArrowUpIcon className="w-5 h-5" /> :
                         <ChartBarIcon className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</p>
                        <p className="text-xs text-gray-400">{new Date(tx.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">No recent activity</div>
              )}
            </div>
          </motion.div>

          {/* Global Gold Distribution */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-[#2a2a2a] p-4 max-w-[400px] mx-auto overflow-hidden"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <h2 className="text-sm font-medium mb-2 text-gray-400">Global Gold Distribution</h2>
                <div className="flex gap-2 p-1 bg-[#121212] rounded-lg">
                  <button
                    onClick={() => setIsGlobalView(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isGlobalView
                        ? 'bg-[#e0b44a] text-black'
                        : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
                    }`}
                  >
                    Global Rankings
                  </button>
                  <button
                    onClick={() => setIsGlobalView(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      !isGlobalView
                        ? 'bg-[#e0b44a] text-black'
                        : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
                    }`}
                  >
                    SolaceGold Leaderboard
                  </button>
                </div>
              </div>

              {goldBalance === 0 ? (
                <div className="text-center p-4">
                  <p className="text-gray-400 mb-4">
                    {isGlobalView 
                      ? "To join the Global Rankings start your journey with SolaceGold"
                      : "To join the Solacegold Leaderboard start your journey with SolaceGold"
                    }
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/buy')}
                    className="px-6 py-2 bg-gradient-to-r from-[#e0b44a]/20 to-[#e0b44a]/10 rounded-lg border border-[#e0b44a]/20 hover:border-[#e0b44a]/40 transition-all text-[#e0b44a] text-sm"
                  >
                    Buy Gold
                  </motion.button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                  <div className="text-center sm:text-left">
                    {isGlobalView ? (
                      <>
                        <div className="text-2xl font-bold text-[#e0b44a]">{goldBalance.toFixed(3)} oz</div>
                        <div className="text-sm text-gray-400 mt-1">
                          Top {(100 - globalPercentile).toFixed(1)}% globally
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-[#e0b44a]">#{leaderboardRank}</div>
                        <div className="text-sm text-gray-400 mt-1">
                          Your rank on SolaceGold
                        </div>
                      </>
                    )}
                  </div>
                  <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px]">
                    <GoldGlobe />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Only show footer on non-mobile app */}
        {!isMobileApp() && <Footer />}
      </div>
    </AppLayout>
  )
}