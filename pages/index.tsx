import React from 'react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import GoldPriceChart from '../components/GoldPriceChart'
import Link from 'next/link'

export default function Home() {
  const [goldPrice, setGoldPrice] = useState<number | null>(null)

  useEffect(() => {
    // Simulated gold price for demo
    setGoldPrice(2375.00)
  }, [])

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}/oz`
  }

  return (
    <>
      <Head>
        <title>Solace Gold – Buy Gold Instantly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f5f5f5] font-sans relative">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
          <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Solace Gold Logo" className="w-52 h-auto mix-blend-lighten mb-6" />
          <h2 className="text-5xl font-bold leading-tight mb-4">
            <span className="text-[#e0b44a]">Gold,</span> Simplified
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl">
            Fully-backed, no vault, ownership made effortless
          </p>
          
          {/* Authentication Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
            <Link 
              href="/signup" 
              className="flex-1 bg-[#e0b44a] text-black font-bold px-8 py-3 rounded-lg shadow-gold hover:bg-yellow-400 transition text-center cursor-pointer"
            >
              Sign Up
            </Link>
            <Link 
              href="/login" 
              className="flex-1 bg-transparent text-[#e0b44a] font-bold px-8 py-3 rounded-lg border-2 border-[#e0b44a] hover:bg-[#e0b44a] hover:text-black transition text-center cursor-pointer"
            >
              Sign In
            </Link>
          </div>
        </section>

        {/* Chart Section */}
        <section className="flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-4xl mx-auto">
            <GoldPriceChart />
          </div>
        </section>

        {/* Live Gold Price Section */}
        <section className="py-8 text-center">
          <div className="space-y-4">
            <div>
              <div className="text-xl text-[#e0b44a] mb-2">Live Gold Price</div>
              <div className="text-3xl font-bold text-[#e0b44a]">
                {goldPrice ? formatPrice(goldPrice) : 'Loading...'}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#121212] border-t border-[#2a2a2a] py-8 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Company Info */}
            <div className="text-center mb-6 text-sm text-gray-400">
              <p>© Copyright 2025 Solacegold Ltd.</p>
              <p>Registered in Ireland No. 12558398 VAT No. FR85711159383</p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 text-sm">
              <Link href="/about" className="text-gray-400 hover:text-[#e0b44a] transition-colors cursor-pointer">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-[#e0b44a] transition-colors cursor-pointer">
                Contact Us
              </Link>
              <Link href="/cookie-policy" className="text-gray-400 hover:text-[#e0b44a] transition-colors cursor-pointer">
                Cookie Policy
              </Link>
              <Link href="/privacy-policy" className="text-gray-400 hover:text-[#e0b44a] transition-colors cursor-pointer">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#e0b44a] transition-colors cursor-pointer">
                Terms & Conditions
              </Link>
              <Link href="/acceptable-use" className="text-gray-400 hover:text-[#e0b44a] transition-colors cursor-pointer">
                Acceptable Use Policy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}