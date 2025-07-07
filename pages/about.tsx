import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import AppLayout from '../components/AppLayout';
import { isMobileApp } from '../utils/mobileUtils';

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <AppLayout>
      <Head>
        <title>About Us - Solace Gold</title>
        <meta name="description" content="Learn about SolaceGold's mission and investment strategy" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-black text-white font-sans">
        {/* Hero Section */}
        <motion.section
          {...fadeInUp}
          className="relative py-20 px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#e0b44a] mb-6">
              Our Mission
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Formerly a private members group for gold investing, we've evolved our strategy to embrace both traditional and digital assets. Our mission is to provide accessible, data-driven investment guidance for the modern investor.
            </p>
          </div>
        </motion.section>

        {/* Strategy Section */}
        <motion.section
          {...fadeInUp}
          className="py-16 px-4 sm:px-6 lg:px-8 bg-[#121212]"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#e0b44a] mb-8 text-center">
              Our Investment Strategy
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                {...fadeInUp}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]"
              >
                <h3 className="text-xl font-semibold mb-4">Data-Driven Approach</h3>
                <p className="text-gray-300">
                  Our investment recommendations are powered by the Fear & Greed Index, a proven market sentiment indicator. This metric helps identify optimal entry and exit points in the market cycle.
                </p>
              </motion.div>

              <motion.div
                {...fadeInUp}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]"
              >
                <h3 className="text-xl font-semibold mb-4">Diversified Portfolio</h3>
                <p className="text-gray-300">
                  We believe in the power of both traditional and digital assets. Our strategy combines the stability of gold with the growth potential of Bitcoin, offering a balanced approach to wealth preservation and growth.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Premium Features */}
        <motion.section
          {...fadeInUp}
          className="py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#e0b44a] mb-8">
              Premium Features
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <motion.div
                {...fadeInUp}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]"
              >
                <h3 className="text-xl font-semibold mb-4">Fear & Greed Index</h3>
                <p className="text-gray-300">
                  Access our proprietary market sentiment indicator that signals optimal times to buy, sell, or hold your investments.
                </p>
              </motion.div>

              <motion.div
                {...fadeInUp}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]"
              >
                <h3 className="text-xl font-semibold mb-4">Investment Signals</h3>
                <p className="text-gray-300">
                  Receive clear BUY, SELL, or HOLD recommendations based on market sentiment and technical analysis.
                </p>
              </motion.div>

              <motion.div
                {...fadeInUp}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]"
              >
                <h3 className="text-xl font-semibold mb-4">AI Assistant</h3>
                <p className="text-gray-300">
                  Get personalized investment guidance and market insights from our advanced AI assistant.
                </p>
              </motion.div>
            </div>

            <motion.div
              {...fadeInUp}
              className="mt-12"
            >
              <p className="text-lg text-gray-300 mb-6">
                Join our premium membership for just $5.99/month and get access to all these features and more.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/subscribe'}
                className="px-8 py-3 bg-[#e0b44a] text-black rounded-lg font-medium hover:bg-[#f0c45a] transition-colors"
              >
                Subscribe Now
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Trust Section */}
        <motion.section
          {...fadeInUp}
          className="py-16 px-4 sm:px-6 lg:px-8 bg-[#121212]"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#e0b44a] mb-8">
              Why Trust Us?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                {...fadeInUp}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]"
              >
                <h3 className="text-xl font-semibold mb-4">Proven Track Record</h3>
                <p className="text-gray-300">
                  Our investment strategy has been refined through years of experience in both traditional and digital asset markets.
                </p>
              </motion.div>

              <motion.div
                {...fadeInUp}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]"
              >
                <h3 className="text-xl font-semibold mb-4">Transparent Approach</h3>
                <p className="text-gray-300">
                  We believe in full transparency. Our recommendations are based on clear, data-driven metrics that you can verify.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </AppLayout>
  );
}
