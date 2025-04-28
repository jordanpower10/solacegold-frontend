import Head from 'next/head'
import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

export default function Dashboard() {
  const goldHoldings = 6.754
  const goldPrice = 2922.01
  const accountValue = 12530.75
  const dailyChangePercent = 1.42

  const chartData = {
    labels: Array.from({ length: 12 }, (_, i) => `${12 - i} mo ago`),
    datasets: [
      {
        label: 'Gold Price (EUR)',
        data: [2600, 2625, 2640, 2660, 2685, 2710, 2735, 2760, 2790, 2825, 2870, 2922],
        fill: true,
        backgroundColor: 'rgba(224, 180, 74, 0.05)',
        borderColor: '#e0b44a',
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#1a1a1a',
        titleColor: '#e0b44a',
        bodyColor: '#f5f5f5',
      },
    },
    scales: {
      x: {
        ticks: { color: '#777' },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#777' },
        grid: { color: '#222' },
      },
    },
  }

  return (
    <>
      <Head>
        <title>Dashboard - Solace Gold</title>
      </Head>

      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center px-4 py-10 font-sans">

        {/* Logo */}
        <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Solace Gold Logo" className="w-14 h-14 mb-6" />

        {/* Title */}
        <h1 className="text-2xl font-semibold tracking-wide mb-3">Your account</h1>

        {/* Account Value */}
        <div className="text-4xl font-bold mb-4 tracking-tight">
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
        <div className="flex gap-6 mb-12">
          {/* Deposit */}
          <div className="flex flex-col items-center justify-center w-28 h-28 bg-[#121212] border border-[#2a2a2a] rounded-xl hover:bg-[#1f1f1f] transition cursor-pointer">
            <div className="text-2xl mb-1">€</div>
            <div className="text-sm">Deposit</div>
          </div>

          {/* Withdraw */}
          <div className="flex flex-col items-center justify-center w-28 h-28 bg-[#121212] border border-[#2a2a2a] rounded-xl hover:bg-[#1f1f1f] transition cursor-pointer">
            <div className="text-2xl mb-1">↑</div>
            <div className="text-sm">Withdraw</div>
          </div>

          {/* Buy Gold */}
          <div className="flex flex-col items-center justify-center w-28 h-28 bg-[#121212] border border-[#2a2a2a] rounded-xl hover:bg-[#1f1f1f] transition cursor-pointer">
            <img src="https://i.postimg.cc/yNXXRbY3/Gold-bar-white.png" alt="Gold Bar" className="w-8 h-8 mb-2" />
            <div className="text-sm">Buy Gold</div>
          </div>
        </div>

        {/* Gold Price Chart */}
        <div className="w-full max-w-2xl bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Gold price</h3>
            <div className="text-[#e0b44a] font-semibold">€{goldPrice}</div>
          </div>
          <Line data={chartData} options={chartOptions} />
        </div>

      </div>
    </>
  )
}
