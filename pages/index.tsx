import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [goldPrice, setGoldPrice] = useState<string>('Loading...')

  useEffect(() => {
    async function updateGoldPrice() {
      try {
        const res = await fetch('https://data-asg.goldprice.org/dbXRates/EUR')
        const data = await res.json()
        const price = data?.items?.[0]?.xauPrice
        if (price) {
          setGoldPrice(`€${price.toFixed(2)} EUR`)
        } else {
          setGoldPrice('Unavailable')
        }
      } catch {
        setGoldPrice('Unavailable')
      }
    }

    updateGoldPrice()
    const interval = setInterval(updateGoldPrice, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Head>
        <title>Solace Gold – Buy Gold Instantly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f5f5f5] font-sans">
        {/* Dropdown Menu */}
        <div className="absolute top-4 right-6 z-50 group relative">
          <div className="relative">
            <button className="bg-[#e0b44a] text-black font-semibold px-5 py-2.5 rounded shadow-gold text-sm md:text-base">
              Menu
            </button>
            <div className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
              <a href="/about" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">About Us</a>
              <a href="/contact" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">Contact Us</a>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 pb-10 mt-20">
          <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Solace Gold Logo" className="w-52 h-auto mix-blend-lighten mb-6" />
          <h2 className="text-5xl font-bold leading-tight mb-4">
            <span className="text-[#e0b44a]">Gold,</span> Simplified
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl">
            Fully-backed, no vault, no delay. Ownership made effortless
          </p>
          <a href="/login" className="bg-[#e0b44a] text-black font-bold px-6 py-3 rounded-lg shadow-gold hover:bg-yellow-400 transition mb-10">
            Login
          </a>
        </section>

        {/* Steps Section */}
        <section className="px-6 pb-20 flex flex-col items-center gap-8">
          <div className="icon-box w-full md:w-2/3 lg:w-1/2 bg-[#121212] border border-[#2a2a2a] rounded-xl p-8 flex flex-col items-center justify-center gap-6 transition transform hover:-translate-y-1 hover:shadow-lg">
            <img src="https://i.postimg.cc/NFd4My3k/Chat-GPT-Image-Apr-25-2025-10-06-09-PM.png" alt="User icon" className="w-16 h-16" />
            <h3 className="text-lg font-semibold">Create an account</h3>
          </div>
          <div className="icon-box w-full md:w-2/3 lg:w-1/2 bg-[#121212] border border-[#2a2a2a] rounded-xl p-8 flex flex-col items-center justify-center gap-6 transition transform hover:-translate-y-1 hover:shadow-lg">
            <img src="https://i.postimg.cc/Zn54D2mp/Chat-GPT-Image-Apr-23-2025-10-16-28-PM.png" alt="Euro icon" className="w-20 h-20" />
            <h3 className="text-lg font-semibold">Deposit funds</h3>
          </div>
          <div className="icon-box w-full md:w-2/3 lg:w-1/2 bg-[#121212] border border-[#2a2a2a] rounded-xl p-8 flex flex-col items-center justify-center gap-6 transition transform hover:-translate-y-1 hover:shadow-lg">
            <img src="https://i.postimg.cc/mDbfzTfG/Chat-GPT-Image-Apr-23-2025-09-51-53-PM.png" alt="Gold bar icon" className="w-24 h-24" />
            <h3 className="text-lg font-semibold">Buy gold</h3>
          </div>
        </section>

        {/* Live Ticker */}
        <section className="py-8 text-center">
          <div className="text-xl text-[#e0b44a] mb-2">Live Gold Price</div>
          <div className="text-3xl font-bold text-[#e0b44a] animate-pulse">
            {goldPrice}
          </div>
        </section>

        <footer className="text-center text-sm text-gray-600 py-6 border-t border-gray-800">
          &copy; 2025 Solace Gold. All rights reserved.
        </footer>
      </div>
    </>
  )
}
