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
          <div className="flex flex-col gap-4 max-w-xs mx-auto mb-20">
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

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {/* Feature 1 */}
            <motion.div 
              className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#2a2a2a] hover:border-[#e0b44a] transition-all"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "tween" }}
            >
              <div className="h-12 w-12 bg-[#e0b44a] rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Instant Transactions</h3>
              <p className="text-gray-400">Buy and sell gold instantly with zero processing delays.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#2a2a2a] hover:border-[#e0b44a] transition-all"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "tween" }}
            >
              <div className="h-12 w-12 bg-[#e0b44a] rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">100% Secure</h3>
              <p className="text-gray-400">Your gold is fully insured and stored in high-security vaults.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#2a2a2a] hover:border-[#e0b44a] transition-all"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "tween" }}
            >
              <div className="h-12 w-12 bg-[#e0b44a] rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Zero Storage Fees</h3>
              <p className="text-gray-400">No monthly fees or hidden charges. Just pure gold ownership.</p>
            </motion.div>
          </div>

          {/* Stats Section */}
          <div className="relative py-20">
            <div className="absolute inset-0 bg-[url('/images/gold-coins.png')] bg-cover bg-center opacity-5" />
            <div className="relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: "$1B+", label: "Gold Traded" },
                  { value: "50K+", label: "Active Users" },
                  { value: "99.99%", label: "Pure Gold" },
                  { value: "24/7", label: "Support" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <h4 className="text-4xl font-bold text-[#e0b44a] mb-2">{stat.value}</h4>
                    <p className="text-gray-400">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Start Your Gold Journey Today
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Join thousands of investors who trust SolaceGold for their precious metal investments.
              </p>
              <button
                onClick={() => router.push('/signup')}
                className="px-12 py-6 bg-[#e0b44a] text-black font-bold rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105 inline-block"
              >
                Create Free Account
              </button>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black text-white py-16 border-t border-[#2a2a2a]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Logo and Description */}
              <div>
                <img
                  src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png"
                  alt="Solace Gold Logo"
                  className="w-12 h-12 mb-4"
                />
                <p className="text-gray-400">
                  Making gold ownership simple, secure, and accessible for everyone.
                </p>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-400 hover:text-[#e0b44a] transition">About</Link></li>
                  <li><Link href="/careers" className="text-gray-400 hover:text-[#e0b44a] transition">Careers</Link></li>
                  <li><Link href="/press" className="text-gray-400 hover:text-[#e0b44a] transition">Press</Link></li>
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><Link href="/help" className="text-gray-400 hover:text-[#e0b44a] transition">Help Center</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-[#e0b44a] transition">Contact Us</Link></li>
                  <li><Link href="/faq" className="text-gray-400 hover:text-[#e0b44a] transition">FAQ</Link></li>
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="/privacy" className="text-gray-400 hover:text-[#e0b44a] transition">Privacy</Link></li>
                  <li><Link href="/terms" className="text-gray-400 hover:text-[#e0b44a] transition">Terms</Link></li>
                  <li><Link href="/cookies" className="text-gray-400 hover:text-[#e0b44a] transition">Cookies</Link></li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-400 mt-16">
              <p>© 2025 Solacegold Ltd. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Bottom Navigation */}
        <IndexBottomNav />
      </div>
    </>
  )
}