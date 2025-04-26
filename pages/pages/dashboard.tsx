import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [goldPrice, setGoldPrice] = useState<number | null>(null)
  const [goldHoldings, setGoldHoldings] = useState<number>(12.34) // Example grams owned
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

      <div className="min-h-screen bg-[#0d0d0d] text-[#f5f5f5] font-sans px-6 py-8 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Solace Gold Logo" className="w-12 h-12" />
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1e1e1e] rounded-full flex items-center justify-center text-[#e0b44a] font-bold">
              {clientName.charAt(0)}
            </div>
            <span className="font-medium text-md">Hi, {clientName}</span>
          </div>
        </div>

        {/* Holdings Card */}
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-8 flex flex-col items-center shadow-lg mb-10 relative overflow-hidden">
          {/* Light glow behind */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#e0b44a22] to-transparent rounded-2xl pointer-events-none"></div>

          <h2 className="text-lg font-semibold mb-4">Your Gold Holdings</h2>
          <div className="text-4xl font-bold text-[#e0b44a] mb-2">{goldHoldings}g</div>
          <div className="text-gray-400 text-md mb-4">Current Value:</div>
          <div className="text-2xl font-bold text-[#e0b44a] mb-6">{goldValueEUR} EUR</div>

          {/* Progress Circle (fake %) */}
          <div className="w-32 h-32 border-4 border-[#e0b44a] rounded-full flex items-center justify-center mb-4 animate-pulse">
            <div className="text-[#e0b44a] font-bold text-md">Gold Wallet</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="/buy" className="flex-1 bg-[#e0b44a] hover:bg-yellow-400 text-black font-bold py-4 rounded-xl text-center shadow-md transition">
            Buy Gold
          </a>
          <a href="/sell" className="flex-1 bg-[#e0b44a] hover:bg-yellow-400 text-black font-bold py-4 rounded-xl text-center shadow-md transition">
            Sell Gold
          </a>
          <a href="/withdraw" className="flex-1 bg-[#e0b44a] hover:bg-yellow-400 text-black font-bold py-4 rounded-xl text-center shadow-md transition">
            Withdraw Funds
          </a>
        </div>

      </div>
    </>
  )
}
