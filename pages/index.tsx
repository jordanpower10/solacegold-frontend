import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import IndexBottomNav from '../components/IndexBottomNav'
import { isMobileApp } from '../utils/mobileUtils'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>SolaceGold - Digital Gold for the Modern Age</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Buy, store, and transfer digital gold instantly with SolaceGold. Fully backed, no vault fees." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-black text-white font-sans">
        {/* Main Content */}
        <div className={`max-w-7xl mx-auto px-4 py-8 ${isMobileApp() ? 'pb-24' : ''}`}>
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <img
              src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png"
              alt="Solace Gold Logo"
              className="w-32 h-32"
            />
          </div>

          {/* Hero Text */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-[#e0b44a]">Gold</span> for the
              <br />
              Digital Age
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Buy, store, and sell digital gold instantly.
              <br />
              Fully backed, no vault fees.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 max-w-xs mx-auto">
            <button
              onClick={() => router.push('/signup')}
              className="w-full bg-gradient-to-r from-[#e0b44a] to-[#c4963c] text-black font-bold py-4 px-8 rounded-lg hover:from-[#e5bc5c] hover:to-[#cca04a] transition-all"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-transparent border border-[#e0b44a] text-[#e0b44a] font-bold py-4 px-8 rounded-lg hover:bg-[#e0b44a]/10 transition-all"
            >
              Log In
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <IndexBottomNav />
      </div>
    </>
  )
}