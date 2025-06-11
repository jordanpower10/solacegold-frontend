import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient'
import crypto from 'crypto'

// Disable default body parser to get raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
}

// Use the Sumsub secret key from your .env file
const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY || ''

// Read raw body buffer for HMAC verification
const buffer = async (req: NextApiRequest): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: any[] = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const rawBody = await buffer(req)
    const signature = req.headers['x-payload-signature'] as string

    if (!signature) {
      return res.status(401).json({ message: 'Missing signature' })
    }

    const expectedSig = crypto
      .createHmac('sha256', SUMSUB_SECRET_KEY)
      .update(rawBody)
      .digest('hex')

    if (signature !== expectedSig) {
      return res.status(401).json({ message: 'Invalid signature' })
    }

    const body = JSON.parse(rawBody.toString())
    const { reviewResult, type, externalUserId } = body

    if (!externalUserId) {
      return res.status(400).json({ message: 'Missing externalUserId' })
    }

    if (type !== 'applicantReviewed' && type !== 'applicantPending') {
      return res.status(200).json({ message: 'Ignored event type' })
    }

    let kycStatus
    if (type === 'applicantPending') {
      kycStatus = 'pending'
    } else if (type === 'applicantReviewed') {
      kycStatus = reviewResult.reviewAnswer === 'GREEN' ? 'approved' : 'rejected'
    }

    // Update the user's KYC status in the profiles table
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        kyc_status: kycStatus,
        kyc_updated_at: new Date().toISOString()
      })
      .eq('id', externalUserId)

    if (updateError) {
      console.error('Error updating KYC status:', updateError)
      return res.status(500).json({ message: 'Failed to update KYC status' })
    }

    return res.status(200).json({ 
      message: 'Webhook processed successfully',
      status: kycStatus 
    })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
