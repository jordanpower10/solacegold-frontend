import React from 'react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import GoldPriceChart from '../components/GoldPriceChart'
import GoldGlobe from '../components/GoldGlobe'
import { motion } from 'framer-motion'
import {
  ArrowRightOnRectangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

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

  const goldPrice = 2375.00
  const dailyChangePercent = 1.42
  const accountValue = cashBalance + (goldBalance * goldPrice)

  // Handle logout
  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="text-[#e0b44a] text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Dashboard - Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-black text-white font-sans">
        {/* Top Navigation */}
        <nav className="flex justify-between items-center px-6 py-4 bg-[#121212]/50 backdrop-blur-lg border-b border-[#2a2a2a]">
          <div className="flex items-center gap-4">
            <img
              src="https://i.postimg.cc/wBT6H1j9/Gold-solace-logo.png"
              alt="Solace Gold Logo"
              className="w-10 h-10"
            />
            <span className="text-lg font-semibold">SolaceGold</span>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" /> Logout
          </button>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome back, {firstName}</h1>
            <p className="text-gray-400">Here's your financial overview</p>
          </div>

          {/* Account Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Value Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                <span className="text-green-400">+2.5%</span>
                <span className="text-gray-400">This month</span>
              </div>
            </motion.div>

            {/* Cash Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
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
              transition={{ delay: 0.2 }}
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
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/deposit')}
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
              onClick={() => router.push('/withdraw')}
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
              onClick={() => router.push('/buy')}
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
              onClick={() => router.push('/sell')}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a] hover:border-[#e0b44a] transition-all text-center"
            >
              <div className="bg-red-500/10 p-3 rounded-xl mx-auto mb-3 w-fit">
                <CurrencyDollarIcon className="w-6 h-6 text-red-500" />
              </div>
              <span className="text-sm font-medium">Sell Gold</span>
            </motion.button>
          </div>

          {/* Charts and Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Price Chart */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-[#2a2a2a] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Gold Price</h2>
                <div className="flex items-center gap-3">
                  <span className="text-[#e0b44a] font-medium">${goldPrice.toLocaleString('en-US')}</span>
                  <span className="text-green-400">+{dailyChangePercent}%</span>
                </div>
              </div>
              <div className="h-[300px]">
                <GoldPriceChart />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-[#2a2a2a] p-6">
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
            </div>
          </div>

          {/* Global Gold Distribution */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-[#2a2a2a] p-6">
            <h2 className="text-base font-medium mb-6">Global Gold Distribution</h2>
            <div className="h-[400px]">
              <GoldGlobe />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}