import { useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Debug() {
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      console.log('Session User:', session?.user)
    }
    fetchSession()
  }, [])

  return <div>Check Console for Session Info</div>
}
