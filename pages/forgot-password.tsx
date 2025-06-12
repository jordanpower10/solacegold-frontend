import Head from 'next/head'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import dynamic from 'next/dynamic'
import type { ReCAPTCHAProps } from 'react-google-recaptcha'

const ReCAPTCHA = dynamic<ReCAPTCHAProps>(
  () => import('react-google-recaptcha').then(mod => mod.default),
  {
    ssr: false,
    loading: () => <div className="h-[78px] w-[302px] bg-[#1a1a1a] rounded animate-pulse" />
  }
)

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA verification')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

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

      // Send password reset email
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      setMessage('✅ Password reset instructions have been sent to your email.')
      setEmail('')
    } catch (error: any) {
      console.error('Reset password error:', error)
      setError(error.message || 'An error occurred while sending reset instructions')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Forgot Password – Solace Gold</title>
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
            Reset Your Password
          </h2>

          <p className="text-gray-400 text-sm text-center mb-6">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-[#1c1c1c] text-white border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#e0b44a]"
            />

            <div className="flex justify-center my-4">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={setRecaptchaToken}
                theme="dark"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {message && <p className="text-green-500 text-sm text-center">{message}</p>}

            <button
              type="submit"
              className="w-full bg-[#e0b44a] text-black font-bold py-2 rounded hover:bg-yellow-400 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Instructions'}
            </button>

            <p className="text-sm text-center text-gray-500 mt-6">
              Remember your password?{' '}
              <a href="/login" className="text-[#e0b44a] underline">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
} 