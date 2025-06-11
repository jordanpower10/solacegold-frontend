import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function TestPage3() {
  return (
    <>
      <Head>
        <title>SolaceGold - Buy and Store Gold Instantly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Buy, store, and transfer physical gold instantly with SolaceGold. Fully backed, no vault fees." />
      </Head>

      <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#0d0d0d] z-10" />
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/images/gold-coins.png')] bg-cover bg-center opacity-20" />
          </div>

          {/* Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="text-[#e0b44a]">Gold</span> for the
                <br />Digital Age
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Buy, store, and transfer physical gold instantly. Fully backed, no vault fees.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  href="/signup"
                  className="px-8 py-4 bg-[#e0b44a] text-black font-bold rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link 
                  href="/about"
                  className="px-8 py-4 bg-transparent border-2 border-[#e0b44a] text-[#e0b44a] font-bold rounded-lg hover:bg-[#e0b44a] hover:text-black transition-all transform hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <svg className="w-6 h-6 text-[#e0b44a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-[#121212]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/gold-coins.png')] bg-cover bg-center opacity-5" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
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
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-[#121212] to-[#0d0d0d]">
          <div className="max-w-4xl mx-auto px-4 text-center">
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
              <Link 
                href="/signup"
                className="px-12 py-6 bg-[#e0b44a] text-black font-bold rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105 inline-block"
              >
                Create Free Account
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#121212] border-t border-[#2a2a2a] py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <Image 
                  src="/images/logo.png"
                  alt="SolaceGold Logo"
                  width={120}
                  height={32}
                  className="mb-6"
                />
                <p className="text-gray-400 text-sm">
                  Making gold ownership simple, secure, and accessible for everyone.
                </p>
              </div>
              <div>
                <h5 className="text-[#e0b44a] font-bold mb-4">Company</h5>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-400 hover:text-[#e0b44a] transition">About</Link></li>
                  <li><Link href="/careers" className="text-gray-400 hover:text-[#e0b44a] transition">Careers</Link></li>
                  <li><Link href="/press" className="text-gray-400 hover:text-[#e0b44a] transition">Press</Link></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[#e0b44a] font-bold mb-4">Support</h5>
                <ul className="space-y-2">
                  <li><Link href="/help" className="text-gray-400 hover:text-[#e0b44a] transition">Help Center</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-[#e0b44a] transition">Contact Us</Link></li>
                  <li><Link href="/status" className="text-gray-400 hover:text-[#e0b44a] transition">Status</Link></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[#e0b44a] font-bold mb-4">Legal</h5>
                <ul className="space-y-2">
                  <li><Link href="/privacy-policy" className="text-gray-400 hover:text-[#e0b44a] transition">Privacy</Link></li>
                  <li><Link href="/terms" className="text-gray-400 hover:text-[#e0b44a] transition">Terms</Link></li>
                  <li><Link href="/cookie-policy" className="text-gray-400 hover:text-[#e0b44a] transition">Cookies</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-[#2a2a2a] text-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Solacegold Ltd. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
