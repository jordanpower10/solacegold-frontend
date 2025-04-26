import Head from 'next/head'

export default function Login() {
  return (
    <>
      <Head>
        <title>Login – Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-white font-sans">
        <div className="bg-[#121212] p-10 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#e0b44a]">Login</h2>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#e0b44a]"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#e0b44a]"
            />
            <button
              type="submit"
              className="mt-4 bg-[#e0b44a] text-black font-semibold py-3 rounded hover:bg-yellow-400 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
