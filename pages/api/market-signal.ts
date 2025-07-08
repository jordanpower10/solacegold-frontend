import { NextApiRequest, NextApiResponse } from 'next';

type Signal = 'BUY' | 'SELL' | 'HOLD';

interface MarketSignal {
  value: number;
  signal: Signal;
  timestamp: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch CSV data
    const response = await fetch('https://api.alternative.me/fng/?limit=0&format=csv');
    if (!response.ok) {
      throw new Error('Failed to fetch market data');
    }

    const csvData = await response.text();
    
    // Get today's data (first row after header)
    const rows = csvData.split('\n');
    if (rows.length < 2) {
      throw new Error('No market data available');
    }

    // Parse today's row (format: date,value,classification)
    const todayRow = rows[1];
    const [date, valueStr] = todayRow.split(',');
    const value = parseInt(valueStr);

    if (isNaN(value)) {
      throw new Error('Invalid market value');
    }

    // Apply trading logic
    let signal: Signal;
    if (value <= 40) {
      signal = 'BUY';
    } else if (value >= 60) {
      signal = 'SELL';
    } else {
      signal = 'HOLD';
    }

    const marketSignal: MarketSignal = {
      value,
      signal,
      timestamp: new Date().toISOString()
    };

    return res.status(200).json(marketSignal);
  } catch (error) {
    console.error('Error fetching market signal:', error);
    return res.status(500).json({ error: 'Failed to fetch market signal' });
  }
} 