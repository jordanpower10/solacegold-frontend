import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

export default function AdminPage() {
  const [profiles, setProfiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profileError || profileData?.role !== 'admin') {
        router.push('/dashboard') // if not admin, send back to normal dashboard
        return
      }

      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, role')

      if (!profilesError && profilesData) {
        setProfiles(profilesData)
      }

      setLoading(false)
    }

    fetchProfiles()
  }, [router])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard – All Users</h1>

      <table className="min-w-full bg-gray-800 rounded-md overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-700">Email</th>
            <th className="py-3 px-6 bg-gray-700">Role</th>
            <th className="py-3 px-6 bg-gray-700">User ID</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id} className="border-t border-gray-700">
              <td className="py-3 px-6">{profile.email}</td>
              <td className="py-3 px-6 capitalize">{profile.role}</td>
              <td className="py-3 px-6 text-xs">{profile.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
