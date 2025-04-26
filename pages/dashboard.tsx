import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [goldPrice, setGoldPrice] = useState<number | null>(null)
  const [goldHoldings, setGoldHoldings] = useState<number>(12.34) // example grams owned
  const clientName = "John Doe" // example client name

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

  const goldValueEUR = goldPrice ? (goldHoldings * goldPrice / 31.1035).toFixed(2) : 'Loading...' // 1 troy oz = 31.1035g

  return (
    <>
      <Head>
        <title>Dashboard - Solace Gold</title>
      </Head>

      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f5f5f5] font-sans px-6 py-10">
        
        <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Solace Gold Logo" className="w-32 h-auto mb-8" />

        <h1 className="text-3xl font-bold mb-4">Hi, {clientName}</h1>

        <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-8 flex flex-col items-center justify-center gap-6 mb-10">
          <h2 className="text-2xl font-semibold">Your Gold Holdings</h2>
          <div className="text-xl text-[#e0b44a]">{goldHoldings} grams</div>
          <div className="text-md text-gray-400">
            Current Value: <span className="text-[#e0b44a]">{goldValueEUR} EUR</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <a href="/buy" className="bg-[#e0b44a] text-black font-bold px-6 py-4 rounded-lg shadow-gold hover:bg-yellow-400 transition text-center">
            Buy Gold
          </a>
          <a href="/sell" className="bg-[#e0b44a] text-black font-bold px-6 py-4 rounded-lg shadow-gold hover:bg-yellow-400 transition text-center">
            Sell Gold
          </a>
          <a href="/withdraw" className="bg-[#e0b44a] text-black font-bold px-6 py-4 rounded-lg shadow-gold hover:bg-yellow-400 transition text-center">
            Withdraw Funds
          </a>
        </div>

      </div>
    </>
  )
}
