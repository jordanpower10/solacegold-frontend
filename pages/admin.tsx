import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const goldPrice = 2922.01

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setLoading(false)
        router.push('/login')
        return
      }

      setUser(session.user)

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (error || !profile) {
        setLoading(false)
        router.push('/dashboard')
        return
      }

      if (profile.role === 'admin') {
        setIsAdmin(true)
      } else {
        router.push('/dashboard')
      }

      setLoading(false)
    }

    fetchData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard – Solace Gold</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f5f5f5] font-sans relative">
        <div className="flex flex-col items-center justify-center mt-20">
          <h1 className="text-4xl font-bold text-[#e0b44a] mb-6">Admin Panel</h1>
          <p>Welcome, {user?.email}</p>
          {/* Add the rest of your admin content here */}
        </div>
      </div>
    </>
  )
}
