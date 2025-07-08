import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MarketSignal {
  value: number;
  signal: 'BUY' | 'SELL' | 'HOLD';
  timestamp: string;
}

export default function InvestmentAlgorithm() {
  const [data, setData] = useState<MarketSignal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/market-signal');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('Failed to load market signal');
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

  const getSignalColor = (signal: 'BUY' | 'SELL' | 'HOLD') => {
    switch (signal) {
      case 'BUY': return 'text-green-500';
      case 'SELL': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getMarketStatus = (value: number): string => {
    if (value <= 25) return 'Extremely Low';
    if (value <= 40) return 'Low';
    if (value <= 59) return 'Neutral';
    if (value <= 75) return 'High';
    return 'Extremely High';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-[#2a2a2a]"
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-[#e0b44a] mb-1">Market Signal</h3>
        <p className="text-sm text-gray-400">Powered by SolaceGold Algorithm</p>
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
          {getMarketStatus(data.value)}
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-gray-400">Signal:</span>
          <span className={`font-bold ${getSignalColor(data.signal)}`}>
            {data.signal}
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Last updated: {new Date(data.timestamp).toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
} 