import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FearGreedData {
  value: number;
  classification: string;
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  timestamp: string;
}

export default function FearGreedIndex() {
  const [data, setData] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fear-greed-index');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('Failed to load Fear & Greed Index');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a] animate-pulse">
        <div className="h-40 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#e0b44a] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]">
        <p className="text-red-400 text-center">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const getGaugeRotation = (value: number) => {
    // Convert 0-100 scale to -90 to 90 degrees
    return -90 + (value * 1.8);
  };

  const getColorClass = (value: number) => {
    if (value <= 25) return 'text-red-500';
    if (value <= 45) return 'text-orange-500';
    if (value <= 55) return 'text-yellow-500';
    if (value <= 75) return 'text-lime-500';
    return 'text-green-500';
  };

  const getRecommendationColor = (rec: 'BUY' | 'SELL' | 'HOLD') => {
    switch (rec) {
      case 'BUY': return 'text-green-500';
      case 'SELL': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]"
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-[#e0b44a] mb-1">Fear & Greed Index</h3>
        <p className="text-sm text-gray-400">Market Sentiment Indicator</p>
      </div>

      <div className="relative h-40 flex items-center justify-center mb-6">
        {/* Gauge Background */}
        <div className="absolute w-32 h-32 rounded-full border-8 border-[#2a2a2a]" />
        
        {/* Gauge Needle */}
        <motion.div
          initial={{ rotate: -90 }}
          animate={{ rotate: getGaugeRotation(data.value) }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="absolute w-1 h-20 bg-[#e0b44a] origin-bottom rounded-full"
          style={{ transformOrigin: 'bottom center' }}
        />
        
        {/* Value Display */}
        <div className="absolute bottom-0 text-center">
          <span className={`text-3xl font-bold ${getColorClass(data.value)}`}>
            {data.value}
          </span>
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className={`text-lg font-semibold ${getColorClass(data.value)}`}>
          {data.classification}
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-gray-400">Recommendation:</span>
          <span className={`font-bold ${getRecommendationColor(data.recommendation)}`}>
            {data.recommendation}
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Last updated: {new Date(data.timestamp).toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
} 