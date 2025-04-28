import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

export default function Dashboard() {
  const [goldPrice, setGoldPrice] = useState<number>(1855) // Today's gold price ~€1855/oz
  const goldHoldings = 12.34 // g
  const gramsPerOunce = 31.1035
  const investmentValue = 1000 // original investment €
  const clientName = "John Doe"

  const currentValue = goldPrice ? ((goldHoldings / gramsPerOunce) * goldPrice) : 0
  const goldValueEUR = currentValue.toFixed(2)
  const profitLoss = investmentValue ? (((currentValue - investmentValue) / investmentValue) * 100).toFixed(2) : '0'

  const chartData = {
    labels: ['12mo', '11mo', '10mo', '9mo', '8mo', '7mo', '6mo', '5mo', '4mo', '3mo', '2mo', 'Now'],
    datasets: [
      {
        label: 'Gold Price (EUR)',
        data: [1650, 1680, 1700, 1725, 1750, 1775, 1790, 1805, 1820, 1835, 1845, 1855],
        borderColor: '#e0b44a',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        ticks: { color: '#ccc' },
      },
      y: {
        ticks: { color: '#ccc' },
      },
    },
  }

  return (
    <>
      <Head>
        <title>Dashboard - Solace Gold</title>
      </Head>

      <div className="min-h-screen bg-[#0d0d0d] text-[#f5f5f5] font-sans px-4 py-6 md:px-12 md:py-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Logo" className="w-12 h-12" />
            <h1 className="text-2xl font-bold">Welcome, {clientName}</h1>
          </div>
        </div>

        {/* Wallet */}
        <div className="relative bg-[#121212] border border-[#2a2a2a] rounded-2xl p-8 shadow-lg overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#e0b44a22] to-transparent rounded-2xl pointer-events-none animate-pulse"></div>
          <h2 className="text-lg font-semibold mb-4">Your Gold Wallet</h2>
          <div className="text-center">
            <div className="text-gray-400 mb-1">Current Holdings</div>
            <div className="text-4xl font-bold text-[#e0b44a]">{goldHoldings}g</div>
            <div className="text-gray-400 mt-4 mb-1">Current Value</div>
            <div className="text-3xl font-bold text-[#e0b44a]">{goldValueEUR} EUR</div>
            <div className={`mt-3 font-semibold ${parseFloat(profitLoss) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {parseFloat(profitLoss) >= 0 ? '+' : ''}{profitLoss}%
            </div>
          </div>
        </div>

        {/* Chart + Activity */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          {/* Chart */}
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 flex-1 shadow-md">
            <h3 className="text-md font-semibold mb-4">Gold Price (Last 12 months)</h3>
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Recent Activity */}
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 flex-1 shadow-md">
            <h3 className="text-md font-semibold mb-4">Recent Activity</h3>
            <div className="flex flex-col gap-4 text-sm text-gray-300">
              <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
                <div>05 Apr 2025 - Bought 1g Gold</div>
                <div className="text-[#e0b44a]">€93.21</div>
              </div>
              <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
                <div>15 Mar 2025 - Sold 0.5g Gold</div>
                <div className="text-[#e0b44a]">€46.00</div>
              </div>
              <div className="flex justify-between">
                <div>01 Mar 2025 - Withdrawal</div>
                <div className="text-[#e0b44a]">€200.00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="/buy" className="flex-1 bg-[#e0b44a] hover:bg-yellow-400 text-black font-bold py-4 rounded-xl text-center shadow-md transition">Buy Gold</a>
          <a href="/sell" className="flex-1 bg-[#e0b44a] hover:bg-yellow-400 text-black font-bold py-4 rounded-xl text-center shadow-md transition">Sell Gold</a>
          <a href="/withdraw" className="flex-1 bg-[#e0b44a] hover:bg-yellow-400 text-black font-bold py-4 rounded-xl text-center shadow-md transition">Withdraw Funds</a>
        </div>

      </div>
    </>
  )
}
