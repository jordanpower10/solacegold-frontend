import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient'
import crypto from 'crypto'

const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY || ''

// Verify SumSub webhook signature
const verifySignature = (req: NextApiRequest): boolean => {
  const signature = req.headers['x-payload-signature']
  if (!signature) return false

  const hmac = crypto.createHmac('sha1', SUMSUB_SECRET_KEY)
  const calculatedSignature = hmac.update(JSON.stringify(req.body)).digest('hex')
  
  return signature === calculatedSignature
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Verify webhook signature
  if (!verifySignature(req)) {
    return res.status(401).json({ message: 'Invalid signature' })
  }

  try {
    const { applicantId, reviewStatus, type, externalUserId } = req.body

    // Only process applicant status changes
    if (type !== 'applicantReviewed') {
      return res.status(200).json({ message: 'Event type ignored' })
    }

    // Map SumSub status to our status
    let kycStatus
    switch (reviewStatus) {
      case 'GREEN':
        kycStatus = 'approved'
        break
      case 'RED':
        kycStatus = 'rejected'
        break
      default:
        kycStatus = 'pending'
    }

    // Update user's KYC status in database
    const { error } = await supabase
      .from('profiles')
      .update({ 
        kyc_status: kycStatus,
        kyc_updated_at: new Date().toISOString(),
        sumsub_id: applicantId
      })
      .eq('id', externalUserId) // Using the user's ID from Supabase as externalUserId

    if (error) {
      console.error('Error updating KYC status:', error)
      return res.status(500).json({ message: 'Error updating KYC status' })
    }

    return res.status(200).json({ message: 'KYC status updated successfully' })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
} 