import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

// Cache duration in seconds (5 minutes)
const CACHE_DURATION = 300;

interface FearGreedData {
  value: number;
  value_classification: string;
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
    // Check cache first
    const { data: cachedData } = await supabase
      .from('fear_greed_cache')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // If we have cached data that's still fresh, return it
    if (
      cachedData &&
      Date.now() - new Date(cachedData.created_at).getTime() < CACHE_DURATION * 1000
    ) {
      return res.status(200).json({
        value: cachedData.value,
        classification: cachedData.classification,
        recommendation: getRecommendation(cachedData.value),
        timestamp: cachedData.created_at,
      });
    }

    // Fetch new data from alternative.me
    const response = await fetch('https://api.alternative.me/fng/?limit=1&format=json');
    const data = await response.json();
    
    if (!data.data?.[0]) {
      throw new Error('Invalid response from Fear & Greed API');
    }

    const fearGreedData = data.data[0];
    
    // Store in cache
    const { error: insertError } = await supabase
      .from('fear_greed_cache')
      .insert({
        value: parseInt(fearGreedData.value),
        classification: fearGreedData.value_classification,
        created_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error('Error caching fear & greed data:', insertError);
    }

    return res.status(200).json({
      value: parseInt(fearGreedData.value),
      classification: fearGreedData.value_classification,
      recommendation: getRecommendation(parseInt(fearGreedData.value)),
      timestamp: fearGreedData.timestamp,
    });
  } catch (error) {
    console.error('Error fetching fear & greed index:', error);
    return res.status(500).json({ error: 'Failed to fetch fear & greed index' });
  }
}

function getRecommendation(value: number): 'BUY' | 'SELL' | 'HOLD' {
  if (value <= 40) return 'BUY';
  if (value >= 60) return 'SELL';
  return 'HOLD';
} 