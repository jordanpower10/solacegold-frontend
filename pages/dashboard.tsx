import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

export default function Dashboard() {
  const [goldPrice, setGoldPrice] = useState<number>(1855)
  const goldHoldings = 12.34
  const gramsPerOunce = 31.1035
  const investmentValue = 1000
  const clientName = "John Doe"

  const currentValue = (goldHoldings / gramsPerOunce) * goldPrice
  const goldValueEUR = currentValue.toFixed(2)
  const profitLoss = (((currentValue - investmentValue) / investmentValue) * 100).toFixed(2)

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
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      x: { ticks: { color: '#aaa' } },
      y: { ticks: { color: '#aaa' } },
    },
  }

  return (
    <>
      <Head>
        <title>Dashboard - Solace Gold</title>
      </Head>

      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center font-sans px-4 py-8">

        {/* Logo + Welcome */}
        <div className="flex flex-col items-center mb-12">
          <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Logo" className="w-16 h-16 mb-4" />
          <h1 className="text-3xl font-bold tracking-wider">Welcome, {clientName}</h1>
        </div>

        {/* Wallet Hero Section */}
        <div className="w-full max-w-4xl bg-gradient-to-br from-[#121212] to-[#1a1a1a] border border-[#2a2a2a] rounded-3xl p-10 text-center mb-12 shadow-xl animate-fadeInSlow">

          <div className="text-gray-400 text-xs uppercase tracking-widest mb-2">Current Holdings</div>
          <div className="text-6xl font-extrabold text-[#e0b44a] mb-8">{goldHoldings}g</div>

          <div className="text-gray-400 text-xs uppercase tracking-widest mb-2">Current Value</div>
          <div className="text-5xl font-extrabold text-[#e0b44a] mb-8">{goldValueEUR} EUR</div>

          <div className={`px-6 py-2 rounded-full font-bold text-xl inline-block ${parseFloat(profitLoss) >= 0 ? 'bg-green-600' : 'bg-red-600'}`}>
            {parseFloat(profitLoss) >= 0 ? '+' : ''}{profitLoss}%
          </div>

        </div>

        {/* Chart Section */}
        <div className="w-full max-w-5xl bg-[#121212] border border-[#2a2a2a] rounded-2xl p-8 mb-12 shadow-md">
          <h3 className="text-lg font-semibold mb-6">Gold Price (Last 12 months)</h3>
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Recent Activity */}
        <div className="w-full max-w-3xl">
          <h3 className="text-lg font-semibold mb-6 text-center">Recent Activity</h3>

          <div className="flex flex-col gap-6">
            {[
              { date: '05 Apr 2025', action: 'Bought 1g Gold', amount: '€93.21' },
              { date: '15 Mar 2025', action: 'Sold 0.5g Gold', amount: '€46.00' },
              { date: '01 Mar 2025', action: 'Withdrawal', amount: '€200.00' },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center px-6 py-4 bg-[#141414] border border-[#2a2a2a] rounded-2xl hover:scale-[1.02] transition-transform">
                <div className="text-gray-400 text-sm">{item.date}</div>
                <div className="text-base font-medium">{item.action}</div>
                <div className="text-[#e0b44a] font-bold">{item.amount}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
