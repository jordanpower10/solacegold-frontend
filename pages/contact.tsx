import Head from 'next/head'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import type { ReCAPTCHAProps } from 'react-google-recaptcha'

const ReCAPTCHA = dynamic<ReCAPTCHAProps>(() => import('react-google-recaptcha').then(mod => mod.default), {
  ssr: false
})

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA verification')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Verify reCAPTCHA first
      const verifyResponse = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: recaptchaToken }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok || !verifyData.success) {
        throw new Error('reCAPTCHA verification failed');
      }

      // This will be replaced with your real API later
      setStatus('✅ Message sent successfully!')
      setName('')
      setEmail('')
      setMessage('')
      setError('')
    } catch (error: any) {
      console.error('Contact form error:', error)
      setError(error.message || 'An error occurred while sending your message')
      setStatus('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Contact – Solace Gold</title>
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
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-[#1c1c1c] text-white border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#e0b44a]"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-[#1c1c1c] text-white border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#e0b44a]"
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
              className="w-full px-4 py-2 rounded bg-[#1c1c1c] text-white border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#e0b44a]"
            ></textarea>

            <div className="flex justify-center my-4">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={setRecaptchaToken}
                theme="dark"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#e0b44a] text-black font-bold py-2 rounded hover:bg-yellow-400 transition"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {status && (
            <p className="mt-4 text-center text-sm text-green-400">{status}</p>
          )}
        </div>
      </div>
    </>
  )
}
