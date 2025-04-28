import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

export default function Dashboard() {
  const [goldPrice, setGoldPrice] = useState<number | null>(null)
  const [goldHoldings, setGoldHoldings] = useState<number>(12.34)
  const [investmentValue] = useState<number>(1000)
  const clientName = "John Doe"

  useEffect(() => {
    async function fetchGoldPrice() {
      try {
        const res = await fetch('https://data-asg.goldprice.org/dbXRates/EUR')
        const data = await res.json()
        const price = data?.items?.[0]?.xauPrice
        if (price) {
          setGoldPrice(price)
        }
      } catch {
        setGoldPrice(null)
      }
    }

    fetchGoldPrice()
    const interval = setInterval(fetchGoldPrice, 60000)
    return () => clearInterval(interval)
  }, [])

  const currentValue = goldPrice ? (goldHoldings * goldPrice / 31.1035) : 0
  const goldValueEUR = currentValue.toFixed(2)
  const profitLoss = investmentValue ? (((currentValue - investmentValue) / investmentValue) * 100).toFixed(2) : '0'

  // Static 12-month chart data (simple working version)
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Gold Price (EUR)',
        data: [1832, 1850, 1840, 1860, 1880, 1900, 1925, 1950, 1940, 1920, 1910, 1930],
        fill: false,
        borderColor: '#e0b44a',
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: '#ccc' },
      },
      y: {
        ticks: { color: '#ccc' },
      }
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

        {/* Gold Wallet */}
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-8 shadow-lg mb-8">
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

        {/* Chart and Activity */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 flex-1">
            <h3 className="text-md font-semibold mb-4">Gold Price (Last 12 months)</h3>
            <Line data={chartData} options={chartOptions} />
          </div>

          <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 flex-1">
            <h3 className="text-md font-semibold mb-4">Recent Activity</h3>
            <div className="flex flex-col gap-4 text-sm text-gray-300">
              <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
                <div>➔ Bought 1g Gold</div>
                <div className="text-[#e0b44a]">€93.21</div>
              </div>
              <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
                <div>➔ Sold 0.5g Gold</div>
                <div className="text-[#e0b44a]">€46.00</div>
              </div>
              <div className="flex justify-between">
                <div>➔ Withdrawal Initiated</div>
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
