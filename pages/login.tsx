import Head from 'next/head'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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

          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault()
              const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
              })

              if (res?.ok) router.push("/dashboard")
              else alert("Invalid login")
            }}
          >
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-[#e0b44a] text-black font-bold py-2 rounded shadow-gold hover:bg-yellow-400 transition"
            >
              Log In
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
