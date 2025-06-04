import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import ReCAPTCHA from 'react-google-recaptcha'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/dashboard')
      }
    })
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
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

      // Proceed with login if reCAPTCHA verification succeeded
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('❌ Login failed:', error)
        setError('Invalid email or password.')
      } else {
        console.log('✅ Login success:', data)
        router.push('/dashboard')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      setError(error.message || 'An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login – Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-[#0d0d0d] px-4 flex items-center justify-center font-sans">
        <div className="w-full max-w-md bg-[#121212] p-8 rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <a href="/">
              <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Solace Gold Logo" className="w-32 h-auto" />
            </a>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-[#e0b44a]">
            Log in to your account
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm text-gray-400" htmlFor="password">Password</label>
                <a href="/forgot-password" className="text-sm text-[#e0b44a] hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]"
                required
              />
            </div>

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
              className="w-full mt-4 bg-[#e0b44a] text-black font-bold py-2 rounded shadow-gold hover:bg-yellow-400 transition"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <p className="text-sm text-center text-gray-500 mt-6">
              Don't have an account?{' '}
              <a href="/signup" className="text-[#e0b44a] underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
