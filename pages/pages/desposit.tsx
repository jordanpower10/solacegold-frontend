import Head from 'next/head'
import { useState } from 'react'

export default function Deposit() {
  const [amount, setAmount] = useState('')
  const [balance, setBalance] = useState(0)
  const [message, setMessage] = useState('')

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault()
    const depositAmount = parseFloat(amount)

    if (isNaN(depositAmount) || depositAmount <= 0) {
      setMessage('❌ Please enter a valid amount')
      return
    }

    const newBalance = balance + depositAmount
    setBalance(newBalance)
    setAmount('')
    setMessage(`✅ €${depositAmount.toFixed(2)} deposited successfully`)
  }

  return (
    <>
      <Head>
        <title>Deposit – Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-[#0d0d0d] px-4 flex items-center justify-center font-sans">
        <div className="w-full max-w-md bg-[#121212] p-8 rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <a href="/">
              <img
                src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png"
                alt="Solace Gold Logo"
                className="w-32 h-auto hover:opacity-80 transition"
              />
            </a>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6 text-[#e0b44a]">
            Deposit Funds
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleDeposit}>
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="amount">Amount (€)</label>
              <input
                type="number"
                step="0.01"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 rounded bg-[#1c1c1c] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#e0b44a] text-black font-bold py-2 rounded shadow-gold hover:bg-yellow-400 transition"
            >
              Deposit
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-green-400 text-sm">{message}</p>
          )}

          <div className="mt-6 text-center text-sm text-gray-400">
            Current Balance:{' '}
            <span className="text-[#e0b44a] font-bold">€{balance.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </>
  )
}
