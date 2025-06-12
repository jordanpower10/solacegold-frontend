import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import dynamic from 'next/dynamic'
import type { ReCAPTCHAProps } from 'react-google-recaptcha'

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha').then(mod => mod.default), {
  ssr: false,
  loading: () => <div className="h-[78px] w-[302px] bg-[#1a1a1a] rounded animate-pulse" />
})

export default function ResetPassword() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  useEffect(() => {
    // Check if we have a session (user clicked email link)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login')
      }
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

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

      // Update the password
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) throw error

      setMessage('✅ Password has been reset successfully!')
      setPassword('')
      setConfirmPassword('')
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error: any) {
      console.error('Password reset error:', error)
      setError(error.message || 'An error occurred while resetting your password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Reset Password – Solace Gold</title>
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
            Create New Password
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded bg-[#1c1c1c] text-white border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#e0b44a]"
                minLength={6}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded bg-[#1c1c1c] text-white border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#e0b44a]"
                minLength={6}
              />
            </div>

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
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
} 