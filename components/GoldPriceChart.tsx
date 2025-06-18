import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format, fromUnixTime, addMonths, setDate, isAfter, isBefore, startOfMonth } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceData {
  dates: string[];
  prices: number[];
}

interface GoldPriceChartProps {
  timeframe: string;
}

// Helper to get all months between two dates
function getMonthLabels(start: Date, end: Date) {
  const labels = [];
  let current = new Date(start.getFullYear(), start.getMonth(), 1);
  while (current <= end) {
    labels.push(format(current, 'MMM yy'));
    current.setMonth(current.getMonth() + 1);
  }
  return labels;
}

// Helper to get all months between two dates (first of each month)
function getMonthTicks(start: Date, end: Date) {
  const ticks = [];
  let current = new Date(start.getFullYear(), start.getMonth(), 1);
  while (current <= end) {
    ticks.push(format(current, 'yyyy-MM-01'));
    current.setMonth(current.getMonth() + 1);
  }
  return ticks;
}

export default function GoldPriceChart({ timeframe }: GoldPriceChartProps) {
  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#e0b44a',
        bodyColor: '#fff',
        borderColor: '#2a2a2a',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems[0].label || '';
          },
          label: (context) => {
            // Add 5% margin to the displayed price
            const price = context.parsed.y * 1.05;
            return `$${price.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#666',
          maxRotation: 0,
          display: false,
        },
      },
      y: {
        grid: {
          color: '#2a2a2a',
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#666',
          callback: (value) => {
            // Add 5% margin to the y-axis values
            const price = Number(value) * 1.05;
            return `$${price.toFixed(0)}`;
          },
        },
      },
    },
  };

  useEffect(() => {
    fetchGoldData();
    // Auto-refresh data every 5 minutes
    const interval = setInterval(fetchGoldData, 300000);
    return () => clearInterval(interval);
  }, [timeframe]);

  const getDaysFromTimeframe = () => {
    switch (timeframe) {
      case '1M': return 30;
      case '3M': return 90;
      case '6M': return 180;
      case '1Y': return 365;
      default: return 365;
    }
  };

  const fetchGoldData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const days = getDaysFromTimeframe();
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/tether-gold/market_chart?vs_currency=usd&days=${days}&interval=daily`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch gold price data');
      }

      const data = await response.json();
      const processedData = processChartData(data.prices);

      setChartData({
        labels: processedData.dates,
        datasets: [
          {
            label: 'Gold Price (USD/oz)',
            data: processedData.prices,
            borderColor: '#e0b44a',
            backgroundColor: 'rgba(224, 180, 74, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#e0b44a',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2,
          },
        ],
      });
    } catch (err) {
      setError('Failed to load gold price data. Please try again later.');
      console.error('Error fetching gold price data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const processChartData = (priceData: [number, number][]): PriceData => {
    return {
      dates: priceData.map(([timestamp]) => format(fromUnixTime(timestamp / 1000), 'yyyy-MM-dd')),
      prices: priceData.map(([, price]) => price)
    };
  };

  // Find the first and last date in the data
  const chartStartDate = chartData?.labels?.length ? new Date(chartData.labels[0]) : new Date();
  const chartEndDate = chartData?.labels?.length ? new Date(chartData.labels[chartData.labels.length - 1]) : new Date();
  const monthLabels = getMonthLabels(chartStartDate, chartEndDate);
  const monthTicks = getMonthTicks(chartStartDate, chartEndDate);

  return (
    <div className="w-full h-full">
      <div className="h-full relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e0b44a]"></div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center text-red-400">
            {error}
          </div>
        ) : chartData ? (
          <Line data={chartData} options={options} />
        ) : null}
      </div>
    </div>
  )
}