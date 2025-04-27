import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

export default function Dashboard() {
  const [goldPrice, setGoldPrice] = useState<number | null>(null)
  const [goldHoldings, setGoldHoldings] = useState<number>(12.34) // Example gold in grams
  const [investmentValue, setInvestmentValue] = useState<number>(1000) // Simulated original investment
  const clientName = "John Doe" // Example client name

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

  // Fake 24-hour gold prices for now
  const goldPrices24h = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    price: (1800 + Math.sin(i / 3) * 10 + i * 0.5)
  }))

  const chartData = {
    labels: goldPrices24h.map((p) => p.time),
    datasets: [
      {
        label: 'Gold Price (EUR)',
        data: goldPrices24h.map((p) => p.price),
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
      x: { display: false },
      y: { display: false },
    },
  }

  return (
    <>
      <Head>
        <title>Dashboard - Solace Gold</title>
      </Head>

      <div className="min-h-screen bg-[#0d0d0d] text-[#f5f5f5] font-sans px-4 py-6 md:px-12 md:py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Logo" className="w-12 h-12" />
            <h1 className="text-2xl font-bold">Welcome, {clientName}</h1>
          </div>
        </div>

        {/* Wallet Section */}
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-8 shadow-lg mb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#e0b44a33] to-transparent rounded-2xl pointer-events-none"></div>

          <h2 className="text-lg font-semibold mb-6">Your Gold Wallet</h2>

          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Holdings Info */}
            <div className="flex flex-col items-center md:items-start">
              <div className="text-gray-400 mb-1">Current Holdings</div>
              <div className="text-3xl font-bold text-[#e0b44a] mb-2">{goldHoldings}g</div>
              <div className="text-gray-400 mb-1">Current Value</div>
              <div className="text-2xl font-bold text-[#e0b44a] mb-2">{goldValueEUR} EUR</div>
              <div className={`text-md font-semibold ${parseFloat(profitLoss) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {parseFloat(profitLoss) >= 0 ? '+' : ''}{profitLoss}% {parseFloat(profitLoss) >= 0 ? '↑' : '↓'}
              </div>
            </div>
          </div>
        </div>

        {/* Chart and Activity Side-by-Side */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          {/* Chart */}
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 shadow-lg flex-1">
            <h3 className="text-md font-semibold mb-4">Gold Price (24h)</h3>
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Recent Activity */}
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 shadow-lg flex-1">
            <h3 className="text-md font-semibold mb-4">Recent Activity</h3>
            <div className="flex flex-col gap-4 text-sm text-gray-300">
              <div className="flex justify-between border-b border-[#2a2a2a] pb-3">
                <div>➔ Bought 1g Gold</div>
                <div className="text-[#e0b44a]">€93.21</div>
              </div>
              <div className="flex justify-between border-b border-[#2a2a2a] pb-3">
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

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="/buy" className="flex-1 bg-[#e0b44a] hover:bg-yellow-400 text-black font-bold py-4 rounded-xl text-center shadow-md transition">Buy Gold</a>
          <a href="/sell" className="flex-1 bg-[#e0b44a] hover:bg-yellow-400 text-black font-bold py-4 rounded-xl text-center shadow-md transition">Sell Gold</a>
          <a href="/withdraw" className="flex-1 bg-[#e0b44a] hover:bg-yellow-400 text-black font-bold py-4 rounded-xl text-center shadow-md transition">Withdraw Funds</a>
        </div>
      </div>
    </>
  )
}
