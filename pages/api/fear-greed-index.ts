import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

// Cache duration in seconds (5 minutes)
const CACHE_DURATION = 300;

interface CacheData {
  value: number;
  classification: string;
  created_at: string;
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
    const { data: cachedData, error: cacheError } = await supabase
      .from('fear_greed_cache')
      .select('value, classification, created_at')
      .order('created_at', { ascending: false })
      .limit(1)
      .single() as { data: CacheData | null, error: any };

    if (cacheError && cacheError.code !== 'PGRST116') {
      console.error('Error fetching from cache:', cacheError);
    }

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

    // Fetch new data from alternative.me CSV endpoint
    const response = await fetch('https://api.alternative.me/fng/?limit=0&format=csv');
    const csvData = await response.text();
    
    // Get the first line (today's data) and parse it
    const [todayData] = csvData.split('\n').slice(1);
    if (!todayData) {
      throw new Error('No data available from Fear & Greed API');
    }

    const [date, value, classification] = todayData.split(',');
    const numericValue = parseInt(value);
    
    if (isNaN(numericValue)) {
      throw new Error('Invalid value from Fear & Greed API');
    }
    
    // Store in cache
    const { error: insertError } = await supabase
      .from('fear_greed_cache')
      .insert({
        value: numericValue,
        classification: classification.trim(),
        created_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error('Error caching fear & greed data:', insertError);
    }

    return res.status(200).json({
      value: numericValue,
      classification: classification.trim(),
      recommendation: getRecommendation(numericValue),
      timestamp: new Date().toISOString(),
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