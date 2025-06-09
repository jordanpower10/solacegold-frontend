import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../lib/supabaseClient'

// List of paths to exclude from tracking
const EXCLUDED_PATHS = [
  '/_next',
  '/api',
  '/static',
  '/favicon.ico',
  '/robots.txt',
]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Skip tracking for excluded paths
  if (EXCLUDED_PATHS.some(excludedPath => path.startsWith(excludedPath))) {
    return NextResponse.next()
  }

  try {
    // Track the page view using increment_page_view function
    await supabase.rpc('increment_page_view', { page_path: path })
  } catch (error) {
    console.error('Failed to track page view:', error)
  }

  return NextResponse.next()
} 