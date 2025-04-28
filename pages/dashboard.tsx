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
        tension: 0.3,
      },
    ],
  }

  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { ticks: { color: '#888' } },
      y: { ticks: { color: '#888' } },
    },
  }

  return (
    <>
      <Head>
        <title>Dashboard - Solace Gold</title>
      </Head>

      <div className="min-h-screen bg-[#0d0d0d] text-white font-sans px-4 py-6 md:px-12 md:py-10 flex flex-col items-center">

        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Logo" className="w-12 h-12" />
          <h1 className="text-2xl font-bold tracking-wide">Welcome, {clientName}</h1>
        </div>

        {/* Wallet Section */}
        <div className="text-center mb-12">
          <div className="text-sm text-gray-400 uppercase tracking-widest mb-2">Current Holdings</div>
          <div className="text-6xl font-extrabold text-[#e0b44a]">{goldHoldings}g</div>

          <div className="mt-8 text-sm text-gray-400 uppercase tracking-widest mb-2">Current Value</div>
          <div className="text-5xl font-extrabold text-[#e0b44a]">{goldValueEUR} EUR</div>

          <div className={`mt-6 text-xl font-semibold ${parseFloat(profitLoss) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {parseFloat(profitLoss) >= 0 ? '+' : ''}{profitLoss}%
          </div>
        </div>

        {/* Chart */}
        <div className="w-full max-w-4xl mb-12 bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 shadow-md">
          <h3 className="text-md font-semibold mb-4">Gold Price (Last 12 months)</h3>
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Recent Activity */}
        <div className="w-full max-w-2xl">
          <h3 className="text-md font-semibold mb-6 text-center">Recent Activity</h3>

          <div className="flex flex-col gap-4">
            {[
              { date: '05 Apr 2025', action: 'Bought 1g Gold', amount: '€93.21' },
              { date: '15 Mar 2025', action: 'Sold 0.5g Gold', amount: '€46.00' },
              { date: '01 Mar 2025', action: 'Withdrawal', amount: '€200.00' },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-[#2a2a2a] pb-4 text-gray-300">
                <div className="text-sm">{item.date}</div>
                <div className="text-sm">{item.action}</div>
                <div className="text-[#e0b44a] font-bold">{item.amount}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
