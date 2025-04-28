import Head from 'next/head'
import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

export default function Dashboard() {
  const goldHoldings = 6.754
  const goldPrice = 2922.01
  const accountValue = 12530.75
  const dailyChangePercent = 1.42

  const chartData = {
    labels: Array.from({ length: 20 }, () => ''),
    datasets: [
      {
        label: 'Gold Price (EUR)',
        data: [2500, 2520, 2530, 2545, 2560, 2575, 2580, 2595, 2610, 2625, 2650, 2680, 2700, 2720, 2750, 2780, 2820, 2850, 2890, 2922],
        borderColor: '#e0b44a',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  }

  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { ticks: { display: false }, grid: { display: false } },
      y: { ticks: { display: false }, grid: { display: false } },
    },
  }

  return (
    <>
      <Head>
        <title>Dashboard - Solace Gold</title>
      </Head>

      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center px-4 py-10 font-sans">

        {/* Logo */}
        <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Solace Gold Logo" className="w-14 h-14 mb-4" />

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">Your account</h1> {/* ✅ Made thinner */}
        <div className="text-4xl font-semibold tracking-tight mb-6">
          €{accountValue.toLocaleString('de-DE')}
        </div>

        {/* Holdings and Daily Change */}
        <div className="text-gray-400 mb-10 text-md">
          {goldHoldings} oz{" "}
          <span className={dailyChangePercent >= 0 ? 'text-green-400' : 'text-red-400'}>
            {dailyChangePercent >= 0 ? '+' : ''}{dailyChangePercent}%
          </span>{" "}
          in the past day
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 flex-wrap justify-center mb-10">
          {/* Deposit */}
          <div className="flex flex-col items-center justify-center w-28 h-28 bg-[#121212] border border-[#2a2a2a] rounded-xl hover:bg-[#1f1f1f] transition cursor-pointer">
            <div className="text-3xl mb-1">€</div>
            <div className="text-sm">Deposit</div>
          </div>

          {/* Withdraw */}
          <div className="flex flex-col items-center justify-center w-28 h-28 bg-[#121212] border border-[#2a2a2a] rounded-xl hover:bg-[#1f1f1f] transition cursor-pointer">
            <div className="text-3xl mb-1">↑</div>
            <div className="text-sm">Withdraw</div>
          </div>

          {/* Buy Gold */}
          <div className="flex flex-col items-center justify-center w-28 h-28 bg-[#121212] border border-[#2a2a2a] rounded-xl hover:bg-[#1f1f1f] transition cursor-pointer">
            <img src="https://i.postimg.cc/yNXXRbY3/Gold-bar-white.png" alt="Gold Bar" className="w-8 h-8 mb-2" />
            <div className="text-sm">Buy Gold</div>
          </div>

          {/* Sell Gold */}
          <div className="flex flex-col items-center justify-center w-28 h-28 bg-[#121212] border border-[#2a2a2a] rounded-xl hover:bg-[#1f1f1f] transition cursor-pointer">
            <div className="text-3xl mb-1">↓</div>
            <div className="text-sm">Sell Gold</div>
          </div>
        </div>

        {/* Gold Price Chart */}
        <div className="w-full max-w-2xl bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-md font-semibold">Gold price</h3>
            <div className="text-[#e0b44a] font-semibold">€{goldPrice}</div>
          </div>
          <div className="text-gray-500 text-center py-10">
            (Gold price chart loading...)
          </div> {/* ✅ Placeholder chart for now */}
        </div>

      </div>
    </>
  )
}
