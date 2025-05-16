import Head from 'next/head'
import { useEffect, useState } from 'react'
import GoldPriceChart from '../components/GoldPriceChart' // Make sure this path matches your file structure

export default function Home() {
  const [goldPrice, setGoldPrice] = useState<number | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  let timeoutId: NodeJS.Timeout

  useEffect(() => {
    async function updateGoldPrice() {
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

    updateGoldPrice()
    const interval = setInterval(updateGoldPrice, 60000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    return `€${price.toFixed(2)} EUR`
  }

  const calculateDiscountedPrice = (price: number) => {
    return price * 0.95 // 5% deduction
  }

  return (
    <>
      <Head>
        <title>Solace Gold – Buy Gold Instantly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f5f5f5] font-sans relative">
        {/* Dropdown Menu */}
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
              <a href="/about" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">About Us</a>
              <a href="/contact" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">Contact Us</a>
            </div>
          )}
        </div>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 pb-10 mt-20">
          <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Solace Gold Logo" className="w-52 h-auto mix-blend-lighten mb-6" />
          <h2 className="text-5xl font-bold leading-tight mb-4">
            <span className="text-[#e0b44a]">Gold,</span> Simplified
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl">
            Fully-backed, no vault, ownership made effortless
          </p>
          
          {/* Authentication Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
            <a 
              href="/signup" 
              className="flex-1 bg-[#e0b44a] text-black font-bold px-8 py-3 rounded-lg shadow-gold hover:bg-yellow-400 transition text-center"
            >
              Sign Up
            </a>
            <a 
              href="/login" 
              className="flex-1 bg-transparent text-[#e0b44a] font-bold px-8 py-3 rounded-lg border-2 border-[#e0b44a] hover:bg-[#e0b44a] hover:text-black transition text-center"
            >
              Sign In
            </a>
          </div>
        </section>

        {/* Chart Section */}
        <section className="px-4 py-8 w-full max-w-4xl mx-auto">
          <GoldPriceChart />
        </section>

        {/* Live Gold Price Section */}
        <section className="py-8 text-center">
          <div className="space-y-4">
            <div>
              <div className="text-xl text-[#e0b44a] mb-2">Market Gold Price</div>
              <div className="text-3xl font-bold text-[#e0b44a]">
                {goldPrice ? formatPrice(goldPrice) : 'Loading...'}
              </div>
            </div>
            
            <div>
              <div className="text-xl text-[#e0b44a] mb-2">Our Gold Price</div>
              <div className="text-3xl font-bold text-green-400">
                {goldPrice ? formatPrice(calculateDiscountedPrice(goldPrice)) : 'Loading...'}
              </div>
              <div className="text-sm text-green-400 mt-1">
                (5% below market price)
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center text-sm text-gray-600 py-6 border-t border-gray-800 mt-auto">
          &copy; 2025 Solace Gold. All rights reserved.
        </footer>
      </div>
    </>
  )
}