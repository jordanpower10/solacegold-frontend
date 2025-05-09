import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'

import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'
import { signOut } from 'next-auth/react'
import { authOptions } from './api/auth/[...nextauth]'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  let timeoutId: NodeJS.Timeout

  const goldHoldings = 6.754
  const goldPrice = 2922.01
  const accountValue = 12530.75
  const dailyChangePercent = 1.42

  const chartData = {
    labels: Array.from({ length: 20 }, () => ''),
    datasets: [
      {
        label: 'Gold Price (EUR)',
        data: [
          2500, 2520, 2530, 2545, 2560, 2575, 2580, 2595, 2610, 2625,
          2650, 2680, 2700, 2720, 2750, 2780, 2820, 2850, 2890, 2922,
        ],
        borderColor: '#e0b44a',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  }

  const chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#111',
        titleColor: '#e0b44a',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        ticks: { color: '#999', display: false },
        grid: { color: '#333', display: false },
      },
      y: {
        ticks: { color: '#999', display: false },
        grid: { color: '#333', display: false },
      },
    },
  }

  return (
    <>
      <Head>
        <title>Dashboard - Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f5f5f5] font-sans relative">

        {/* Dropdown */}
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
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col items-center px-4 py-10 mt-20">
          <a href="/" className="mb-6">
            <img
              src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png"
              alt="Solace Gold Logo"
              className="w-20 h-20"
            />
          </a>

          <h1 className="text-2xl font-semibold mb-2">Your account</h1>
          <div className="text-4xl font-semibold tracking-tight mb-6">
            €{accountValue.toLocaleString('de-DE')}
          </div>

          <div className="text-gray-400 mb-10 text-md">
            {goldHoldings} oz{' '}
            <span className={dailyChangePercent >= 0 ? 'text-green-400' : 'text-red-400'}>
              {dailyChangePercent >= 0 ? '+' : ''}
              {dailyChangePercent}%
            </span>{' '}
            in the past day
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-6 justify-center mb-10">
            <div className="flex flex-col items-center justify-center w-28 h-28 bg-[#121212] border border-[#2a2a2a] rounded-xl hover:bg-[#e0b44a] hover:border-[#e0b44a] hover:text-black transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-1">€</div>
              <div className="text-sm">Deposit</div>
            </div>
            <div className="flex flex-col items-center justify-center w-28 h-28 bg-[#121212] border border-[#2a2a2a] rounded-xl hover:bg-[#e0b44a] hover:border-[#e0b44a] hover:text-black transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-1">↑</div>
              <div className="text-sm">Withdraw</div>
            </div>
            <div className="flex flex-col items-center justify-center w-28 h-28 bg-[#121212] border border-[#2a2a2a] rounded-xl hover:bg-[#e0b44a] hover:border-[#e0b44a] hover:text-black transition-all duration-300 cursor-pointer">
              <img src="https://i.postimg.cc/yNXXRbY3/Gold-bar-white.png" alt="Gold Bar" className="w-8 h-8 mb-2" />
              <div className="text-sm">Buy Gold</div>
            </div>
            <div className="flex flex-col items-center justify-center w-28 h-28 bg-[#121212] border border-[#2a2a2a] rounded-xl hover:bg-[#e0b44a] hover:border-[#e0b44a] hover:text-black transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-1">↓</div>
              <div className="text-sm">Sell Gold</div>
            </div>
          </div>

          {/* Gold Chart */}
          <div className="w-full max-w-2xl bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-md font-semibold">Gold price</h3>
              <div className="text-[#e0b44a] font-semibold">€{goldPrice}</div>
            </div>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </>
  )
}
