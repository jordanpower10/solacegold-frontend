import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [goldPrice, setGoldPrice] = useState<number | null>(null)
  const [goldHoldings, setGoldHoldings] = useState<number>(12.34) // Example gold in grams
  const clientName = "John Doe" // Example client name

  useEffect(() => {
    async function fetchGoldPrice() {
      try {
        const res = await fetch('https://data-asg.goldprice.org/dbXRates/EUR')
        const data = await res.json()
        const price = data?.items?.[0]?.xauPrice
        if (price) {
          setGoldPrice(price)
        }
      } catch {
        setGoldPrice(null)
      }
    }

    fetchGoldPrice()
    const interval = setInterval(fetchGoldPrice, 60000)
    return () => clearInterval(interval)
  }, [])

  const goldValueEUR = goldPrice ? (goldHoldings * goldPrice / 31.1035).toFixed(2) : 'Loading...'

  return (
    <>
      <Head>
        <title>Dashboard - Solace Gold</title>
      </Head>

      <div className="min-h-screen bg-[#0d0d0d] text-[#f5f5f5] font-sans px-4 py-6 md:px-12 md:py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Logo" className="w-12 h-12" />
            <h1 className="text-2xl font-bold">Welcome, {clientName}</h1>
          </div>
          <div className="hidden md:flex gap-4">
            <a href="/buy" className="bg-[#e0b44a] hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg transition">Buy Gold</a>
            <a href="/sell" className="bg-[#e0b44a] hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg transition">Sell Gold</a>
            <a href="/withdraw" className="bg-[#e0b44a] hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg transition">Withdraw</a>
          </div>
        </div>

        {/* Wallet Section */}
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-8 shadow-lg mb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#e0b44a33] to-transparent rounded-2xl pointer-events-none"></div>

          <h2 className="text-lg font-semibold mb-6">Your Gold Wallet</h2>

          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Circular Display */}
            <div className="w-40 h-40 rounded-full border-8 border-[#e0b44a] flex items-center justify-center text-center animate-pulse">
              <div>
                <div className="text-2xl font-bold">{goldHoldings}g</div>
                <div className="text-sm text-gray-400 mt-1">Gold Owned</div>
              </div>
            </div>

            {/* Holdings Info */}
            <div className="flex flex-col items-center md:items-start">
              <div className="text-gray-400 mb-1">Current Value</div>
              <div className="text-3xl font-bold text-[#e0b44a] mb-4">{goldValueEUR} EUR</div>
              <div className="flex flex-col gap-2 text-sm text-gray-500">
                <div>Vault Status: <span className="text-green-400">Secured</span></div>
                <div>Account Level: <span className="text-yellow-400">Basic</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-8 shadow-lg">
          <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
          <div className="flex flex-col gap-4 text-sm text-gray-300">
            <div className="flex justify-between border-b border-[#2a2a2a] pb-3">
              <div>➔ Bought 1g Gold</div>
              <div className="text-[#e0b44a]">€93.21</div>
            </div>
            <div className="flex justify-between border-b border-[#2a2a2a] pb-3">
              <div>➔ Sold 0.5g Gold</div>
              <div className="text-[#e0b44a]">€46.00</div>
            </div>
            <div className="flex justify-between">
              <div>➔ Withdrawal Initiated</div>
              <div className="text-[#e0b44a]">€200.00</div>
            </div>
          </div>
        </div>

        {/* Action Buttons for mobile */}
        <div className="flex md:hidden flex-col gap-4 mt-8">
          <a href="/buy" className="bg-[#e0b44a] hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg text-center transition">Buy Gold</a>
          <a href="/sell" className="bg-[#e0b44a] hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg text-center transition">Sell Gold</a>
          <a href="/withdraw" className="bg-[#e0b44a] hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg text-center transition">Withdraw</a>
        </div>
      </div>
    </>
  )
}
