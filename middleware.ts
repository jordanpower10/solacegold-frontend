import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Skip rate limiting and tracking for static files and favicon
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/favicon.') ||
    request.nextUrl.pathname.includes('.ico')
  ) {
    return NextResponse.next()
  }

  try {
    // Get client IP from headers
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Track page view
    await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/increment_page_view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        page_path: request.nextUrl.pathname
      })
    }).catch(error => console.error('Failed to track page view:', error))

    // Call our rate limiting function
    const rateLimit = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/api-rate-limit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        ip,
        pathname: request.nextUrl.pathname
      })
    })

    if (!rateLimit.ok) {
      const data = await rateLimit.json()
      
      // If rate limit exceeded, return 429 Too Many Requests
      if (rateLimit.status === 429) {
        return new NextResponse(
          JSON.stringify({
            error: 'Too many requests',
            message: data.message
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Limit': rateLimit.headers.get('X-RateLimit-Limit') || '',
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': rateLimit.headers.get('X-RateLimit-Reset') || '',
              'Retry-After': rateLimit.headers.get('X-RateLimit-Reset') || ''
            }
          }
        )
      }

      // For other errors, continue but log the error
      console.error('Rate limit check failed:', data)
    }

    // Add rate limit headers to the response
    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', rateLimit.headers.get('X-RateLimit-Limit') || '')
    response.headers.set('X-RateLimit-Remaining', rateLimit.headers.get('X-RateLimit-Remaining') || '')
    response.headers.set('X-RateLimit-Reset', rateLimit.headers.get('X-RateLimit-Reset') || '')

    return response
  } catch (error) {
    // If rate limiting fails, allow the request but log the error
    console.error('Rate limiting error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 