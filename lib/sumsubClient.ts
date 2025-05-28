import crypto from 'crypto'

const SUMSUB_APP_TOKEN = process.env.NEXT_PUBLIC_SUMSUB_APP_TOKEN || ''
const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY || ''
const SUMSUB_BASE_URL = 'https://api.sumsub.com'

// Generate signature for SumSub API requests
const generateSignature = (ts: number, method: string, path: string, body: string = '') => {
  const data = ts + method + path + body
  return crypto.createHmac('sha256', SUMSUB_SECRET_KEY)
    .update(data)
    .digest('hex')
}

// Create access token for the SumSub SDK
export const createAccessToken = async (userId: string, levelName = 'basic-kyc-level') => {
  const ts = Math.floor(Date.now() / 1000)
  const path = `/resources/accessTokens?userId=${userId}&levelName=${levelName}`
  const signature = generateSignature(ts, 'POST', path)

  try {
    const response = await fetch(`${SUMSUB_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'X-App-Token': SUMSUB_APP_TOKEN,
        'X-App-Access-Sig': signature,
        'X-App-Access-Ts': ts.toString()
      }
    })

    if (!response.ok) {
      throw new Error('Failed to create access token')
    }

    const data = await response.json()
    return data.token
  } catch (error) {
    console.error('Error creating SumSub access token:', error)
    throw error
  }
}

// Get the verification URL for a user
export const getVerificationUrl = async (userId: string): Promise<string> => {
  try {
    const accessToken = await createAccessToken(userId)
    // Using the production URL since we have production credentials
    return `https://id.sumsub.com/idensic/l/#/access-token/${accessToken}`
  } catch (error) {
    console.error('Error getting verification URL:', error)
    throw error
  }
} 