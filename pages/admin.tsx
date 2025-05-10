import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

export default function AdminPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const router = useRouter()
  let timeoutId: NodeJS.Timeout

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      const { data, error } = await supabase.from('profiles').select('id, email, role')
      if (error) {
        console.error('❌ Error fetching users:', error)
      } else {
        setUsers(data || [])
      }
    }

    fetchUsers()
  }, [router])

  return (
    <>
      <Head>
        <title>Admin Dashboard – Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f5f5f5] font-sans relative">
        {/* Dropdown */}
        <div
          className="absolute top-4 right-6 z-50"
          onMouseEnter={() => {
            clearTimeout(timeoutId)
            setIsMenuOpen(true)
          }}
          onMouseLeave={() => {
            timeoutId = setTimeout(() => setIsMenuOpen(false), 200)
          }}
        >
          <button className="bg-[#e0b44a] text-black font-semibold px-5 py-3 rounded-md shadow-gold hover:bg-yellow-400 transition text-sm">
            Menu
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg">
              <a href="/dashboard" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">Dashboard</a>
              <button
                onClick={async () => {
                  await supabase.auth.signOut()
                  router.push('/login')
                }}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col items-center px-4 py-10 mt-20">
          <a href="/" className="mb-6">
            <img
              src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png"
              alt="Solace Gold Logo"
              className="w-20 h-20"
            />
          </a>

          <h1 className="text-3xl font-bold mb-8 text-[#e0b44a]">Admin Panel</h1>

          {/* User Table */}
          <div className="w-full max-w-4xl bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
            {users.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-[#333]">
                    <th className="py-2 px-3">Email</th>
                    <th className="py-2 px-3">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-[#2a2a2a] hover:bg-[#1d1d1d]">
                      <td className="py-3 px-3">{user.email}</td>
                      <td className="py-3 px-3 capitalize">{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-400">No users found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
