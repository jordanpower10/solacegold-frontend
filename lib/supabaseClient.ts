import { createClient } from '@supabase/supabase-js'

let supabase: ReturnType<typeof createClient>

if (typeof window !== 'undefined') {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing environment variables for Supabase configuration')
  }

  supabase = createClient(supabaseUrl, supabaseKey)
}

export { supabase }
