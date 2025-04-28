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

      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center px-4 py-10 font-sans">

        {/* Logo and Welcome */}
        <div className="flex flex-col items-center mb-12">
          <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Solace Gold Logo" className="w-16 h-16 mb-4" />
          <h1 className="text-3xl font-bold">Welcome, {clientName}</h1>
        </div>

        {/* Wallet Card */}
        <div className="w-full max-w-3xl bg-gradient-to-br from-[#141414] to-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-10 mb-10 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">

            <div>
              <div className="text-gray-400 text-xs uppercase tracking-widest mb-2">Current Holdings</div>
              <div className="text-5xl font-extrabold text-[#e0b44a]">{goldHoldings}g</div>
            </div>

            <div>
              <div className="text-gray-400 text-xs uppercase tracking-widest mb-2">Current Value</div>
              <div className="text-5xl font-extrabold text-[#e0b44a]">{goldValueEUR} EUR</div>
            </div>

            <div>
              <div className="text-gray-400 text-xs uppercase tracking-widest mb-2">Profit/Loss</div>
              <div className={`px-5 py-2 rounded-full font-bold text-lg ${parseFloat(profitLoss) >= 0 ? 'bg-green-600' : 'bg-red-600'}`}>
                {parseFloat(profitLoss) >= 0 ? '+' : ''}{profitLoss}%
              </div>
            </div>

          </div>
        </div>

        {/* Chart */}
        <div className="w-full max-w-5xl bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 mb-10 shadow-md">
          <h3 className="text-md font-semibold mb-6">Gold Price (Last 12 months)</h3>
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
              <div key={index} className="flex justify-between items-center bg-gradient-to-br from-[#161616] to-[#1a1a1a] p-4 rounded-lg hover:scale-[1.02] transition-transform">
                <div className="text-sm text-gray-400">{item.date}</div>
                <div className="text-base font-semibold">{item.action}</div>
                <div className="text-[#e0b44a] font-bold">{item.amount}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
