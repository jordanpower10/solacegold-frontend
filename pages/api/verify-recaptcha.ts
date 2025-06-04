import { NextApiRequest, NextApiResponse } from 'next';

async function verifyRecaptcha(token: string) {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${process.env.6LdbBVYrAAAAABkhQhVw0zKo3d2kt4xx2GJcaONL}&response=${token}`,
  });

  const data = await response.json();
  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'reCAPTCHA token is required' });
  }

  try {
    const verificationResponse = await verifyRecaptcha(token);

    if (verificationResponse.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({
        success: false,
        error: 'reCAPTCHA verification failed',
        errors: verificationResponse['error-codes'],
      });
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({ error: 'Failed to verify reCAPTCHA' });
  }
} 